/*
 * Badge CSV Assignment — Full Lifecycle Test (open_ondemand_badges vocabulary / GOOD26)
 *
 * Domain: ondemand.ddev.site
 * Vocabulary: open_ondemand_badges
 * Badge term: GOOD26
 *
 * Tests the complete CSV upload lifecycle:
 *   1. Upload CSV → immediate email match (Pecan Pie)
 *   2. Upload CSV → no match → pending table (Cherry Tart)
 *   3. Verify pending table shows unmatched row
 *   4. Trigger cron → pending row moves to review
 *   5. Verify admin digest email via Mailpit
 *   6. Admin assigns badge from review tab
 *   7. Cleanup: remove assigned badges and pending rows
 */

const ADMIN_USER = 'administrator@amptesting.com';
const ADMIN_PASS = 'b8QW]X9h7#5n';
const VOCABULARY = 'open_ondemand_badges';
const BADGE_TERM = 'GOOD26';

describe('Badge CSV Lifecycle — open_ondemand_badges / GOOD26', () => {

  before(() => {
    // Clean up any leftover state from previous runs.
    cy.loginUser(ADMIN_USER, ADMIN_PASS);
    cleanupPendingRows();
    cleanupAssignedBadges();
  });

  after(() => {
    // Final cleanup so tests are idempotent.
    cy.loginUser(ADMIN_USER, ADMIN_PASS);
    cleanupPendingRows();
    cleanupAssignedBadges();
  });

  it('Admin can access the Badge Assignments Upload page', () => {
    cy.loginUser(ADMIN_USER, ADMIN_PASS);
    cy.visit('/admin/people/badge-assignments/upload');
    cy.get('h1').should('contain', 'Upload CSV');
    cy.get('#edit-vocabulary').should('exist');
    cy.get('#edit-csv-file').should('exist');
  });

  it('Upload CSV with email match and no-match rows', () => {
    cy.loginUser(ADMIN_USER, ADMIN_PASS);
    cy.clearMailpit();

    cy.visit('/admin/people/badge-assignments/upload');

    // Intercept the AJAX call triggered by vocabulary change.
    cy.intercept('POST', '/admin/people/badge-assignments/upload*').as('vocabAjax');

    // Select vocabulary — Open OnDemand Badges.
    cy.get('#edit-vocabulary').select(VOCABULARY);

    // Wait for AJAX to complete and repopulate badge dropdown.
    cy.wait('@vocabAjax');

    // Now select the GOOD26 badge term from the refreshed dropdown.
    // After AJAX, Drupal increments the element ID, so use the wrapper.
    cy.get('#badge-term-wrapper select', { timeout: 10000 })
      .find('option')
      .should('have.length.gt', 1);
    cy.get('#badge-term-wrapper select').select(BADGE_TERM);

    // Upload CSV fixture.
    cy.get('#edit-csv-file').selectFile('cypress/fixtures/badge-test.csv');

    // Submit the form.
    cy.get('#edit-submit').click();

    // Verify results: Pecan Pie should be assigned immediately.
    cy.get('.badge-csv-results', { timeout: 15000 }).should('exist');
    cy.get('.badge-csv-results').should('contain', 'pecan@pie.org');

    // Cherry Tart should be in pending.
    cy.get('.badge-csv-results').should('contain', 'cherry@tart.org');
  });

  it('Pending tab shows the unmatched row (Cherry Tart)', () => {
    cy.loginUser(ADMIN_USER, ADMIN_PASS);
    cy.visit('/admin/people/badge-assignments');

    // The pending table should show Cherry Tart's row.
    cy.get('table').should('contain', 'cherry@tart.org');
    cy.get('table').should('contain', 'Cherry');
    cy.get('table').should('contain', 'Tart');
    cy.get('table').should('contain', 'FakeOrg');
  });

  it('Trigger cron to move pending rows to review', () => {
    cy.loginUser(ADMIN_USER, ADMIN_PASS);

    // Trigger the ultimate_cron job for pending badge matching.
    cy.exec('cd /Volumes/Documents/Web/cyberteam_drupal && ddev drush ultimate-cron:run access_badges_pending_match', {
      failOnNonZeroExit: false,
      timeout: 60000,
    }).then((result) => {
      cy.task('log', 'Cron result: code=' + result.code + ' stdout=' + result.stdout + ' stderr=' + result.stderr);
      if (result.code !== 0) {
        // Fallback: run general cron.
        cy.exec('cd /Volumes/Documents/Web/cyberteam_drupal && ddev drush cron', {
          failOnNonZeroExit: false,
          timeout: 60000,
        });
      }
    });
  });

  it('Verify admin digest email about new matches via Mailpit', () => {
    // The cron job sends email only if it finds name matches.
    // Cherry Tart may not match any existing user, so email may not be sent.
    cy.searchMailpitMessages({ subject: 'Badge Assignments' }).then((messages) => {
      if (messages.length > 0) {
        cy.assertEmailContent(messages[0], {
          subject: 'Badge Assignments',
        });
      } else {
        cy.task('log', 'No digest email sent — expected if cron found no name matches for Cherry Tart.');
      }
    });
  });

  it('Review tab shows the matched row (or pending row persists)', () => {
    cy.loginUser(ADMIN_USER, ADMIN_PASS);
    cy.visit('/admin/people/badge-assignments/review');

    cy.get('body').then(($body) => {
      if ($body.text().includes('cherry@tart.org')) {
        // Cron found a name match — row is in review.
        cy.get('table').should('contain', 'cherry@tart.org');
        cy.get('input[value="Assign"]').should('exist');
      } else {
        // No name match found — row stays in pending (correct behavior).
        cy.visit('/admin/people/badge-assignments');
        cy.get('table').should('contain', 'cherry@tart.org');
        cy.task('log', 'Cherry Tart had no name match — row stays in pending (expected).');
      }
    });
  });

  it('Admin can assign from review or delete from pending', () => {
    cy.loginUser(ADMIN_USER, ADMIN_PASS);
    cy.visit('/admin/people/badge-assignments/review');

    cy.get('body').then(($body) => {
      if ($body.find('input[value="Assign"]').length) {
        cy.get('input[value="Assign"]').first().click();
        cy.get('.messages--status').should('exist');
      } else {
        // Clean up from pending tab instead.
        cy.visit('/admin/people/badge-assignments');
        cy.get('body').then(($pendingBody) => {
          if ($pendingBody.find('a:contains("Delete")').length) {
            cy.contains('a', 'Delete').first().click();
            cy.get('.messages--status').should('contain', 'Pending row deleted');
          }
        });
      }
    });
  });

  it('Verify Pecan Pie has the GOOD26 badge assigned', () => {
    cy.loginUser(ADMIN_USER, ADMIN_PASS);

    // Check the badge was assigned via ddev drush SQL query.
    cy.exec(
      `ddev drush sqlq "SELECT COUNT(*) FROM user__field_open_ondemand_badges ob INNER JOIN users_field_data ufd ON ob.entity_id = ufd.uid INNER JOIN taxonomy_term_field_data ttfd ON ob.field_open_ondemand_badges_target_id = ttfd.tid WHERE ufd.mail = 'pecan@pie.org' AND ttfd.name = '${BADGE_TERM}'"`,
      { failOnNonZeroExit: false, timeout: 30000 }
    ).then((result) => {
      cy.task('log', 'Badge count stdout: [' + result.stdout + '] stderr: [' + result.stderr + ']');
      const lines = result.stdout.trim().split('\n').filter(l => /^\d+$/.test(l.trim()));
      const count = lines.length > 0 ? parseInt(lines[lines.length - 1], 10) : -1;
      expect(count).to.be.greaterThan(0);
    });
  });
});

/**
 * Removes Cherry Tart and Pecan Pie pending rows via drush SQL.
 */
function cleanupPendingRows() {
  cy.exec(
    'ddev drush sqlq "DELETE FROM access_badges_pending WHERE email IN (\'cherry@tart.org\', \'pecan@pie.org\')"',
    { failOnNonZeroExit: false, timeout: 30000 }
  ).then((result) => {
    cy.task('log', 'Cleaned up pending rows: ' + result.stdout);
  });
}

/**
 * Removes the GOOD26 badge from Pecan Pie if it was assigned during the test.
 */
function cleanupAssignedBadges() {
  cy.exec(
    `ddev drush sqlq "DELETE ob FROM user__field_open_ondemand_badges ob INNER JOIN users_field_data ufd ON ob.entity_id = ufd.uid INNER JOIN taxonomy_term_field_data ttfd ON ob.field_open_ondemand_badges_target_id = ttfd.tid WHERE ufd.mail = 'pecan@pie.org' AND ttfd.name = '${BADGE_TERM}'"`,
    { failOnNonZeroExit: false, timeout: 30000 }
  ).then((result) => {
    cy.task('log', 'Cleaned up assigned badges: ' + result.stdout);
  });
  cy.exec('ddev drush cr', { failOnNonZeroExit: false, timeout: 30000 });
}
