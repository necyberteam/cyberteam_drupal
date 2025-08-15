describe("test individual tags page", () => {

  it("Verify non-admin content for tag 'bioinformatics'", () => {
    cy.visit('/tags/bioinformatics');
    cy.contains('bioinformatics');
    cy.contains('Mentors and Regional Facilitators');
    cy.contains('Brett Milash');
    cy.contains('Campus Champions');
    cy.contains('Topics from Ask.CI');
    cy.contains('There are no Blog Entries associated with this topic.');
    cy.contains('Export Mailing List').should('not.exist');
  });

  it("Verify admin content for tag 'bioinformatics' shows mailing list", () => {
    cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
    cy.visit('/tags/bioinformatics');
    cy.contains('Export Mailing List');
  });

  it("logged-in admin: Add a 'test-affinity-group' for login tag and verify it appears", () => {
    cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
    cy.visit('/node/add/affinity_group');
    cy.get('input[name="title[0][value]"]').type('test-affinity-group', { delay: 0 });
    cy.get('[data-tid="682"]').click(); // Login tag
    cy.get('input[name="field_group_slug[0][value]"]').type('test-affinity-group', { delay: 0 });
    cy.get('input[name="field_group_id[0][value]"]').type('test.group.id', { delay: 0 });
    cy.get('#edit-submit').click();
    cy.visit('/admin/content');
    cy.get('tbody > :nth-child(1) > .views-field-title > a').click();
    cy.contains('test-affinity-group');

  });

  it("logged-out: Add a 'test-affinity-group' for login tag and verify it appears", () => {
    cy.visit('/tags/login');
    cy.contains('test-affinity-group').click();
  });

  it("logged-in authenticated: Add a 'test-affinity-group' for login tag and verify it appears", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/tags/login');
    cy.contains('test-affinity-group');
  });

  it("Verify the 'test-login-resource' KB Resource shows", () => {
    cy.visit('/tags/login');
    cy.contains('test-login-resource');
  });

  it("Add a 'test-login-project' for login & projects", () => {
    cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
    cy.visit('/projects');
    cy.contains('Submit New Project').click();
    cy.get('input[name="approved_milestones"]').check();
    cy.get('input[name="approved"]').check();
    cy.get('input[name="project_title"]').type('test-project-title', { delay: 0 });

    cy.get('input[name="region[345]"]').check(); // At-Large
    cy.get('input[name="tags[682]"]').check(); // Login tag
    cy.get('input[name="tags[683]"]').check(); // Password tag
    cy.get('input[name="project_leader[first]"]').clear();
    cy.get('input[name="project_leader[first]"]').type('test-first-name', { delay: 0 });
    cy.get('input[name="project_leader[last]"]').clear();
    cy.get('input[name="project_leader[last]"]').type('test-last-name', { delay: 0 });
    cy.get('input[name="email"]').clear();
    cy.get('input[name="email"]').type('test@email.com', { delay: 0 });
    cy.get('textarea[name="project_description"]').type('test project description', { delay: 0 });
    cy.get('#edit-actions-01-submit').click();
    cy.contains('test-project-title');
    cy.contains('test project description');
  });

  it("As a not logged in user, verify 'test-login-project' exists", () => {
    cy.visit('/tags/login');
    cy.contains('test-project-title').click();
    cy.contains('test project description');
    cy.visit('/tags/password');
    cy.contains('test-project-title');
  });

  it("As an authenticated user, verify 'test-login-project' exists", () => {
    cy.loginUser("authenticated@amptesting.com", "6%l7iF}6(4tI");
    cy.visit('/tags/login');
    cy.contains('test-project-title').click();
    cy.contains('test project description');
    cy.visit('/tags/password');
    cy.contains('test-project-title');
  });

  it("Testing Tags display information for resource, projects, etc", () => {
    cy.visit('/tags/big-data');
    cy.contains('big-data');
    cy.contains('Knowledge Base Resources');
    cy.contains('Mentors and Regional Facilitators');
    cy.contains('Tony Elam');
    cy.contains('Kentucky');
    cy.contains('Skills');
    cy.contains('Interest');
    cy.contains('Affinity Groups');
    cy.contains('Large Data Sets');
    cy.contains('For people who evaluate or use storage options for researchers with large data sets.');
    cy.contains('cloud-storage');
    cy.contains('Join');
    cy.contains('Topics from Ask.CI');
    cy.contains('Users');
    cy.contains('Name');
    cy.contains('image-processing');
    cy.contains('There are no Blog Entries associated with this topic.');
  });

});
