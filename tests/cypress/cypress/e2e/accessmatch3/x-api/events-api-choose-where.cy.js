/**
 * Test that API responses respect choose_where_to_share_this visibility settings.
 *
 * This test verifies that the API only returns events that should be
 * visible on the main events page (same behavior as the public listing page).
 */

describe("Events API - choose_where_to_share_this Field", () => {

  it("Should only return events with 'on_the_announcements_page' visibility", () => {
    // Request all items to ensure we get our test events (they may not be in first 100)
    cy.request('/api/2.2/events?items_per_page=All').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');

      // Should include events marked for main page
      const mainPageOnly = response.body.find(e =>
        e.title === 'Test Event - Main Page Only'
      );
      const bothLocations = response.body.find(e =>
        e.title === 'Test Event - Both Locations'
      );

      expect(mainPageOnly).to.exist;
      expect(bothLocations).to.exist;
    });
  });

  it("Should NOT return events without 'on_the_announcements_page' visibility", () => {
    // Request all items to ensure comprehensive check
    cy.request('/api/2.2/events?items_per_page=All').then((response) => {
      expect(response.status).to.eq(200);

      // Should NOT include events not marked for main page
      const affinityGroupOnly = response.body.find(e =>
        e.title === 'Test Event - Affinity Group Only'
      );
      const noVisibility = response.body.find(e =>
        e.title === 'Test Event - No Visibility'
      );

      expect(affinityGroupOnly).to.be.undefined;
      expect(noVisibility).to.be.undefined;
    });
  });

});
