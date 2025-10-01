describe("Test Announcements API", () => {

  it("Basic announcements API v2.2 endpoint returns correct structure", () => {
    cy.request('/api/2.2/announcements').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers).to.have.property('content-type').that.includes('application/json');
      
      // Check that response is an array
      expect(response.body).to.be.an('array');
      
      // Should have at least some announcements
      expect(response.body.length).to.be.greaterThan(0);
      
      const announcement = response.body[0];
      
      // Test that all expected fields are present
      const expectedFields = [
        'title', 'body', 'summary', 'published_date', 'affinity_group',
        'tags', 'affiliation'
      ];
      
      expectedFields.forEach(field => {
        expect(announcement, `Missing field: ${field}`).to.have.property(field);
      });
      
      // Test field types and that they contain actual data
      expect(announcement.title).to.be.a('string').and.not.be.empty;
      expect(announcement.body).to.be.a('string');
      expect(announcement.summary).to.be.a('string');
      expect(announcement.published_date).to.be.a('string').and.not.be.empty;
      
      // Log announcement details for debugging
      cy.log('Found announcement:', announcement.title);
      cy.log('Published date:', announcement.published_date);
      cy.log('Body length:', announcement.body ? announcement.body.length : 'null');
      cy.log('Summary length:', announcement.summary ? announcement.summary.length : 'null');
      cy.log('Tags:', announcement.tags);
      cy.log('Affinity Group:', announcement.affinity_group);
    });
  });

  it("Test v2.2 API pagination with page and items_per_page parameters", () => {
    // Test first page with limit of 5
    cy.request('/api/2.2/announcements?page=0&items_per_page=5').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.at.most(5);
      
      const page1Count = response.body.length;
      cy.log(`Page 1 returned ${page1Count} items`);
      
      if (page1Count > 0) {
        const firstPageFirstItem = response.body[0];
        
        // Test second page
        cy.request('/api/2.2/announcements?page=1&items_per_page=5').then((page2Response) => {
          expect(page2Response.status).to.eq(200);
          expect(page2Response.body).to.be.an('array');
          
          const page2Count = page2Response.body.length;
          cy.log(`Page 2 returned ${page2Count} items`);
          
          if (page2Count > 0) {
            const secondPageFirstItem = page2Response.body[0];
            // Verify different items on different pages (by title)
            expect(firstPageFirstItem.title).to.not.equal(secondPageFirstItem.title);
            cy.log('Pagination working: different items on different pages');
          }
        });
      }
    });
  });

  it("Test v2.2 API pagination with different page sizes", () => {
    // Test with items_per_page=10
    cy.request('/api/2.2/announcements?page=0&items_per_page=10').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.at.most(10);
      cy.log(`Requested 10 items, got ${response.body.length}`);
    });
    
    // Test with items_per_page=25 (default)
    cy.request('/api/2.2/announcements?page=0&items_per_page=25').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.at.most(25);
      cy.log(`Requested 25 items, got ${response.body.length}`);
    });
    
    // Test with items_per_page=50
    cy.request('/api/2.2/announcements?page=0&items_per_page=50').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.at.most(50);
      cy.log(`Requested 50 items, got ${response.body.length}`);
    });
  });

  it("Test v2.2 API pagination combined with filtering", () => {
    // First get available tags
    cy.request('/api/2.2/announcements').then((allResponse) => {
      const tags = [...new Set(allResponse.body.map(ann => ann.custom_announcement_tags).filter(tag => tag))];
      
      if (tags.length > 0) {
        const testTag = tags[0];
        
        // Test pagination with tag filtering
        cy.request(`/api/2.2/announcements?tags=${testTag}&page=0&items_per_page=3`).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.be.an('array');
          expect(response.body.length).to.be.at.most(3);
          
          // Verify all results contain the tag
          if (response.body.length > 0) {
            response.body.forEach(announcement => {
              expect(announcement.custom_announcement_tags).to.include(testTag);
            });
            cy.log(`Pagination + filtering: ${response.body.length} items with tag '${testTag}'`);
          }
        });
      }
    });
  });

  it("Test v2.2 filtering by tags parameter with real data", () => {
    // First get all announcements to see what tags exist
    cy.request('/api/2.2/announcements')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        
        // Log available tags for debugging
        const tags = [...new Set(response.body.map(ann => ann.custom_announcement_tags).filter(tag => tag))];
        cy.log('Available tags:', tags);
        
        if (tags.length > 0) {
          // Test filtering by the first available tag
          const testTag = tags[0];
          cy.request(`/api/2.2/announcements?tags=${testTag}`)
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

  it("Test v2.2 filtering by affinity group parameter with real data", () => {
    // First get all announcements to see what affinity groups exist
    cy.request('/api/2.2/announcements')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        
        // Log available affinity groups for debugging
        const affinityGroups = [...new Set(response.body.map(ann => ann.custom_announcement_ag).filter(ag => ag))];
        cy.log('Available affinity groups:', affinityGroups);
        
        if (affinityGroups.length > 0) {
          // Test filtering by the first available affinity group
          const testAG = affinityGroups[0];
          cy.request(`/api/2.2/announcements?ag=${testAG}`)
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

  it("Test v2.2 date range filtering", () => {
    const startDate = '2024-01-01';
    const endDate = '2025-12-31';
    
    cy.request(`/api/2.2/announcements?start_date=${startDate}&end_date=${endDate}`)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        
        // If results exist, verify dates are within range
        if (response.body.length > 0) {
          response.body.forEach((announcement) => {
            if (announcement.published_date) {
              const publishedDate = new Date(announcement.published_date);
              const start = new Date(startDate);
              const end = new Date(endDate);
              
              expect(publishedDate).to.be.at.least(start);
              expect(publishedDate).to.be.at.most(end);
            }
          });
        }
      });
  });

  it("Test v2.2 filtering by affiliation parameter with real data", () => {
    // First get all announcements to see what affiliations exist
    cy.request('/api/2.2/announcements')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        
        // Log available affiliations for debugging
        const affiliations = [...new Set(response.body.map(ann => ann.field_affiliation).filter(aff => aff))];
        cy.log('Available affiliations:', affiliations);
        
        if (affiliations.length > 0) {
          // Test filtering by the first available affiliation
          const testAffiliation = affiliations[0];
          cy.request(`/api/2.2/announcements?affiliation=${testAffiliation}`)
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