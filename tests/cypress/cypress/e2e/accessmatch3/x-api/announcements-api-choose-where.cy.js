/**
 * Test that API responses respect choose_where_to_share_this visibility settings.
 *
 * This test verifies that the API only returns announcements that should be
 * visible on the main announcements page (same behavior as the public listing page).
 */

describe("Announcements API - choose_where_to_share_this Field", () => {

  it("Should only return announcements with 'on_the_announcements_page' visibility", () => {
    cy.request('/api/2.2/announcements').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');

      // Should include announcements marked for main page
      const mainPageOnly = response.body.find(a =>
        a.title === 'Test Announcement - Main Page Only'
      );
      const bothLocations = response.body.find(a =>
        a.title === 'Test Announcement - Both Locations'
      );

      expect(mainPageOnly).to.exist;
      expect(bothLocations).to.exist;
    });
  });

  it("Should NOT return announcements without 'on_the_announcements_page' visibility", () => {
    cy.request('/api/2.2/announcements').then((response) => {
      expect(response.status).to.eq(200);

      // Should NOT include announcements not marked for main page
      const affinityGroupOnly = response.body.find(a =>
        a.title === 'Test Announcement - Affinity Group Only'
      );
      const noVisibility = response.body.find(a =>
        a.title === 'Test Announcement - No Visibility'
      );
      const emailOnly = response.body.find(a =>
        a.title === 'Test Announcement - Email Only'
      );

      expect(affinityGroupOnly).to.be.undefined;
      expect(noVisibility).to.be.undefined;
      expect(emailOnly).to.be.undefined;
    });
  });

});
