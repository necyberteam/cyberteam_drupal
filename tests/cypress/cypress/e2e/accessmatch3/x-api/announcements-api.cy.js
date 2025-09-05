describe("Test Announcements API", () => {

  it("Basic announcements API endpoint returns correct structure", () => {
    cy.request('/api/2.1/announcements').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers).to.have.property('content-type').that.includes('application/json');
      
      // Check that response is an array
      expect(response.body).to.be.an('array');
      
      // Should have at least some announcements
      expect(response.body.length).to.be.greaterThan(0);
      
      const announcement = response.body[0];
      
      // Test that all expected fields are present
      const expectedFields = [
        'title', 'body', 'field_published_date', 'custom_announcement_ag',
        'custom_announcement_tags', 'field_affiliation'
      ];
      
      expectedFields.forEach(field => {
        expect(announcement, `Missing field: ${field}`).to.have.property(field);
      });
      
      // Test field types and that they contain actual data
      expect(announcement.title).to.be.a('string').and.not.be.empty;
      expect(announcement.body).to.be.a('string');
      expect(announcement.field_published_date).to.be.a('string').and.not.be.empty;
      
      // Log announcement details for debugging
      cy.log('Found announcement:', announcement.title);
      cy.log('Published date:', announcement.field_published_date);
      cy.log('Tags:', announcement.custom_announcement_tags);
      cy.log('Affinity Group:', announcement.custom_announcement_ag);
    });
  });

  it("Test filtering by tags parameter with real data", () => {
    // First get all announcements to see what tags exist
    cy.request('/api/2.1/announcements')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        
        // Log available tags for debugging
        const tags = [...new Set(response.body.map(ann => ann.custom_announcement_tags).filter(tag => tag))];
        cy.log('Available tags:', tags);
        
        if (tags.length > 0) {
          // Test filtering by the first available tag
          const testTag = tags[0];
          cy.request(`/api/2.1/announcements?tags=${testTag}`)
            .then((tagResponse) => {
              expect(tagResponse.status).to.eq(200);
              expect(tagResponse.body).to.be.an('array');
              
              if (tagResponse.body.length > 0) {
                // Verify filtered results contain the tag
                tagResponse.body.forEach(announcement => {
                  expect(announcement.custom_announcement_tags).to.include(testTag);
                });
              }
            });
        }
      });
  });

  it("Test filtering by affinity group parameter with real data", () => {
    // First get all announcements to see what affinity groups exist
    cy.request('/api/2.1/announcements')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        
        // Log available affinity groups for debugging
        const affinityGroups = [...new Set(response.body.map(ann => ann.custom_announcement_ag).filter(ag => ag))];
        cy.log('Available affinity groups:', affinityGroups);
        
        if (affinityGroups.length > 0) {
          // Test filtering by the first available affinity group
          const testAG = affinityGroups[0];
          cy.request(`/api/2.1/announcements?ag=${testAG}`)
            .then((agResponse) => {
              expect(agResponse.status).to.eq(200);
              expect(agResponse.body).to.be.an('array');
              
              if (agResponse.body.length > 0) {
                // Verify filtered results contain the affinity group
                agResponse.body.forEach(announcement => {
                  expect(announcement.custom_announcement_ag).to.include(testAG);
                });
              }
              cy.log(`Affinity group '${testAG}' filter returned ${agResponse.body.length} results`);
            });
        } else {
          cy.log('No affinity groups found in announcements data');
        }
      });
  });

  it("Test date range filtering", () => {
    const startDate = '2024-01-01';
    const endDate = '2025-12-31';
    
    cy.request(`/api/2.1/announcements?start_date=${startDate}&end_date=${endDate}`)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        
        // If results exist, verify dates are within range
        if (response.body.length > 0) {
          response.body.forEach((announcement) => {
            if (announcement.field_published_date) {
              const publishedDate = new Date(announcement.field_published_date);
              const start = new Date(startDate);
              const end = new Date(endDate);
              
              expect(publishedDate).to.be.at.least(start);
              expect(publishedDate).to.be.at.most(end);
            }
          });
        }
      });
  });

  it("Test filtering by affiliation parameter with real data", () => {
    // First get all announcements to see what affiliations exist
    cy.request('/api/2.1/announcements')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        
        // Log available affiliations for debugging
        const affiliations = [...new Set(response.body.map(ann => ann.field_affiliation).filter(aff => aff))];
        cy.log('Available affiliations:', affiliations);
        
        if (affiliations.length > 0) {
          // Test filtering by the first available affiliation
          const testAffiliation = affiliations[0];
          cy.request(`/api/2.1/announcements?affiliation=${testAffiliation}`)
            .then((affResponse) => {
              expect(affResponse.status).to.eq(200);
              expect(affResponse.body).to.be.an('array');
              
              if (affResponse.body.length > 0) {
                // Verify filtered results contain the affiliation
                affResponse.body.forEach(announcement => {
                  expect(announcement.field_affiliation).to.include(testAffiliation);
                });
              }
              cy.log(`Affiliation '${testAffiliation}' filter returned ${affResponse.body.length} results`);
            });
        } else {
          cy.log('No affiliations found in announcements data');
        }
      });
  });

});