//
// Recursively visit all links on the site and report any broken links.
//
describe('Report broken links', () => {
  it('should complete successfully', () => {


    ///////////////////  implement a count-limited logger ///////////////////////
    //
    // useful to limit the number of log messages or length of run of test
    //

    let logCount = 0;
    const maxLogCount = 300000;

    const countLog = (message) => {
      // cy.log("countLog", message)
      cy.task('log', `countLog ${logCount}: ${message}`);
      logCount++;
      if (logCount > maxLogCount)
        cy.then(() => {
          throw new Error(`Stopping run because reached max log count(${maxLogCount})`);
        });
    }

    ///////////////////  initialize sets ///////////////////////

    let visitedLinks = new Set();
    let brokenLinks = new Set();
    let goodLinks = new Set();

    // known broken links - these need to be hardcoded because cy.request() breaks
    // on them, even though 'failOnStatusCode' is set to false.
    brokenLinks.add('https://xdmod.access-cs.org/');  // gives ENOENT error
    brokenLinks.add('https://metrics.access-cs.org/');  // gives ENOENT error
    brokenLinks.add('https://metrics.access-ci.xn--org-9o0a/');  // gives ENOENT error
    brokenLinks.add('http://metrics.access-ci.xn--org-9o0a/');  // gives ENOENT error
    brokenLinks.add('https://illinois.edu/');  // gives ENOENT error
    brokenLinks.add('https://access-ci.org/acceptable-use/');  // gives ENOENT error

    // adding these because they cause issues
    visitedLinks.add(Cypress.config('baseUrl') + "login"); // Error message: Failed to initialize OIDC flow.
    visitedLinks.add(Cypress.config('baseUrl') + "open-a-ticket"); // redirects to login
    brokenLinks.forEach((link) => { visitedLinks.add(link) });  // add broken links to visited links

    countLog("visitedLinks = " + JSON.stringify([...visitedLinks], null, '\t'));
    countLog("brokenLinks = " + JSON.stringify([...brokenLinks], null, '\t'));

    ///////////////////  log broken links ///////////////////////

    const brokenFileName = `logs/${Cypress.spec.name}.log.broken.txt`;
    const visitedFileName = `logs/${Cypress.spec.name}.log.visited.txt`;

    cy.exec(`echo "Broken links in ${Cypress.config('baseUrl')} " > ${brokenFileName}`);
    cy.exec(`echo "Visited links in ${Cypress.config('baseUrl')} " > ${visitedFileName}`);

    cy.exec(`echo "The following links are known to cause problems:" >> ${brokenFileName}`);
    visitedLinks.forEach((link) => {
      cy.exec(`echo "  ${link}" >> ${brokenFileName}`);
    });

    const baseLen = Cypress.config('baseUrl').length - 1;

    const logBrokenLink = (href, url, status) => {
      const msg = `In url '${url.slice(baseLen)}', status code ${status} with href '${href}'`;
      countLog(msg);
      cy.exec(`echo "${msg}" >> ${brokenFileName}`);
    }
    const logVisitedLink = (url) => {
      const msg = `Response code < 400 with url '${url}'`;
      countLog(msg);
      cy.exec(`echo "${msg}" >> ${visitedFileName}`);
    }

    ///////////////////  recursive visitUrl function ///////////////////////

    // specify maximum depth of recursion. if too large, can run out of memory.
    const maxDepth = 50;

    const visitUrl = (url, depth = 0) => {

      if (visitedLinks.has(url)) {
        // countLog(`depth ${ depth } --Skipping "${url}" - already visited`);
        return;
      }
      visitedLinks.add(url);

      if (!url.startsWith(Cypress.config('baseUrl'))) {
        // countLog(`depth ${depth} --Skipping "${url}" - not in base URL = "${Cypress.config('baseUrl')}"`);
        return;
      }

      countLog(`[depth ${depth}] visiting "${url}"`);

      cy.visit(url).then(() => {

        cy.document().then((doc) => {
          const links = doc.getElementsByTagName('a');

          cy.wrap(links).then(() => {

            // Remove anchor anchor links - put resulting urls in a set,
            // to remove duplicates.
            let linkSet = new Set();
            [...links].forEach((link) => {
              const href = String(link);
              // countLog(`**  link #${++i} of ${num}: href = "${href}" ** `);
              const pos = href.indexOf('#');
              linkSet.add(pos >= 0 ? href.slice(0, pos) : href);
            });

            // cy.log('linkSet = ' + JSON.stringify([...linkSet]));
            // cy.log('length = ' + [...linkSet].length);
            // cy.log(" size = " + linkSet.size).then(() => {
            //   throw new Error(`Stopping `);
            // });

            let i = 0;
            const num = linkSet.size;

            linkSet.forEach((href) => {
              // countLog(`** depth ${depth} ** -- link #${++i} of ${num}: href = "${href}" ** `);
              if (!href
                || href.startsWith('mailto:')
                || href.startsWith('tel:')) {
                // countLog(`** depth ${depth} -- link #${i} of ${num}: "${href}" - skipped ** `);
              } else if (goodLinks.has(href)) {
                // countLog(`** depth ${depth} -- link #${i}: "${href}" - known good link ** `);
              } else if (href.startsWith('devel/')) {
                // countLog(`** depth ${depth} -- link #${i}: "${href}" - skipping devel/ link ** `);
              } else if (href.endsWith('devel/token')) {
                // countLog(`** depth ${depth} -- link #${i}: "${href}" - skipping devel/token link ** `);
              } else if (brokenLinks.has(href)) {
                logBrokenLink(href, url, '"known broken link"');
              } else {
                cy.request({
                  url: href,
                  failOnStatusCode: false
                }).then((response) => {
                  // countLog(`** depth ${ depth } ** --link #${i}: "${href}" - status code: ${ response.status }`);
                  if (response.status >= 400) {
                    visitedLinks.add(href);
                    brokenLinks.add(href);
                    logBrokenLink(href, url, response.status);
                    // throw new Error(`BAD LINK: "${href}" - status code: ${ response.status }`);
                  } else {
                    if (depth < maxDepth) {
                      visitUrl(href, depth + 1);
                      logVisitedLink(href);
                      // Add this href to the goodLinks set *after* it's been vetted.
                      // If it's added before the visitUrl() above, it may be skipped
                      // by other async visits.
                      // Furthermore, don't add it if maxDepth has been reached.
                      // This will give it a chance to be vetted from a node
                      // closer to the root.
                      goodLinks.add(href);
                    }
                  }
                });
              }
            });
          });
        });
      });
    }

    ///////////////////  main ///////////////////////

    const url = Cypress.config('baseUrl');
    countLog(`Beginning recursive search of "${url}" for broken links, maxDepth = ${maxDepth}`);
    visitUrl(url);
    logVisitedLink(url);

  });
});

