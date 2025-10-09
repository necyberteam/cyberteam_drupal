/**
 * Test that API 1.0 and 1.1 responses respect choose_where_to_share_this visibility settings.
 *
 * These older APIs require a tag argument (use /all to get all events).
 * This test verifies that visibility filtering works correctly in these legacy endpoints.
 */

describe("Events API 1.0 and 1.1 - choose_where_to_share_this Field", () => {

  describe("API 1.0", () => {

    it("Should require tag argument - empty without it", () => {
      cy.request('/api/1.0/events?_format=json').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.eq(0);
      });
    });

    it("Should only return events with 'on_the_announcements_page' visibility when using /all", () => {
      cy.request('/api/1.0/events/all?_format=json').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);

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
      cy.request('/api/1.0/events/all?_format=json').then((response) => {
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

  describe("API 1.1", () => {

    it("Should require tag argument - empty without it", () => {
      cy.request('/api/1.1/events?_format=json').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.eq(0);
      });
    });

    it("Should only return events with 'on_the_announcements_page' visibility when using /all", () => {
      cy.request('/api/1.1/events/all?_format=json').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);

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
      cy.request('/api/1.1/events/all?_format=json').then((response) => {
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

  describe("API version comparison", () => {

    it("Should return same events across API 1.0 and 1.1", () => {
      let api10Events;
      let api11Events;

      cy.request('/api/1.0/events/all?_format=json').then((response) => {
        expect(response.status).to.eq(200);
        api10Events = response.body.filter(e => e.title.startsWith('Test Event'));

        cy.request('/api/1.1/events/all?_format=json').then((response) => {
          expect(response.status).to.eq(200);
          api11Events = response.body.filter(e => e.title.startsWith('Test Event'));

          // Both should return same test events
          expect(api10Events.length).to.eq(api11Events.length);
          expect(api10Events.length).to.eq(2);

          // Both should have the same titles
          const titles10 = api10Events.map(e => e.title).sort();
          const titles11 = api11Events.map(e => e.title).sort();
          expect(titles10).to.deep.equal(titles11);
        });
      });
    });

  });

});
