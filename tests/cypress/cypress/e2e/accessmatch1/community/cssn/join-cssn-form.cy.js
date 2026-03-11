/*
    The Join the CSSN form page for an authenticated user.

    Joining the CSSN as a general member should add the ACCESS CSSN as a program/region
    and add them to the CSSN Affinity Group.

    Joining as a student, mentor, consultant, or CIP should add the associated role.
*/

describe("Authenticated user tests the form to join the CSSN", () => {
  it("Should test CSSN page for authenticated user", () => {
    // login user with the "authenticated" role
    cy.loginAs("pecan@pie.org", "Pecan");

    // Visit the CSSN page where the webform is embedded in node 6111.
    // The custom submit handler (cssn_form_submit) only fires when the
    // form is loaded via the node embed, not the standalone /form/ URL.
    cy.visit("/community/cssn#join-cssn");

    //Selecting a CSSN Role
    cy.get("#edit-i-am-joining-as-a-general-member").check();

    // Wait before submitting to avoid honeypot
    cy.wait(2000);

    //Submit Button and Submission confirmation
    cy.get("#edit-actions-submit").click();
    cy.get(".messages--status", { timeout: 10000 }).should('exist');

    // Check the community persona to see if the program/region was added.
    cy.visit("/community-persona");

    // Check that CSSN member is displayed on community persona.
    cy.get('#block-communitypersonablock-4 .persona').contains("CSSN Member")
  });
});
