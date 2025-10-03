/**
 * Test event visibility based on choose_where_to_share_this field.
 *
 * These tests use fixtures created by amp_dev module.
 * See web/modules/custom/amp_dev/TEST_FIXTURES.md for fixture details.
 */

describe('Event Visibility - choose_where_to_share_this Field', () => {

  describe('Main Events Page (/events)', () => {

    it('Should show events with "on_the_announcements_page" selected', () => {
      cy.visit('/events');

      // Search for our test events
      cy.get('input[name="search_api_fulltext"]').type('Test Event{enter}');
      cy.wait(1000);

      // Should appear in Upcoming Events
      cy.contains('Test Event - Main Page Only').should('exist');
      cy.contains('Test Event - Both Locations').should('exist');

      // Should NOT appear
      cy.contains('Test Event - Affinity Group Only').should('not.exist');
      cy.contains('Test Event - No Visibility').should('not.exist');
    });

    it('Should filter events while respecting visibility settings', () => {
      cy.visit('/events');

      // Search for our test events first
      cy.get('input[name="search_api_fulltext"]').type('Test Event{enter}');
      cy.wait(1000);

      // Apply a filter (e.g., event type)
      cy.get('#custom-event-type-training').check();
      cy.wait(1000);

      // Should still respect visibility settings
      cy.contains('Test Event - Main Page Only').should('exist');
      cy.contains('Test Event - Affinity Group Only').should('not.exist');
    });

  });

  describe('Affinity Group Page (/affinity-groups/access-support)', () => {

    it('Should show events with "on_your_affinity_group_page" selected', () => {
      cy.visit('/affinity-groups/access-support');

      // Should appear in the events block
      cy.contains('Test Event - Affinity Group Only').should('exist');
      cy.contains('Test Event - Both Locations').should('exist');

      // Should NOT appear
      cy.contains('Test Event - Main Page Only').should('not.exist');
      cy.contains('Test Event - No Visibility').should('not.exist');
    });

  });

  describe('Cross-location Visibility', () => {

    it('Should show "Both Locations" event on both pages', () => {
      // Check main page
      cy.visit('/events');
      cy.get('input[name="search_api_fulltext"]').type('Test Event{enter}');
      cy.wait(1000);
      cy.contains('Test Event - Both Locations').should('exist');

      // Check AG page
      cy.visit('/affinity-groups/access-support');
      cy.contains('Test Event - Both Locations').should('exist');
    });

    it('Should NOT show "No Visibility" event anywhere', () => {
      // Check main page
      cy.visit('/events');
      cy.get('input[name="search_api_fulltext"]').type('Test Event{enter}');
      cy.wait(1000);
      cy.contains('Test Event - No Visibility').should('not.exist');

      // Check AG page
      cy.visit('/affinity-groups/access-support');
      cy.contains('Test Event - No Visibility').should('not.exist');
    });

  });

  describe('Individual Event Pages', () => {

    it('Should allow direct access to event page regardless of visibility settings', () => {
      cy.visit('/events');

      // Get direct URL to "Main Page Only" event
      cy.get('input[name="search_api_fulltext"]').type('Test Event{enter}');
      cy.wait(1000);
      cy.contains('Test Event - Main Page Only').click();
      cy.url().should('include', '/events/');

      // Should be able to view the event page
      cy.contains('Test Event - Main Page Only').should('exist');
      cy.contains('This is a test event for Cypress testing').should('exist');
    });

  });


});
