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
    cy.visit("/form/join-the-cssn-network");

    //Page Title
    cy.get(".page-title").contains("Join the CSSN Network");

    //Selecting a CSSN Role
    cy.get("#edit-i-am-joining-as-a-general-member").click();

    // Wait before submitting to avoid honeypot
    cy.wait(2000);

    //Submit Button and Submission confirmation
    cy.get("#edit-actions-submit").click();
    cy.get(".messages--status").contains(
      "Thanks for updating your CSSN membership."
    );

    // Check the community persona to see if the program/region was added.
    cy.visit("/community-persona");
    cy.get(".persona .institution + div > p > strong").contains("CSSN Member")
    // Check that the affinity group was flagged.
    cy.get("#block-mainpagecontent > div:nth-child(3) ul li").contains("CSSN")
  });
});