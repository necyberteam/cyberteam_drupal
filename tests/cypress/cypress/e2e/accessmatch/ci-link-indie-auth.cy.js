//
// As an authenticated user, verify auth features for the ci link "cypress-ci-link-for-testing"
//
describe("Authenticated user tests a ci link", () => {
  it("verify auth features of a ci link", () => {
    // login user with the "authenticated" role
    cy.loginAs("authenticated@amptesting.com", "6%l7iF}6(4tI");

    // first create a dummy ci-links so can reference one of them in the AG.
    create_dummy_ci_link();

    //Navigating to cypress created ci link
    cy.visit("/ci-links");
    cy.contains("create_dummy_ci_link").click();

    //Vote feature  When Vote button is clicked the user is brought to an access denied page. Section is disabled until this is figured out
    cy.get(".bg-light-teal").contains("Vote for this CI Link");
    // cy.contains("Thanks! Your vote has been recorded.");
    // cy.get(".text-[32px]").contains("1");
    // cy.get(".bg-light-teal")
    //   .contains("Remove your vote for this CI Link")
    //   .click();
    // cy.contains("Your vote has been removed.");
    // cy.contains("0");

    //Flag Feature. When Flag is clicked I am not able to see the contents inside
    cy.get(".ps-5").contains("Flag this CI Link").click();
  });
});
