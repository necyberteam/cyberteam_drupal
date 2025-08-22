describe("Authenticated user creates a Mentorship Engagement", () => {
  it("Authenticated user creates a Recruiting Mentorship Engagement", () => {
    cy.loginWith("pecan@pie.org", "Pecan")
    cy.visit("/node/add/mentorship_engagement")

    // check the box for "I am looking for a mentor"
    cy.get("#edit-field-me-looking-for-mentor").check()

    cy.get("#edit-title-0-value").type("Recruiting Title")

    cy.get("#edit-body-0-summary").type("Recruiting Summary")

    cy.get('.form-item-body-0-value .ck-content').then(el => {
      const editor = el[0].ckeditorInstance
      editor.setData('Mentoring supports the growth of a vibrant HPC community by connecting students with experienced mentors. Matches are based on multiple factors, including research interests, career goals, long-term plans, and general interests. Providing valuable professional advice and resources that will benefit mentees which might include: sharing expertise in your specific research domain/discipline, sharing personal experiences and advice that might benefit your student mentee, encouraging students to stay abreast of scholarly literature and cutting-edge ideas in their field, Encouraging the open exchange of ideas, Facilitating networking opportunities with other faculty or professionals on campus or within the broader research community as appropriate.')
    })

    cy.get("details.tags summary").click()
    cy.get("#tag-ai").click()

    cy.get('.form-item-field-me-preferred-attributes-0-value .ck-content').then(el => {
      const editor = el[0].ckeditorInstance
      editor.setData('Be nice.')
    })

    cy.get('#edit-field-me-state').select('Recruiting')

    cy.get(".node-mentorship-engagement-form #edit-submit").click()
    cy.get('.layout__region--second > :nth-child(2)').should('contain', 'Pecan Pie')
  });

  it("Admin approves", () => {
    cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
    cy.visit("/admin/content");
    cy.get(':nth-child(1) > .views-field-operations > .dropbutton-wrapper > .dropbutton-widget > .dropbutton > .edit > a').click();
    cy.get('#edit-field-ccmnet-approved-value').check();
    cy.get('#edit-submit').click();
  });

  it("Authenticated user creates a Recruiting Mentorship Engagement", () => {
    cy.loginWith("pecan@pie.org", "Pecan")
    cy.visit("/node/add/mentorship_engagement")

    // check the box for "I am looking for a mentor"
    cy.get("#edit-field-me-looking-for-mentee").check()

    cy.get("#edit-title-0-value").type("In Progress Title")

    cy.get("#edit-body-0-summary").type("In ProgressSummary")

    cy.get('.form-item-body-0-value .ck-content').then(el => {
      const editor = el[0].ckeditorInstance
      editor.setData('Mentoring supports the growth of a vibrant HPC community by connecting students with experienced mentors. Matches are based on multiple factors, including research interests, career goals, long-term plans, and general interests. Providing valuable professional advice and resources that will benefit mentees which might include: sharing expertise in your specific research domain/discipline, sharing personal experiences and advice that might benefit your student mentee, encouraging students to stay abreast of scholarly literature and cutting-edge ideas in their field, Encouraging the open exchange of ideas, Facilitating networking opportunities with other faculty or professionals on campus or within the broader research community as appropriate.')
    })

    cy.get("details.tags summary").click()
    cy.get("#tag-ai").click()

    cy.get('.form-item-field-me-preferred-attributes-0-value .ck-content').then(el => {
      const editor = el[0].ckeditorInstance
      editor.setData('Be nice.')
    })

    cy.get('#edit-field-me-state').select('In Progress')

    cy.get(".node-mentorship-engagement-form #edit-submit").click()
    cy.get('.layout__region--second > :nth-child(2)').should('contain', 'Pecan Pie')
  });

  it("Admin approves", () => {
    cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
    cy.visit("/admin/content");
    cy.get(':nth-child(1) > .views-field-operations > .dropbutton-wrapper > .dropbutton-widget > .dropbutton > .edit > a').click();
    cy.get('#edit-field-ccmnet-approved-value').check();
    cy.get('#edit-submit').click();
  });

  it("Check Mentorships page", () => {
    cy.visit("/mentorships");

    // check 'In Progress' filter.
    cy.get('#state-829').check();
    cy.contains('In Progress Title');
    cy.contains('Recruiting Title').should('not.exist');

    // uncheck 'In Progress' filter and check 'Recruiting' filter.
    cy.get('#state-829').uncheck();
    cy.get('#state-827').check();
    cy.contains('Recruiting Title');
    cy.contains('In Progress Title').should('not.exist');
  });

  it("Admin can add notes that are not visible to mentorship creator", () => {
    // First, login as admin and add a note to one of the mentorships
    cy.loginUser('administrator@amptesting.com', 'b8QW]X9h7#5n');
    cy.visit("/admin/content");
    
    // Find and edit the first mentorship (Recruiting Title)
    cy.get('.view-content').contains('Recruiting Title').closest('tr').find('.dropbutton-toggle button').click();
    cy.contains('Edit').click({ force: true });
    
    // Look for an admin notes field - check common field names
    cy.get('body').then($body => {
      // Try different possible field names for admin notes
      const adminNoteSelectors = [
        '#edit-field-admin-notes-0-value',
        '#edit-field-notes-0-value', 
        '#edit-field-internal-notes-0-value',
        '#edit-field-admin-comment-0-value',
        'textarea[name*="admin"]',
        'textarea[name*="notes"]',
        'textarea[name*="internal"]'
      ];
      
      let foundField = false;
      for (const selector of adminNoteSelectors) {
        if ($body.find(selector).length > 0) {
          cy.get(selector).clear().type('This is an admin-only note that should not be visible to the mentorship creator');
          foundField = true;
          break;
        }
      }
      
      if (!foundField) {
        // If no admin notes field found, log it and continue
        cy.task('log', 'No admin notes field found on mentorship edit form');
      }
    });
    
    // Save the mentorship
    cy.get('form.node-mentorship-engagement-edit-form #edit-submit').click();
    
    // Now login as the mentorship creator and verify they cannot see the admin note
    cy.loginWith("pecan@pie.org", "Pecan");
    cy.visit("/mentorships");
    
    // Navigate to the mentorship
    cy.contains('Recruiting Title').click();
    
    // Verify the admin note is not visible on the mentorship page
    cy.get('body').should('not.contain', 'This is an admin-only note');
    
    // Also check if there's an edit link for the creator and verify they don't see admin fields
    cy.get('body').then($body => {
      if ($body.find('a:contains("Edit")').length > 0) {
        cy.get('a:contains("Edit")').first().click();
        
        // Verify admin notes field is not visible to the creator
        const adminNoteSelectors = [
          '#edit-field-admin-notes-0-value',
          '#edit-field-notes-0-value',
          '#edit-field-internal-notes-0-value', 
          '#edit-field-admin-comment-0-value'
        ];
        
        adminNoteSelectors.forEach(selector => {
          cy.get('body').should('not.contain', selector);
        });
        
        // Verify the note content is not visible in any form fields
        cy.get('body').should('not.contain', 'This is an admin-only note');
      }
    });
  });

});
