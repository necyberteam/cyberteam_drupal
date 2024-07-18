/*
    CCMnet Homepage for an unauthenticated user.
*/
describe("Unauthenticated user tests the CCMNet Homepage", () => {
    it("Should test the CCMNet Homepage for unauthenticated user", () => {
      cy.visit("/");
  
      // Site heading
      cy.get(".site-heading").contains(
        "Join us at the first annual CCMnet meeting"
      );
      
    });
  });
  