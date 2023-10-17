/*  
    This test is specifically focused on the CCEP page tested for an unauthenticated user.
    This test checks for major functions like:
    Page Title, 
    Testing accordion function,
    and verifying links load in 
    
*/

describe("Unauthenticated user tests the CCEP Page", () => {
  it("Should test CCEP page for unauthenticated user", () => {
    cy.visit("/ccep");
    cy.contains("CSSN Community Engagement Program");
    cy.contains("Submissions are reviewed once a month");
    cy.contains(
      "CCEP (CSSN Community Engagement Program) gives travel rewards to ANYONE"
    );
    cy.contains("Submissions are reviewed once a month.");
    cy.contains("Tier 1: $1,000");
    cy.contains("Intro to ACCESS lecture").click();
    cy.contains(
      "Prepare an Intro to ACCESS lecture, tutorial, or slide deck for Basic, Intermediate, or Advanced User."
    );
    cy.contains(
      "Intro to ACCESS lecture for domain specific conference"
    ).click();
    cy.contains(
      "Prepare an Intro to ACCESS lecture, tutorial, or slide deck for a domain specific conference"
    );
    cy.contains("Documentation OR tutorial/lecture on requested topic").click();
    cy.contains("Expand the knowledge base by contributing").should(
      "be.visible"
    );
    cy.contains(
      "Expand the community knowledge base by adding CI Links"
    ).click();
    cy.contains("Share your expertise by contributing 10 of your").should(
      "be.visible"
    );
    cy.contains("ACCESS Support User Stories*").click();
    cy.contains("Currently unavailable. Provide detailed information").should(
      "be.visible"
    );
    cy.contains("Intro to ACCESS lecture AND event").click();
    cy.contains(
      "Prepare an Intro to ACCESS lecture, tutorial, or slide deck for Basic, Intermediate, or Advanced User."
    );
    cy.contains(
      "Intro to ACCESS lecture for domain specific conference AND a written document"
    ).click();
    cy.contains(
      "Prepare an Intro to ACCESS lecture, tutorial, or slide deck for a domain specific conference"
    );
    cy.contains(
      "Documentation AND tutorial/lecture/event on requested topic"
    ).click();
    cy.contains("Expand the knowledge base by contributing").should(
      "be.visible"
    );
    cy.contains(
      "Share your expertise on ask.CI, the Q&A platform for the research computing community"
    ).click();
    cy.contains("Expand the community knowledge base by contributing 10 posts");
    cy.contains("Tag Taxonomy Curation*").click();
    cy.contains("Currently unavailable. Assess");
    cy.contains("Serve as a MATCH Plus Mentor*").click();
    cy.contains("* This opportunity will reopen Spring 2024").should(
      "be.visible"
    );
    cy.contains("Serve on the CCEP Review Committee*").click();
    cy.contains("* This opportunity will reopen Spring 2024").should(
      "be.visible"
    );
    cy.contains("Apply to CCEP").click();
    cy.origin("https://docs.google.com", () => {
      cy.contains("ACCESS CSSN Community Engagement");
    });
    cy.visit("/ccep");
    cy.contains("Intro to ACCESS lecture").click();
    cy.contains(
      "CCEP (CSSN Community Engagement Program) gives travel rewards to ANYONE for community engagement, feedback forums,"
    );
    cy.contains("See all the details").click();
    cy.contains("All CSSN members (students, faculty, staff").should(
      "be.visible"
    );
  });
});
