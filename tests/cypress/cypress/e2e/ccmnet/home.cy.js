/*
    CCMnet Homepage for an unauthenticated user.
*/
describe("Unauthenticated user tests the CCMNet Homepage", () => {
    it("Should test the CCMNet Homepage for unauthenticated user", () => {
      cy.visit("/");
  
      // Site heading
      cy.get(".site-heading").contains(
        "Participate in mentorships to make connections and exchange knowledge"
      );
      
    });
  });
  