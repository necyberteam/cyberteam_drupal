/**
 * Test /form/affinity-group-request
 *
 * An authenticated user should be able to complete the affinity group request form.
 *
 * CURRENT BROKEN because some elements are covered up.
 *
 *
`<input data-drupal-selector="edit-ask-ci-locale-url" aria-describedby="edit-ask-ci-locale-url--description" type="url" id="edit-ask-ci-locale-url" name="ask_ci_locale[url]" value="" size="60" maxlength="255" class="form-url">`

is being covered by another element:

`<input data-drupal-selector="edit-slack-link-url" aria-describedby="edit-slack-link-url--description" type="url" id="edit-slack-link-url" name="slack_link[url]" value="" size="60" maxlength="255" class="form-url">`

 */
describe('test affinity group request form', () => {
  it('authenticated role should be able to complete the affinity group request form', () => {

    cy.loginAs('apple@pie.org', 'Apple');
    cy.visit('/affinity_groups');
    cy.contains('Request a group').click();
    cy.url().should('include', '/form/affinity-group-request');
    cy.visit('/form/affinity-group-request');
    // cy.contains('Affinity Group Request');
    cy.contains('Affinity Group Name');
    cy.contains('Affinity Group Image');
    cy.contains('Coordinators');
    cy.contains('Type a few letters of the name and then select from the list of names presented');
    cy.contains('Tags');
    cy.contains('Select one (or more) related CiDeR resources');
    cy.contains('Short Description');
    cy.contains('Provide a short description that will appear on the Affinity Groups directory page.');
    cy.contains('Description');
    cy.contains('Provide a description that will be displayed on this Affinity Group. It can be the same as the short description above if there is no additional information needed.');
    cy.contains('Slack');
    cy.contains('Provide a link to the Slack group if applicable');
    cy.contains('Q&A Platform');
    cy.contains('Provide a link to Ask.CI, StackExchange, or other Q&A platform specific to the Affinity Group.');
    cy.contains('Github Organization');
    cy.contains('Provide a link to the Github Organization if applicable.');
    cy.contains('Email List or Contact');
    cy.contains('Provide a link to the email list or email contact for the Affinity Group. Please enter the full URL to your mailing list including the https:// or if an email please type mailto: before the address. For example: mailto:example@email.com');
    cy.get('input[name="affinity_group_name"]').type('affinity group galaxy quest 3800');
    cy.get('#edit-short-description').type('TEST');
    cy.get('textarea[name="project_description"]').type('TEST');
    cy.get('#edit-ask-ci-locale-url').type('http://1.com');
    cy.get('#edit-slack-link-url').type('http://2.com');
    cy.get('#edit-github-organization-url').type('http://3.com');
    cy.get('#edit-email-list-or-contact').type('mailto:a@b.com');
    cy.get('#edit-submit').click();
    cy.contains('Thank you for your submission. We will contact you when your affinity group has been created.');
  });
});
