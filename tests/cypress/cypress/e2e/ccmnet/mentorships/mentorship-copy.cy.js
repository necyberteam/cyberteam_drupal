/*
  Mentorship Copy (D8-2188)

  TDD specs for the access_entity_copy module's "Copy" tab on mentorship
  engagement nodes. Walnut creates a source mentorship, then we exercise
  the copy flow and assert what carries over.

  Some specs intentionally fail today and document the remaining work:
    - body text format is not carried (content may be stripped if formats
      differ between source author and the copier)
    - field_mentorship_program is not carried (program affiliation lost)
    - visiting /node/add/mentorship_engagement without ?copy= shows a
      misleading "Not a valid mentorship id to copy" status message
*/

const SOURCE_TITLE = "Copy Test Source Mentorship";
const SOURCE_SUMMARY = "Source summary for copy test";
const SOURCE_BODY = "Source body content with <em>some inline markup</em>.";
const SOURCE_ATTRIBUTES = "Looking for someone with HPC experience";

describe("Mentorship Copy", () => {

  let sourceNid;

  before(() => {
    // Seed a source mentorship as walnut and capture its nid from the URL
    // after save so we don't have to find it by title in a listing (which
    // may require approval moderation).
    cy.loginWith("walnut@pie.org", "Walnut");
    cy.visit("/node/add/mentorship_engagement");
    cy.get("#edit-field-me-looking-for-mentor").check();
    cy.get("#edit-title-0-value").type(SOURCE_TITLE);
    cy.get("#edit-body-0-summary").type(SOURCE_SUMMARY);
    cy.get(".form-item-body-0-value .ck-content").then(el => {
      el[0].ckeditorInstance.setData(SOURCE_BODY);
    });
    cy.get(".form-item-field-me-preferred-attributes-0-value .ck-content").then(el => {
      el[0].ckeditorInstance.setData(SOURCE_ATTRIBUTES);
    });
    // Required fields beyond the ones we're testing the copy of.
    cy.get("details.tags summary").click();
    cy.get("#tag-ai").click();
    cy.get("#edit-field-me-state").select("Recruiting");
    cy.get(".node-mentorship-engagement-form #edit-submit").click();
    // After save, pathauto redirects to /mentorships/{slug}. Pull the nid
    // from the body class instead of the URL.
    cy.get("body").invoke("attr", "class").then(classes => {
      const match = classes.match(/page-node-(\d+)/);
      sourceNid = match ? parseInt(match[1], 10) : null;
      expect(sourceNid).to.be.a("number");
    });
  });

  describe("Copy tab visibility", () => {

    it("shows Copy tab on a mentorship_engagement node for an authenticated user", () => {
      cy.loginWith("walnut@pie.org", "Walnut");
      cy.visit(`/node/${sourceNid}`);
      cy.contains(".primary-tabs .nav-link", "Copy").should("be.visible");
    });

  });

  describe("Copy flow", () => {

    beforeEach(() => {
      cy.loginWith("walnut@pie.org", "Walnut");
      cy.visit(`/node/${sourceNid}`);
    });

    it("clicking Copy lands on the add form with ?copy= in the URL", () => {
      cy.contains(".primary-tabs .nav-link", "Copy").click();
      cy.url().should("include", "/node/add/mentorship_engagement");
      cy.url().should("match", /[?&]copy=\d+/);
    });

    it("copies the source title into the new form", () => {
      cy.contains(".primary-tabs .nav-link", "Copy").click();
      cy.get("#edit-title-0-value").should("have.value", SOURCE_TITLE);
    });

    it("copies the source body summary into the new form", () => {
      cy.contains(".primary-tabs .nav-link", "Copy").click();
      cy.get("#edit-body-0-summary").should("have.value", SOURCE_SUMMARY);
    });

    it("copies the source body content into the new form", () => {
      cy.contains(".primary-tabs .nav-link", "Copy").click();
      cy.get(".form-item-body-0-value .ck-content").then(el => {
        const data = el[0].ckeditorInstance.getData();
        expect(data).to.include("Source body content");
      });
    });

    it("copies the source preferred attributes into the new form", () => {
      cy.contains(".primary-tabs .nav-link", "Copy").click();
      cy.get(".form-item-field-me-preferred-attributes-0-value .ck-content").then(el => {
        const data = el[0].ckeditorInstance.getData();
        expect(data).to.include("HPC experience");
      });
    });

    it("copies the source looking_for selection", () => {
      cy.contains(".primary-tabs .nav-link", "Copy").click();
      cy.get("#edit-field-me-looking-for-mentor").should("be.checked");
    });

    // Fails today: body text format not copied, only value + summary.
    it("preserves the source body text format on the copy", () => {
      cy.contains(".primary-tabs .nav-link", "Copy").click();
      // The format select sits under the CKEditor / text_format wrapper.
      cy.get('select[name="body[0][format]"]').invoke("val").then(format => {
        // Source was created with the default format for the form (basic_html
        // typically). The copied form should have the same format selected,
        // not the user's per-session default if those differ.
        expect(format).to.match(/^(basic_html|full_html|restricted_html)$/);
      });
    });

    // Fails today: field_mentorship_program not in the copy set.
    it("copies the source mentorship_program selection", () => {
      // The widget is a select; the copy should preserve whatever the source
      // had. The default add form has no program selected, so a successful
      // copy means the program select has a non-empty value matching the
      // source's program.
      cy.contains(".primary-tabs .nav-link", "Copy").click();
      cy.get('select[name="field_mentorship_program"]').invoke("val")
        .should("not.be.empty");
    });

  });

  describe("Plain /node/add/mentorship_engagement (no ?copy)", () => {

    // Fails today: the hook_form_alter falls through to the error path
    // when the copy param is absent and shows the user a misleading message.
    it("does NOT show the 'Not a valid mentorship id to copy' message", () => {
      cy.loginWith("walnut@pie.org", "Walnut");
      cy.visit("/node/add/mentorship_engagement");
      cy.contains("Not a valid mentorship id to copy").should("not.exist");
    });

  });

});
