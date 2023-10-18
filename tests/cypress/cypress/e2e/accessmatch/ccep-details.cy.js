/*  
    This test is specifically focused on the CCEP page tested for an unauthenticated user.
    This test checks for major functions like:
    Page Title, 
    Header text,
    and a segment of body paragraph 
    
*/

describe("Unauthenticated user tests the CCEP Details Page", () => {
  it("Should test CCEP Details page for unauthenticated user", () => {
    cy.visit("/ccep-details");
    cy.contains("CCEP Details");
    cy.contains("Important Fine Print:");
    cy.contains(
      "All CSSN members (students, faculty, staff, or CI professionals) seeking CCEP rewards need to be affiliated"
    );
  });
});
