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

    ///////////////////  log broken links ///////////////////////

    const logBrokenLink = (href, url, status) => {
      const msg = `In url '${url}', status code ${status} with href '${href}' `
      countLog(msg);
      cy.exec(`echo "${msg}" >> logs/${Cypress.spec.name}.log.txt`);
    }

    ///////////////////  initialize sets ///////////////////////

    cy.exec(`echo "Broken links in ${Cypress.config('baseUrl')} " > logs/${Cypress.spec.name}.log.txt`);

    let visitedLinks = new Set();
    let brokenLinks = new Set();
    let goodLinks = new Set();

    // known broken links
    brokenLinks.add('https://xdmod.access-cs.org/');  // gives ENOENT error
    brokenLinks.add('https://metrics.access-cs.org/');  // gives ENOENT error
    brokenLinks.add('http://metrics.access-ci.xn--org-9o0a/');  // gives ENOENT error

    // adding these because they cause issues
    visitedLinks.add(Cypress.config('baseUrl') + "/login");
    brokenLinks.forEach((link) => { visitedLinks.add(link) });  // add broken links to visited links

    countLog("visitedLinks = " + JSON.stringify([...visitedLinks], null, '\t'));
    countLog("brokenLinks = " + JSON.stringify([...brokenLinks], null, '\t'));

    ///////////////////  recursive visitUrl function ///////////////////////

    // specify maximum depth of recursion. if too large, can run out of memory.
    const maxDepth = 2;

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
          // countLog(`** depth=${depth} visitedCount = ${visitedLinks.size} -- found ${links.length} links in "${url}**"`);
          let i = 0;
          let num = links.length;
          cy.wrap(links).each((link) => {
            i++;
            let href = String(link[0]);
            // countLog(`** depth ${depth} ** -- link #${i} of ${num}: href = "${href}" ** `);
            if (!href
              || href.startsWith('mailto:')
              || href.startsWith('tel:')
              || goodLinks.has(href)) {
              // countLog(`** depth ${ depth } -- link #${i} of ${num}: "${href}" - skipped ** `);
            } else if (href.endsWith('devel/token')) {
              // countLog(`** depth ${ depth } -- link #${i}: "${href}" - skipping devel / token link ${ href } ** `);
            } else if (brokenLinks.has(href)) {
              logBrokenLink(href, url, 'see previous');
            } else {
              cy.request({
                url: href,
                failOnStatusCode: false
              }).then((response) => {
                // countLog(`** depth ${ depth } ** --link #${i}: "${href}" - status code: ${ response.status }`);
                if (response.status >= 300) {
                  visitedLinks.add(href);
                  brokenLinks.add(href);
                  logBrokenLink(href, url, response.status);
                  // throw new Error(`BAD LINK: "${href}" - status code: ${ response.status }`);
                } else {
                  if (depth < maxDepth) {
                    visitUrl(href, depth + 1);
                  }
                  // Add this href to the goodLinks set *after* it's been vetted.
                  // If it's added before the visitUrl() above, it may be skipped
                  // by other async visits.
                  goodLinks.add(href);
                }
              });
            }
          })
        });
      });
    }

    ///////////////////  main ///////////////////////

    const url = Cypress.config('baseUrl');
    countLog(`Beginning recursive search of "${url}" for broken links, maxDepth = ${maxDepth}`);
    visitUrl(url);
  });
});
