/*  
    This test is specifically focused on the Tools page tested for an unauthenticated user.
    This test checks for major functions like:
    Page Title, 
    Page Intro,
    and testing one tool 
    
*/

describe("Unauthenticated user tests the CCEP Details Page", () => {
  it("Should test CCEP Details page for unauthenticated user", () => {
    //Below line will eventually change to (/tools/overview)
    cy.visit("/tools");

    //Page Title And Intro Paragraph
    cy.get(".page-title").contains("Tools");
    cy.get(".clearfix > .prose").contains(
      "Try these cutting-edge tools designed to streamline your time to science."
    );

    //Testing OnDeman Tool Row
    cy.get(":nth-child(3) > p").contains(
      "Utilize remote computing resources easily from any device."
    );
    cy.get(".clearfix > .grid > :nth-child(4)").contains(
      "Remote access web portal"
    );

    //Testing Find Out More btn for OnDemand Row
    cy.get(":nth-child(3) > div > .btn").contains("FIND OUT MORE").click();
    cy.contains("ACCESS OnDemand");
  });
});
