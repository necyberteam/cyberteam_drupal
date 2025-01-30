describe("Test Affinity Group API", () => {

  it("logged-in admin: Add a 'test-affinity-group-api' for ai tag and verify it appears", () => {
    cy.loginAs('administrator@amptesting.com', 'b8QW]X9h7#5n');
    cy.visit('/node/add/affinity_group');
    cy.get('input[name="title[0][value]"]').type('test-affinity-group-api');
    cy.get('[data-tid="271"]').click(); // AI tag
    cy.get('input[data-drupal-selector="edit-field-resources-entity-reference-0-target-id"]').type('1');
    cy.get('input[name="field_group_slug[0][value]"]').type('test-affinity-group-api');
    cy.get('input[data-drupal-selector="edit-field-affinity-events-0-target-id"]').type('example-event');
    cy.get('input[name="field_group_id[0][value]"]').type('test.group.api');
    cy.get('#edit-submit').click();
    cy.visit('/admin/content');
    cy.get('tbody > :nth-child(1) > .views-field-title > a').click();
    cy.contains('test-affinity-group-api');

    cy.get('.font-medium > .block').contains('example-event').click();
    cy.get('.tabs > :nth-child(2) > a').contains('Edit').click();
    cy.contains('Edit the series').click();
    cy.get('input[data-drupal-selector="edit-field-affinity-group-node-0-target-id"]').clear();
    cy.get('input[data-drupal-selector="edit-field-affinity-group-node-0-target-id"]').type('test-affinity-group-api');
    cy.get('#edit-submit').click();
  });

  it("logged-out: Check for 'test-affinity-group-api' under the ai tag and verify it appears", () => {
    cy.visit('/tags/271/affinity-groups');
    cy.contains('test-affinity-group-api').click();
  });

  it("Verify the 'test-login-resource-api' in api.", () => {
    cy.request('/api/1.0/affinity_groups/test.group.api').then(response => {
      expect(response.status).to.equal(200)
      expect(response.body[0]['title']).to.equal('test-affinity-group-api')
    })
  });

  it("Verify that 'dummy-ci-link-for-testing-knowledge-base' KB shows up under AG in api.", () => {
    cy.request('/api/1.0/kb/test.group.api').then(response => {
      expect(response.status).to.equal(200)
      expect(response.body[0]['title']).to.equal('dummy-ci-link-for-testing-knowledge-base')
    })
  });

  it("Verify that 'example-event' appears in events api.", () => {
    cy.request('/api/1.1/events/ag/test.group.api').then(response => {
      expect(response.status).to.equal(200)
      expect(response.body[0]['title']).to.equal('example-event')
    })
  });

});
