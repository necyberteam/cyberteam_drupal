/*
* Various tests of the Community Persona page.
* - anonymous user visiting another user's page
* - user visiting their own page
* - user editing their own page
* - admin user undoing the edits the user made and verifying changes
*
*/
describe('Anonymous user visit the community-persona page - anon_cp_redirect_login', () => {
  it('should find expected stuff', () => {
    anon_cp_redirect_login();
  });
});

describe('Anonymous user visit the community-persona page - anon_verify_user201_cp', () => {
  it('should find expected stuff', () => {
    anon_verify_user201_cp();
  });
});

describe('Anonymous user visit the community-persona page - user199_verify_self_cp', () => {
  it('should find expected stuff', () => {
    user199_verify_self_cp();
  });
});

describe('Anonymous user visit the community-persona page - user199_edit_self', () => {
  it('should find expected stuff', () => {
    cy.loginAs('walnut@pie.org', 'Walnut');
    user199_edit_self();
  });
});

describe('Anonymous user visit the community-persona page - admin_unedit_user199', () => {
  it('should find expected stuff', () => {
    admin_unedit_user199();
  });
});

/**
 * Verify anonymous user redirect to login if they try to access community-persona.
 */
function anon_cp_redirect_login() {
  cy.request({
    url: '/community-persona',
    followRedirect: false, // turn off following redirects
  }).then((resp) => {
    expect(resp.redirectedToUrl).to.have.string(
      'user/login?redirect=/community-persona');
  })
}

/**
 * Verify anonymous user visiting user 201 cp
 */
function anon_verify_user201_cp() {
  // verify breadcrumbs for another user
  cy.visit('/community-persona/201');
  const crumbs = [
    ['Support', '/'],
    ['Community Persona', null],
    ['Pecan Pie', null]
  ];
  cy.checkBreadcrumbs(crumbs);

  cy.get('#block-communitypersonablock-4 > .persona').wrap(($persona) => {
    $persona.contains('Pecan Pie');
    $persona.contains('institution-for-pecan-pie');
    $persona.contains('Not a CSSN Member')
      .parent().parent()
      .contains('info')
      .should('have.attr', 'href', '/cssn');
    $persona.contains('CampusChampionsAdmin');
    $persona.contains('CCMNet PM');
    $persona.contains('Programs')
      .contains("Northeast");
    $persona.contains('Send Email')
      .should('have.attr', 'href')
      .and('contain', '/user/201/contact?destination=community-persona/201');
  });
}

/**
 *  user199 user visits their own community-persona page
 */
function user199_verify_self_cp() {
  cy.loginAs('walnut@pie.org', 'Walnut');

  cy.visit('/community-persona');

  // verify breadcrumbs for self
  let crumbs = [
    ['Support', '/'],
    ['Community Persona', null]
  ];
  cy.checkBreadcrumbs(crumbs);

  cy.get('#block-communitypersonablock-4 > .persona').wrap(($persona) => {
    $persona.contains('Walnut Pie');
    $persona.contains('institution-for-walnut-pie');
    $persona.contains('3rd year undergraduate');
    $persona.contains('Join the CSSN')
      .should('have.attr', 'href', "/form/join-the-cssn-network");
    $persona.contains('Edit Roles')
      .should('have.attr', 'href', "/form/edit-your-cssn-roles?destination=community-persona");
    $persona.contains('Edit Persona')
      .should('have.attr', 'href', "/user/199/edit?destination=community-persona");
    // todo test this page
  });

  cy.contains('Update interests')
    .should('have.attr', 'href', "/community-persona/add-interest");
  cy.contains('Update skills')
    .should('have.attr', 'href', "/community-persona/add-skill");
  cy.contains('All Affinity Groups')
    .should('have.attr', 'href', "/affinity-groups");
  cy.contains('Add Resource')
    .should('have.attr', 'href', "/form/resource");
  // Todo: MATCH Engagements only displayed on people with an Engagement
  // cy.contains('MATCH Engagements')
  //   .should('have.attr', 'href', "/engagements");
}

/**
 * user199 edits their own community-persona page
 * and verifies the changes.
 */
function user199_edit_self() {
  cy.visit('/user/199/edit?destination=community-persona');
  cy.get('#edit-field-region').contains('Great Plains').click();  // great plains

  // if there's a pic or resume, remove them - could be leftover from broken tests.
  cy.get('body').then(($body) => {
    if ($body.find("#edit-user-picture-0-remove-button").length > 0) {
      cy.get('#edit-user-picture-0-remove-button').click();
    }
    if ($body.find("#edit-field-cv-resume-0-remove-button").length > 0) {
      cy.get('#edit-field-cv-resume-0-remove-button').click();
    }
  }).then(() => {
    cy.get('[name="files[user_picture_0]"]').click();
    cy.get('[name="files[user_picture_0]"]').selectFile('cypress/fixtures/dummy-image.png');
    cy.get('[data-drupal-selector="edit-field-access-organization-0-target-id"]').type('MGHPCC');
    cy.get('[data-drupal-selector="edit-user-picture-0-alt"]').type('pic_alt_txt');
    cy.get('[name="files[field_cv_resume_0]"]').click();
    cy.get('[name="files[field_cv_resume_0]"]').selectFile('cypress/fixtures/dummy-resume.txt');
    cy.get('#edit-field-hpc-experience-0-value').clear();
    cy.get('#edit-field-hpc-experience-0-value').type('hpc experience dummy text');
    cy.get('#edit-timezone--2').type('America/Los_Angeles');

    // Have to update password when adding files (bug).
    cy.get('#edit-pass-pass1').type('Walnut');
    cy.get('#edit-pass-pass2').type('Walnut');

    cy.get('#edit-submit').click();
    cy.contains('The changes have been saved.');
    cy.url().should('contains', '/community-persona');
  });

  // verify the changes
  cy.get('#block-communitypersonablock-4 > .persona').wrap(($persona) => {
    $persona.get('img').should('have.attr', 'src').should('include', 'eclipse')
    $persona.contains('Great Plains');
  });
  cy.visit('/user/199/edit');
  cy.contains('dummy-image');
  cy.contains('dummy-resume')
}

/**
 * admin user undoes the edits user199 made to their community-persona page
 * and verifies the changes
 */
function admin_unedit_user199() {
  cy.loginAs('administrator@amptesting.com', 'b8QW]X9h7#5n');
  cy.visit('/user/199/edit?destination=community-persona');
  cy.get('#edit-field-region').contains('Northeast').click();
  cy.get('#edit-field-hpc-experience-0-value').clear();
  cy.get('#edit-user-picture-0-remove-button').click();
  cy.get('#edit-field-cv-resume-0-remove-button').click();
  cy.get('#edit-submit').click();
  cy.contains('The changes have been saved.');
  cy.url().should('contains', '/community-persona');

  cy.visit('/community-persona/201');
  cy.get('#block-communitypersonablock-4 > .persona').wrap(($persona) => {
    $persona.get('img').should('have.attr', 'src').should('not.include', 'dummy-image')
    $persona.contains('Northeast');
  });
}

