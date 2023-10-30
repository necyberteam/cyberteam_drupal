/*  
    This test is specifically focused on the Announcements page tested for an unauthenticated user.
    This test checks for major functions like: 
    Filter Functionality,
    Headers,
    Testing created announcement

        *Created announcement does not show when filter is applied*

        
*/
describe("Unauthenticated user tests the Announcements Page", () => {
  it("Should test the Announcements page for unauthenticated user", () => {
    cy.visit("/announcements");
    cy.contains("Announcements");
    //Testing created annoucement
    cy.get("#edit-field-affiliation-value--2").select("Community");
    cy.get("#edit-tid--2").select("login");
    cy.get("#edit-submit-access-news--2").click();
    cy.contains("http://example-0.com").click();
    //Should I have the below line click on the tag or simply just check for it
    cy.contains("login");
    cy.contains("Affiliation");
    cy.contains("Community");
    //Testing another announcement
    cy.visit("/announcements");
    cy.contains("Gateways 2023 Call for Participation").click();
    cy.contains("Gateways 2023 Call for Participation");
    cy.contains(
      "Monday, October 30 – Wednesday, November 1, 2023 | Pittsburgh, PA"
    );
    cy.contains("https://sciencegateways.org/gateways2023");
    cy.contains("04/13/2023");
    cy.contains("Overview:");
    cy.contains(
      "Science gateways are end-to-end solutions with easy-to-use interfaces"
    );
  });
});
