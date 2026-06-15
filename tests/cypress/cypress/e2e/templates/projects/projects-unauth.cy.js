describe("test projects/engagements page", () => {

  it("Unauthenticated user Test the Projects/Engagements Page", () => {
    cy.visit('/projects');
    cy.contains('Projects');
    cy.contains('Login to Add New Project');
    cy.contains('Title');
    cy.contains('Project Institution');
    cy.contains('Project Owner');
    cy.contains('Tags');
    cy.contains('Status');
    cy.contains('Project Leader');

    // The /projects search is a Views AJAX exposed filter (better_exposed_filters,
    // auto-submit on input) that rebuilds the result list asynchronously. Rather
    // than wait on the AJAX request itself — clear() does not reliably fire a
    // catchable views/ajax call — wait on the DOM condition each step actually
    // needs. cy.contains/cy.get already retry until the condition holds; the only
    // gap was the click below racing the post-clear list rebuild, so we wait for
    // the tag link to exist (longer timeout for CI load) before clicking it.
    cy.get('input[name="search"]').type('test', { delay: 0 });
    cy.contains('test');

    cy.get('input[name="search"]').clear();
    cy.get('input[name="search"]').type('testy2002', { delay: 0 });
    cy.contains('There are no projects at this time. Please check back often as projects are added regularly.');

    cy.get('input[name="search"]').clear();
    // Wait for the full (unfiltered) list to rebuild and surface the "login" tag
    // before clicking it. The default cy.contains retry (4s) was racing the AJAX
    // rebuild under CI load; a generous timeout waits on the real DOM condition.
    // Element selector kept unconstrained (as before) so we don't assume the tag
    // markup; the subsequent URL assertion confirms it was the right link.
    cy.contains('login', { timeout: 15000 }).click();
    cy.url().should('include', '/tags/login');
  });

});
