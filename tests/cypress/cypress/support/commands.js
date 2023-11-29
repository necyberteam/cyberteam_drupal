/**
 * Verify all images load.
 */
Cypress.Commands.add("verifyImages", () => {
  cy.get("img").each(($img) => cy.wrap($img).verifyImage());
});

/**
 * Verify that an img element loads.
 *
 * Note that this is a "child" custom command, so it must be called
 * with parent cypress command that yields an image element, e.g.:
 *    cy.get('.field--name-field-image')
 *       .get('img')
 *       .verifyImage();
 */
Cypress.Commands.add("verifyImage", { prevSubject: true }, ($img) => {
  const url = $img[0]?.src || $img[0]?.srcset;
  if (url) {
    cy.request(url).then((response) => {
      // verify the image response is 200, and has a non-zero length body
      // I was logging each image, but this seemed to verbose, so I commented it out.
      // cy.task('log', 'verifying image "' + url + '"').then(() => {
      expect(response.status).to.eq(200);
      expect(response.body.length).to.be.greaterThan(0);
      // });
    });
  } else {
    throw new Error(`Found an image with no url src`);
  }
});

/**
 * Verify breadcrumbs.
 *
 * var crumbs - an array of arrays, each inner array holds a [crumb, href] where
 *    the crumb is the text of the breadcrumb and the href is the expected url or
 *    null if no url is expected.
 *
 * Example:
 *  const crumbs = [
 *     ['Support', '/'],
 *     ['Affinity Groups', '/affinity_groups'],
 *     ['ACCESS Support', null]
 *   ];
 *   cy.checkBreadcrumbs(crumbs);
 *
 * This looks at the element with the 'breadcrumb' class, and confirms all the
 * crumbs are present and have the expected hrefs.
 *
 */
Cypress.Commands.add("checkBreadcrumbs", (crumbs) => {
  var crumb, href;
  for ([crumb, href] of crumbs) {
    if (href) {
      cy.get(".breadcrumb")
        .contains(crumb)
        .should("have.attr", "href")
        .and("contain", href);
    } else {
      cy.get(".breadcrumb").contains(crumb).should("not.have.attr", "href");
    }
  }
});

/**
 * Logs out the user.
 */
Cypress.Commands.add("drupalLogout", () => {
  cy.visit("/user/logout");
});

/**
 * Basic user login command. Requires valid username and password.
 *
 * @param {string} username
 *   The username with which to log in.
 * @param {string} password
 *   The password for the user's account.
 */
Cypress.Commands.add("loginAs", (username, password) => {
  cy.drupalLogout();
  cy.visit("/f64816be-34ca-4d5b-975a-687cb374ddf7");
  cy.get("#edit-name").type(username);
  cy.get("#edit-pass").type(password, {
    log: false,
  });
  cy.get(".form-submit").contains("Log in").click();
});

/**
 * Logs a user in by their uid via drush uli.
 */
Cypress.Commands.add("loginUserByUid", (uid) => {
  cy.drush("user-login", [], { uid, uri: Cypress.env("baseUrl") })
    .its("stdout")
    .then(function (url) {
      cy.visit(url);
    });
});

/**
 * Custom command to verify the existence of a button within the "region-cta" block
 */
Cypress.Commands.add("verifyCallToActionBlock", (url, text, href) => {
  // Visit the specified URL
  cy.visit(url);

  // cta section is tested, contained text within button, Button destination

  cy.get("#cta")
    .should("exist")
    .contains(text)
    .should("have.attr", "href")
    .and("contain", href);
});

/**
 * Deletes last node created.
 */
Cypress.Commands.add("deleteLastNode", () => {
  cy.visit("/admin/content");
  cy.get("tbody > :nth-child(1) > .views-field-title > a").click();
  cy.get("#block-dingo-local-tasks > ul > :nth-child(3) > a").click({
    force: true,
  });
  cy.get('[value="Delete"]').click();
});

/**
 * Logs a user in by their uid via drush uli.
 */
Cypress.Commands.add("drushUli", () => {
  cy.task("log", "in drushUli");

  cy.drush("uli", ["--uri=" + Cypress.config("baseUrl")], {}).then((result) => {
    cy.task("log", "result = " + JSON.stringify(result));
    if (result.code !== 0) {
      throw new Error(result.stderr);
    } else {
      cy.task("log", 'drushUli trying to visit "' + result.stdout + '"');
      cy.visit(result.stdout);
    }
  });
});

/**
 * Defines a cypress command that executes drush commands.
 *
 * Note that our definition of the drush command depends on our environment
 * variable 'drushCommand'. Define this in cypress.json or cypress.env.json
 * based on your local dev setup.
 *
 * We're passing the object containing 'failOnNonZeroExit' to Cypress so that
 * our Cypress tests don't crash if the drush command returns an error (e.g.
 * if we try to delete a user account that does not exist.)
 */
Cypress.Commands.add("drush", (command, args = [], options = {}) => {
  cy.task("log", 'in drush, command = "' + command + '"');
  const ee = `drush ${command} ${stringifyArguments(args)} ${stringifyOptions(
    options
  )} -y`;
  cy.task("log", "in drush, about to exec this:  " + ee);
  return cy.exec(ee, { failOnNonZeroExit: false });
});

/**
 * Returns a series of arguments, separated by spaces.
 *
 * @param {*} args
 * @returns
 */
function stringifyArguments(args) {
  return args.join(" ");
}

/**
 * Returns a string from an array of options.
 *
 * @param {array} options
 * @returns
 */
function stringifyOptions(options) {
  return Object.keys(options)
    .map((option) => {
      let output = `--${option}`;

      if (options[option] === true) {
        return output;
      }

      if (options[option] === false) {
        return "";
      }

      if (typeof options[option] === "string") {
        output += `="${options[option]}"`;
      } else {
        output += `=${options[option]}`;
      }

      return output;
    })
    .join(" ");
}
