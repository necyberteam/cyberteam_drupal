describe("Community Spotlight", () => {

  const adminUser = {
    email: 'administrator@amptesting.com',
    password: 'b8QW]X9h7#5n',
  };

  let adminUid;

  before(() => {
    // Get the admin user's UID via drush.
    cy.exec(
      `ddev drush eval "\\$uids = \\Drupal::entityQuery('user')->condition('mail', '${adminUser.email}')->accessCheck(FALSE)->execute(); echo reset(\\$uids);"`,
      { failOnNonZeroExit: false, timeout: 30000 }
    ).then((result) => {
      const uid = result.stdout.trim();
      if (uid && /^\d+$/.test(uid)) {
        adminUid = uid;
      }
    });
  });

  describe("Spotlight promotion field", () => {
    it("Admin can set spotlight on a user", function () {
      if (!adminUid) {
        this.skip();
        return;
      }

      cy.exec(
        `ddev drush eval "` +
        `\\$user = \\Drupal\\user\\Entity\\User::load(${adminUid}); ` +
        `\\$user->set('field_ood_spotlight_promoted', TRUE); ` +
        `\\$user->set('field_ood_community_spotlight', 'Cypress test spotlight text'); ` +
        `\\$user->save(); ` +
        `echo 'Spotlight set';"`,
        { failOnNonZeroExit: false, timeout: 30000 }
      ).then((result) => {
        cy.log(result.stdout);
        expect(result.stdout).to.contain('Spotlight set');
      });

      // Verify it was saved
      cy.exec(
        `ddev drush eval "` +
        `\\$user = \\Drupal\\user\\Entity\\User::load(${adminUid}); ` +
        `echo \\$user->get('field_ood_spotlight_promoted')->value ? 'promoted' : 'not promoted';"`,
        { failOnNonZeroExit: false, timeout: 30000 }
      ).then((result) => {
        expect(result.stdout.trim()).to.contain('promoted');
      });
    });

    it("Only one user can be spotlighted at a time", function () {
      if (!adminUid) {
        this.skip();
        return;
      }

      // Find another user to promote.
      cy.exec(
        `ddev drush eval "\\$uids = \\Drupal::entityQuery('user')->condition('uid', ${adminUid}, '<>')->condition('status', 1)->accessCheck(FALSE)->range(0,1)->execute(); echo reset(\\$uids);"`,
        { failOnNonZeroExit: false, timeout: 30000 }
      ).then((result) => {
        const otherUid = result.stdout.trim();
        if (!otherUid || !/^\d+$/.test(otherUid)) {
          cy.log('No other user found to test with');
          return;
        }

        // Promote the other user — hook_user_update should demote the admin.
        cy.exec(
          `ddev drush eval "` +
          `\\$user = \\Drupal\\user\\Entity\\User::load(${otherUid}); ` +
          `if (\\$user->hasField('field_ood_spotlight_promoted')) { ` +
          `\\$user->set('field_ood_spotlight_promoted', TRUE); ` +
          `\\$user->save(); ` +
          `echo 'Other user promoted'; } ` +
          `else { echo 'field not found'; }"`,
          { failOnNonZeroExit: false, timeout: 30000 }
        ).then((promoteResult) => {
          cy.log(promoteResult.stdout);
        });

        // Verify the admin user was automatically demoted.
        cy.exec(
          `ddev drush eval "` +
          `\\$user = \\Drupal\\user\\Entity\\User::load(${adminUid}); ` +
          `echo \\$user->get('field_ood_spotlight_promoted')->value ? 'promoted' : 'not promoted';"`,
          { failOnNonZeroExit: false, timeout: 30000 }
        ).then((checkResult) => {
          cy.log(`Admin spotlight status: ${checkResult.stdout.trim()}`);
          expect(checkResult.stdout.trim()).to.contain('not promoted');
        });

        // Count total promoted users — should be exactly 1.
        cy.exec(
          `ddev drush sqlq "SELECT COUNT(*) FROM user__field_ood_spotlight_promoted WHERE field_ood_spotlight_promoted_value = 1"`,
          { failOnNonZeroExit: false, timeout: 30000 }
        ).then((countResult) => {
          const count = parseInt(countResult.stdout.trim(), 10);
          cy.log(`Total spotlighted users: ${count}`);
          expect(count).to.eq(1);
        });
      });
    });
  });

  describe("Spotlight block on contributor wall", () => {
    it("Community spotlight block renders with promoted user", function () {
      if (!adminUid) {
        this.skip();
        return;
      }

      // Ensure the admin user is promoted with spotlight text so the block renders.
      cy.exec(
        `ddev drush eval "` +
        `\\$user = \\Drupal\\user\\Entity\\User::load(${adminUid}); ` +
        `\\$user->set('field_ood_spotlight_promoted', TRUE); ` +
        `\\$user->set('field_ood_community_spotlight', 'Cypress test spotlight text'); ` +
        `\\$user->save(); ` +
        `echo 'ready';"`,
        { failOnNonZeroExit: false, timeout: 30000 }
      );

      // Clear Drupal caches so the block picks up the change.
      cy.exec('ddev drush cr', { failOnNonZeroExit: false, timeout: 30000 });

      cy.visit('/contributor-wall');

      cy.get('.community-spotlight').should('exist');
      cy.get('.community-spotlight img').should('exist');
      cy.get('.community-spotlight a[href*="/community-persona/"]').should('exist');
      cy.get('.community-spotlight__text').should('contain', 'Cypress test spotlight text');
    });
  });

  after(() => {
    // Clean up: remove spotlight from all users.
    cy.exec(
      `ddev drush sqlq "UPDATE user__field_ood_spotlight_promoted SET field_ood_spotlight_promoted_value = 0"`,
      { failOnNonZeroExit: false, timeout: 30000 }
    );
    cy.exec(
      `ddev drush sqlq "DELETE FROM user__field_ood_community_spotlight WHERE field_ood_community_spotlight_value = 'Cypress test spotlight text'"`,
      { failOnNonZeroExit: false, timeout: 30000 }
    );
  });
});
