/*
  CC Mentorship Status page — access control tests.

  The /mentorships/cc-status page (Views display mentorship_status:page_2)
  is restricted to the administrator, champions_mentorship_admin, and
  campuschampionsadmin roles. It filters to mentorships in the
  "Campus Champions AI Mentorship" program.

  Fixture users (sanitized local DB, emails are user+{uid}@localhost.localdomain):
    uid 5292 — champions_mentorship_admin only
    uid 746  — campuschampionsadmin only
    uid 519  — ccmnet_pm only (no access)
    uid 100  — ccmnet_pm + administrator (full admin, not tested here)
*/

const STATUS_PATH = "/mentorships/cc-status";
const BASE_STATUS_PATH = "/mentorships/status";

// One of the 5 known CC mentorship titles present on local
const KNOWN_CC_TITLE = "[CC-AI] Campus Champions AI Mentorship";

/**
 * Log in as a user by uid via drush user:login (one-time login URL).
 * Uses cy.exec so it runs on the host where ddev is available.
 */
function loginByUid(uid) {
  const uri = Cypress.config("baseUrl");
  cy.exec(
    `ddev drush user:login --uid=${uid} --uri=${uri} /`,
    { failOnNonZeroExit: false }
  ).then((result) => {
    // The URL is the last non-empty line of stdout
    const url = result.stdout.trim().split("\n").pop();
    cy.visit(url);
  });
}

describe("CC Mentorship Status page — access control", () => {

  it("anonymous request to /mentorships/cc-status redirects to login (307)", () => {
    // Drupal redirects unauthenticated users with a 307 to the login flow.
    // Asserting the exact status keeps the test honest — a future change
    // that returns 200 (over-permissive) or 500 (broken) would fail loudly.
    cy.request({
      url: STATUS_PATH,
      failOnStatusCode: false,
      followRedirect: false,
    })
      .its("status")
      .should("eq", 307);
  });

  it("champions_mentorship_admin (uid 5292) can view /mentorships/cc-status", () => {
    loginByUid(5292);
    cy.visit(STATUS_PATH);

    // Page title contains "Campus Champions"
    cy.get("h1").should("contain.text", "Campus Champions");

    // At least the known CC mentorship appears in the listing
    cy.get("body").should("contain", KNOWN_CC_TITLE);
  });

  it("campuschampionsadmin (uid 746) can view /mentorships/cc-status", () => {
    loginByUid(746);
    cy.visit(STATUS_PATH);

    cy.get("h1").should("contain.text", "Campus Champions");
    cy.get("body").should("contain", KNOWN_CC_TITLE);
  });

  it("ccmnet_pm-only user (uid 519) gets 403 at /mentorships/cc-status", () => {
    loginByUid(519);
    cy.request({
      url: STATUS_PATH,
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(403);
    });
  });

  it("regression: ccmnet_pm-only user (uid 519) can still load /mentorships/status", () => {
    loginByUid(519);
    cy.request(BASE_STATUS_PATH).its("status").should("eq", 200);
  });

});
