describe("Unauthenticated user tests the XDMoD Page", () => {
  it("Should test XDMoD page for unauthenticated user", () => {
    // Given I am not logged in
    // Cypress does not have a specific command for this step as it depends on your application's authentication mechanism.

    // When I go to "/ccep"
    cy.visit("/ccep");

    cy.contains("CSSN Community Engagement Program").should("be.visible");

    cy.contains("Submissions are reviewed once a month").should("be.visible");

    cy.contains(
      "CCEP (CSSN Community Engagement Program) gives travel rewards to ANYONE"
    ).should("be.visible");

    cy.contains("Submissions are reviewed once a month.").should("be.visible");

    cy.contains("Tier 1: $1,000").should("be.visible");

    cy.contains("Intro to ACCESS lecture").click();

    cy.contains(
      "Prepare an Intro to ACCESS lecture, tutorial, or slide deck for Basic, Intermediate, or Advanced User."
    ).should("be.visible");

    cy.contains(
      "Intro to ACCESS lecture for domain specific conference"
    ).click();

    cy.contains(
      "Prepare an Intro to ACCESS lecture, tutorial, or slide deck for a domain specific conference"
    ).should("be.visible");

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
    ).should("be.visible");

    cy.contains(
      "Intro to ACCESS lecture for domain specific conference AND a written document"
    ).click();

    cy.contains(
      "Prepare an Intro to ACCESS lecture, tutorial, or slide deck for a domain specific conference"
    ).should("be.visible");

    cy.contains(
      "Documentation AND tutorial/lecture/event on requested topic"
    ).click();

    cy.contains("Expand the knowledge base by contributing").should(
      "be.visible"
    );

    cy.contains(
      "Share your expertise on ask.CI, the Q&A platform for the research computing community"
    ).click();

    cy.contains(
      "Expand the community knowledge base by contributing 10 posts"
    ).should("be.visible");

    cy.contains("Tag Taxonomy Curation*").click();

    cy.contains("Currently unavailable. Assess").should("be.visible");

    cy.contains("Serve as a MATCH Plus Mentor*").click();

    cy.contains("* This opportunity will reopen Spring 2024").should(
      "be.visible"
    );

    cy.contains("Serve on the CCEP Review Committee*").click();

    cy.contains("* This opportunity will reopen Spring 2024").should(
      "be.visible"
    );

    cy.contains("Apply to CCEP").click();

    cy.origin(
      "https://docs.google.com/forms/d/e/1FAIpQLSfkD7BgQPSqCv5LjL8EOUwmt-rUuikpxisi5eD455tuSnjMJQ/viewform",
      () => {
        cy.contains("ACCESS CSSN Community Engagement").should("be.visible");
      }
    );

    cy.visit("/ccep");

    cy.contains("Intro to ACCESS lecture").click();

    cy.contains(
      "CCEP (CSSN Community Engagement Program) gives travel rewards to ANYONE for community engagement, feedback forums,"
    ).should("be.visible");

    cy.contains("See all the details").click();

    cy.contains("All CSSN members (students, faculty, staff").should(
      "be.visible"
    );
  });
});
