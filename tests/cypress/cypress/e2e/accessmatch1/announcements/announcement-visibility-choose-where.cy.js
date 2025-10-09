/**
 * Test announcement visibility based on choose_where_to_share_this field.
 *
 * These tests use fixtures created by amp_dev module.
 * See web/modules/custom/amp_dev/TEST_FIXTURES.md for fixture details.
 */

describe('Announcement Visibility - choose_where_to_share_this Field', () => {

  describe('Main Announcements Page (/announcements)', () => {

    it('Should show announcements with "on_the_announcements_page" selected', () => {
      cy.visit('/announcements');

      // Should appear
      cy.contains('Test Announcement - Main Page Only').should('exist');
      cy.contains('Test Announcement - Both Locations').should('exist');

      // Should NOT appear
      cy.contains('Test Announcement - Affinity Group Only').should('not.exist');
      cy.contains('Test Announcement - No Visibility').should('not.exist');
      cy.contains('Test Announcement - Email Only').should('not.exist');
      cy.contains('Test Announcement - Digest Only').should('not.exist');
    });

    it('Should filter announcements by tag while respecting visibility settings', () => {
      cy.visit('/announcements');

      // Filter by 'ai' tag
      cy.get('#edit-tid--2').select('ai');
      cy.get('#edit-submit-access-news--2').click();

      // Should still only show announcements with "on_the_announcements_page"
      cy.contains('Test Announcement - Main Page Only').should('exist');
      cy.contains('Test Announcement - Both Locations').should('exist');
      cy.contains('Test Announcement - Affinity Group Only').should('not.exist');
    });

  });

  describe('Affinity Group Page (/affinity-groups/access-support)', () => {

    it('Should show announcements with "on_your_affinity_group_page" selected', () => {
      cy.visit('/affinity-groups/access-support');

      // Look in the announcements/events block
      cy.get('.block-access-affinitygroup.block-affinity-bottom-left').within(() => {
        // Should appear
        cy.contains('Test Announcement - Affinity Group Only').should('exist');
        cy.contains('Test Announcement - Both Locations').should('exist');

        // Should NOT appear
        cy.contains('Test Announcement - Main Page Only').should('not.exist');
        cy.contains('Test Announcement - No Visibility').should('not.exist');
        cy.contains('Test Announcement - Email Only').should('not.exist');
        cy.contains('Test Announcement - Digest Only').should('not.exist');
      });
    });

  });

  describe('Cross-location Visibility', () => {

    it('Should show "Both Locations" announcement on both pages', () => {
      // Check main page
      cy.visit('/announcements');
      cy.contains('Test Announcement - Both Locations').should('exist');

      // Check AG page
      cy.visit('/affinity-groups/access-support');
      cy.get('.block-access-affinitygroup.block-affinity-bottom-left').within(() => {
        cy.contains('Test Announcement - Both Locations').should('exist');
      });
    });

    it('Should NOT show "No Visibility" announcement anywhere', () => {
      // Check main page
      cy.visit('/announcements');
      cy.contains('Test Announcement - No Visibility').should('not.exist');

      // Check AG page
      cy.visit('/affinity-groups/access-support');
      cy.contains('Test Announcement - No Visibility').should('not.exist');
    });

  });

  describe('Individual Announcement Pages', () => {

    it('Should allow direct access to announcement even with no visibility settings', () => {
      cy.visit('/announcements');

      // Get direct URL to "Main Page Only" announcement
      cy.contains('Test Announcement - Main Page Only').click();
      cy.url().should('include', '/announcement');

      // Should be able to view the announcement page
      cy.get('h1').should('contain', 'Test Announcement - Main Page Only');
      cy.get('.field--name-body').should('contain', 'main /announcements page');
    });

  });

});
