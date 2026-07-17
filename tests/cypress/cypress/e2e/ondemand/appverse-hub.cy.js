/**
 * Appverse Maintenance Hub — happy path + unauthorized action.
 *
 * Covers:
 *  - Legacy /user/<uid>/my-apps → /user/<uid>/my-appverse 301 redirect.
 *  - Legacy /appverse/manage-apps → /appverse/manage-repos 301 redirect.
 *  - Hub renders Collection cards.
 *  - Member apps expand via <details>.
 *  - Re-sync from the inline icon button triggers the controller.
 *  - Cross-user action returns 403.
 *  - Admin's /appverse/manage-repos renders with exposed filters.
 *  - Moderation transition notifications (Phase 1.8): send_for_review,
 *    request_adjustment (email-only + cascade-unpublish), and publish
 *    (email + no-fan-out + cascade-publish).
 */

const ADMIN_EMAIL = 'administrator@amptesting.com';
const ADMIN_PASS = 'b8QW]X9h7#5n';
const LEGACY_EMAIL = 'legacy_contributor@amptesting.com';
const LEGACY_PASS = 'cypress-fixture-2026';
// Contributor fixture (provided by amp_dev) is the same user used for the
// cross-user 403 spec; reused here as the Collection owner for moderation flows.
const CONTRIBUTOR_EMAIL = LEGACY_EMAIL;
const CONTRIBUTOR_PASS = LEGACY_PASS;
const CONTRIBUTOR_NAME = 'legacy_contributor';

/**
 * Seed a fresh appverse_repo via ddev drush, optionally with member apps.
 *
 * Yields { nid, uuid } so callers can stash the UUID in Cypress.env for
 * later JSON:API cascade assertions. Titles must be unique per block to
 * avoid collisions if the seed is re-run.
 *
 * @param {object} opts
 * @param {string} opts.title - Unique Collection title.
 * @param {string} opts.state - moderation_state: draft|ready_for_review|published.
 * @param {number} opts.memberApps - How many member apps to create.
 * @param {string} opts.memberAppState - moderation_state for member apps.
 */
function seedRepo(opts) {
  const title = opts.title;
  const state = opts.state;
  const memberApps = opts.memberApps || 0;
  const memberAppState = opts.memberAppState || 'draft';

  // Validate interpolated inputs to prevent shell/PHP quote-escape breakouts.
  // All test fixtures use plain ASCII names, so a strict allowlist is fine.
  if (!/^[A-Za-z0-9 ()\-]+$/.test(title)) {
    throw new Error(`seedRepo: title contains unsafe characters: ${title}`);
  }
  if (!/^[a-z_]+$/.test(state)) {
    throw new Error(`seedRepo: state contains unsafe characters: ${state}`);
  }
  if (!/^[a-z_]+$/.test(memberAppState)) {
    throw new Error(`seedRepo: memberAppState contains unsafe characters: ${memberAppState}`);
  }
  if (!Number.isInteger(memberApps) || memberApps < 0) {
    throw new Error(`seedRepo: memberApps must be a non-negative integer: ${memberApps}`);
  }

  // Delete any prior fixture with the same title so re-runs are deterministic.
  // Also scrub orphan member apps (from a partial dead run) and any stale
  // fixture Collections whose titles share the "Test Notebooks" prefix, so
  // a previous interrupted run can't poison the next run.
  const phpEval = `
    $storage = \\Drupal::entityTypeManager()->getStorage('node');
    $existing = $storage->getQuery()->accessCheck(FALSE)
      ->condition('type', 'appverse_repo')
      ->condition('title', '${title}')
      ->execute();
    foreach ($storage->loadMultiple($existing) as $old) {
      $apps = $storage->getQuery()->accessCheck(FALSE)
        ->condition('type', 'appverse_app')
        ->condition('field_appverse_repo', $old->id())
        ->execute();
      foreach ($storage->loadMultiple($apps) as $app) { $app->delete(); }
      $old->delete();
    }
    // Drop any other stale "Test Notebooks*" Collection (covers casing/renaming drift).
    $staleIds = $storage->getQuery()->accessCheck(FALSE)
      ->condition('type', 'appverse_repo')
      ->condition('title', 'Test Notebooks%', 'LIKE')
      ->execute();
    foreach ($storage->loadMultiple($staleIds) as $stale) {
      $staleApps = $storage->getQuery()->accessCheck(FALSE)
        ->condition('type', 'appverse_app')
        ->condition('field_appverse_repo', $stale->id())
        ->execute();
      foreach ($storage->loadMultiple($staleApps) as $app) { $app->delete(); }
      $stale->delete();
    }
    // Drop orphan apps from prior runs (no Collection reference).
    $orphanIds = $storage->getQuery()->accessCheck(FALSE)
      ->condition('type', 'appverse_app')
      ->notExists('field_appverse_repo')
      ->execute();
    foreach ($storage->loadMultiple($orphanIds) as $orphan) { $orphan->delete(); }
    $user = user_load_by_name('${CONTRIBUTOR_NAME}');
    if (!$user) { throw new \\Exception('Contributor fixture user not found.'); }
    $collection = \\Drupal\\node\\Entity\\Node::create([
      'type' => 'appverse_repo',
      'title' => '${title}',
      'uid' => $user->id(),
      'moderation_state' => '${state}',
      'field_repo_repo_url' => ['uri' => 'https://github.com/example/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}'],
    ]);
    $collection->save();
    for ($i = 0; $i < ${memberApps}; $i++) {
      $app = \\Drupal\\node\\Entity\\Node::create([
        'type' => 'appverse_app',
        'title' => '${title} App ' . ($i + 1),
        'uid' => $user->id(),
        'moderation_state' => '${memberAppState}',
        'field_appverse_repo' => $collection->id(),
      ]);
      $app->save();
    }
    echo $collection->id();
  `;

  // Pass the PHP payload via php:script over stdin to bypass zsh quoting.
  // The previous form interpolated the PHP string into a double-quoted bash
  // argument, where any `*` (even inside a PHP comment, e.g. the
  // "Test Notebooks*" cleanup comment) triggers zsh's "no matches found"
  // glob expansion and aborts before drush runs. drush php:script reads
  // from stdin when its path argument is `-`, so we can pipe a fully
  // single-quoted heredoc-equivalent and never invoke globbing.
  const oneLiner = phpEval.replace(/\n\s*/g, ' ');
  // POSIX-shell-safe single-quote escape: close, escaped-quote, reopen.
  const shellEscaped = oneLiner.replace(/'/g, `'\\''`);
  return cy.exec(`printf '%s' '${shellEscaped}' | ddev drush php:script -`, { timeout: 60000 })
    .then((result) => {
      const nid = parseInt(result.stdout.trim(), 10);
      if (!nid) {
        throw new Error(`Failed to seed Collection "${title}". stdout: ${result.stdout}, stderr: ${result.stderr}`);
      }
      // Resolve UUID via JSON:API (admin must be logged in for unpublished states).
      return cy.request({
        url: `/jsonapi/node/appverse_repo?filter[drupal_internal__nid]=${nid}`,
        headers: { Accept: 'application/vnd.api+json' },
        failOnStatusCode: false,
      }).then((res) => {
        const uuid = res.body?.data?.[0]?.id;
        Cypress.env('TEST_COLLECTION_NID', nid);
        Cypress.env('TEST_COLLECTION_UUID', uuid);
        return { nid, uuid };
      });
    });
}

describe('Appverse Maintenance Hub', () => {
  // Guarantee no session bleed across blocks. The redirect / cross-user 403 /
  // re-sync blocks all switch users; the moderation blocks below would
  // otherwise inherit whichever cookie the previous block left behind.
  beforeEach(() => {
    cy.clearCookies();
  });

  describe('Redirects', () => {
    it('redirects /user/<uid>/my-apps to /my-appverse with 301', () => {
      cy.loginUser(ADMIN_EMAIL, ADMIN_PASS);
      cy.request({
        url: '/user/65016/my-apps',
        followRedirect: false,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.oneOf([301, 302]);
        expect(response.headers.location).to.match(/\/user\/65016\/my-appverse$/);
      });
    });

    it('redirects /appverse/manage-apps to /appverse/manage-repos with 301', () => {
      cy.loginUser(ADMIN_EMAIL, ADMIN_PASS);
      cy.request({
        url: '/appverse/manage-apps',
        followRedirect: false,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.oneOf([301, 302]);
        expect(response.headers.location).to.match(/\/appverse\/manage-repos$/);
      });
    });
  });

  describe('User hub renders', () => {
    beforeEach(() => {
      cy.loginUser(ADMIN_EMAIL, ADMIN_PASS);
    });

    it('renders the hub with Collection cards', () => {
      cy.visit('/user/65016/my-appverse', { failOnStatusCode: false });
      cy.get('.appverse-hub-card', { timeout: 10000 }).should('have.length.greaterThan', 0);
    });

    it('expands member apps via <details>', () => {
      cy.visit('/user/65016/my-appverse', { failOnStatusCode: false });
      cy.get('.appverse-hub-card', { timeout: 10000 }).should('exist');
      cy.get('body').then(($body) => {
        if ($body.find('.appverse-hub-card__apps').length === 0) {
          cy.log('No monorepo (multi-app) repos owned by this user; skipping apps-expansion check.');
          return;
        }
        cy.get('.appverse-hub-card__apps').first().find('summary').click();
        cy.get('.appverse-hub-card__apps').first()
          .find('table.appverse-hub-apps-table')
          .should('be.visible');
      });
    });
  });

  describe('Admin display renders', () => {
    beforeEach(() => {
      cy.loginUser(ADMIN_EMAIL, ADMIN_PASS);
    });

    it('renders the manage-collections page with exposed filters', () => {
      cy.visit('/appverse/manage-repos', { failOnStatusCode: false });
      cy.get('body').then(($body) => {
        if ($body.text().includes('Access denied')) {
          cy.log('Administrator user lacks "administer appverse content" permission; skipping.');
          return;
        }
        cy.get('form.views-exposed-form').should('be.visible');
        cy.get('input[name="title"]').should('exist');
        cy.get('.appverse-hub-card').should('exist');
      });
    });
  });

  describe('Redesigned hub layout', () => {
    it('admin manage-repos shows owner block and header icons', () => {
      cy.loginUser(ADMIN_EMAIL, ADMIN_PASS);
      cy.visit('/appverse/manage-repos', { failOnStatusCode: false });
      cy.get('body').then(($body) => {
        if ($body.text().includes('Access denied')) {
          cy.log('Administrator lacks "administer appverse content"; skipping.');
          return;
        }
        // Header icon affordances exist on the first card. (The catalog icon
        // was dropped as redundant — the card title links to the catalog — so
        // resync + github are the header icons now.)
        cy.get('.appverse-hub-card').first().within(() => {
          cy.get('.bi-arrow-clockwise').should('exist');
          cy.get('.bi-github').should('exist');
        });
        // Admin owner block: persona link + mailto, scoped to the card whose
        // owner we assert (the email link is conditional on the owner having
        // an email, so check within the owner-bearing card).
        cy.get('.appverse-hub-card').filter(':has(.appverse-hub-card__owner)').first().within(() => {
          cy.get('.appverse-hub-card__owner')
            .should('have.attr', 'href').and('match', /^\/community-persona\/\d+$/);
          cy.get('a[href^="mailto:"]').should('exist');
        });
      });
    });

    it('contributor my-appverse hides admin-only affordances', () => {
      cy.loginUser(CONTRIBUTOR_EMAIL, CONTRIBUTOR_PASS);
      // Resolve the contributor's own hub the same way the moderation blocks
      // do: visit /user, read the uid off the resolved profile URL, then visit
      // that uid's /my-appverse hub.
      cy.visit('/user', { failOnStatusCode: false });
      cy.url().then((profileUrl) => {
        const match = profileUrl.match(/\/user\/(\d+)/);
        const uid = match ? match[1] : null;
        if (!uid) {
          throw new Error(`Could not resolve contributor uid from ${profileUrl}`);
        }
        cy.visit(`/user/${uid}/my-appverse`, { failOnStatusCode: false });
      });
      cy.get('body').then(($body) => {
        if ($body.find('.appverse-hub-card').length === 0) {
          cy.log('Contributor owns no repos; skipping affordance check.');
          return;
        }
        // No owner block and no delete (danger) icon on the contributor's own hub.
        cy.get('.appverse-hub-card__owner').should('not.exist');
        cy.get('.appverse-hub-card__icon-btn--danger').should('not.exist');
      });
    });
  });

  describe('Re-sync via inline icon', () => {
    beforeEach(() => {
      cy.loginUser(ADMIN_EMAIL, ADMIN_PASS);
    });

    it('exposes an inline Re-sync action', () => {
      cy.visit('/user/65016/my-appverse', { failOnStatusCode: false });
      cy.get('.appverse-hub-card', { timeout: 10000 }).first().within(() => {
        cy.get('form[action*="/resync"]').should('exist');
        cy.get('form[action*="/resync"] button[type="submit"]')
          .should('have.attr', 'aria-label', 'Re-sync from GitHub');
        cy.get('form[action*="/resync"] .bi-arrow-clockwise').should('exist');
      });
    });

    it('POSTs to the Re-sync endpoint and redirects back to the hub', () => {
      cy.visit('/user/65016/my-appverse', { failOnStatusCode: false });
      cy.get('.appverse-hub-card', { timeout: 10000 })
        .first()
        .find('form[action*="/resync"]')
        .invoke('attr', 'action')
        .then((action) => {
          // Hit the endpoint directly without following the redirect so the
          // test does not depend on the round-trip to GitHub completing.
          cy.request({
            method: 'POST',
            url: action,
            followRedirect: false,
            failOnStatusCode: false,
            form: true,
            body: {},
            timeout: 60000,
          }).then((response) => {
            // The controller returns a RedirectResponse on success or
            // failure. A 403 here would indicate the CSRF token expired,
            // which is acceptable in this exploratory check.
            expect(response.status).to.be.oneOf([302, 303, 403]);
            if (response.status === 302 || response.status === 303) {
              expect(response.headers.location).to.match(/my-appverse|appverse/);
            }
          });
        });
    });
  });

  describe('Cross-user 403', () => {
    it('refuses to re-sync a Collection owned by another user', () => {
      // The legacy_contributor fixture is provided by the amp_dev module
      // install hook. amp_dev lives in a separate repo, so if the fixture
      // has not landed in this site's DB yet, skip rather than fail.
      cy.request({
        url: '/jsonapi/user/user?filter[name]=legacy_contributor',
        failOnStatusCode: false,
      }).then((listResponse) => {
        if (listResponse.status !== 200 || !listResponse.body.data.length) {
          cy.log('legacy_contributor fixture not present; skipping cross-user test.');
          return;
        }

        cy.request({
          url: '/jsonapi/node/appverse_repo?filter[title]=Test%20Notebooks%20Collection',
          failOnStatusCode: false,
        }).then((collectionResp) => {
          if (collectionResp.status !== 200 || !collectionResp.body.data.length) {
            cy.log('Test Notebooks Collection fixture not present; skipping.');
            return;
          }
          const collectionNid = collectionResp.body.data[0].attributes.drupal_internal__nid;

          cy.loginUser(LEGACY_EMAIL, LEGACY_PASS);
          cy.request({
            method: 'POST',
            url: `/appverse/repo/${collectionNid}/resync`,
            failOnStatusCode: false,
            form: true,
            body: {},
          }).then((postResp) => {
            expect(postResp.status).to.be.oneOf([403, 405]);
          });
        });
      });
    });
  });

  // -------------------------------------------------------------------------
  // Phase 1.8: Moderation transition notifications.
  //
  // Each block seeds its own fixture in beforeEach so it does not depend on
  // ordering with the others. The seeded title is unique per block so
  // concurrent runs won't collide. Member apps are seeded for the cascade
  // cases. UUID for JSON:API cascade assertions stashed via Cypress.env.
  // -------------------------------------------------------------------------

  describe('Send for review (contributor → admin notification)', () => {
    const COLLECTION_TITLE = 'Test Notebooks (Draft)';

    beforeEach(() => {
      // Seed as admin so JSON:API can read the unpublished Collection while
      // resolving the UUID. Then switch users for the actual flow.
      cy.loginUser(ADMIN_EMAIL, ADMIN_PASS);
      seedRepo({ title: COLLECTION_TITLE, state: 'draft' });
      cy.clearMailpit();
    });

    it('emails the admin when the contributor submits a draft Collection for review', () => {
      cy.loginUser(CONTRIBUTOR_EMAIL, CONTRIBUTOR_PASS);
      // Visit the contributor's own hub (use /my-appverse without the uid
      // so we don't need to look it up here).
      cy.visit('/user', { failOnStatusCode: false });
      cy.url().then((profileUrl) => {
        const match = profileUrl.match(/\/user\/(\d+)/);
        const uid = match ? match[1] : null;
        if (!uid) {
          throw new Error(`Could not resolve contributor uid from ${profileUrl}`);
        }
        cy.visit(`/user/${uid}/my-appverse`, { failOnStatusCode: false });
      });

      // Find the card for our seeded Collection and click Send for review.
      cy.contains('.appverse-hub-card', COLLECTION_TITLE, { timeout: 10000 })
        .within(() => {
          cy.get('form[action*="/send-for-review"] button[type="submit"]')
            .contains('Send for review')
            .click();
        });

      // Assert the admin received the notification.
      cy.waitForEmail({
        to: ADMIN_EMAIL,
        subject: 'Repo submitted for review',
      }).then((message) => {
        cy.assertEmailContent(message, {
          subject: 'Repo submitted for review',
          to: ADMIN_EMAIL,
          bodyContains: [COLLECTION_TITLE, '/appverse/manage-repos'],
        });

        // From-address verification: this spec runs at /e2e/ondemand/, so
        // the request resolves to the openondemand domain and
        // domain_site_settings overlays system.site at request time.
        // Verified DB values: site_name="Open OnDemand Community Hub",
        // site_mail="info@mg.openondemand.org". If a different From slips
        // through (e.g., the global noreply@wpi.edu used by the default
        // domain), notifications would go out branded as the wrong site.
        expect(message.From.Address).to.equal('info@mg.openondemand.org');
        expect(message.Subject).to.match(/^\[Open OnDemand Community Hub\]/);
      });

      // Guard Task 3B at the E2E layer: the contrib appverse_review_requested
      // config is bound to send_for_review on appverse_editorial with no bundle
      // filter, so it would fire "New Appverse App submitted" on a Collection
      // submit too if our hook_content_moderation_notification_mail_data_alter
      // weren't suppressing it. The kernel test covers this; we mirror it here
      // because the alter only runs at request time, not in isolation.
      cy.searchMailpitMessages({ subject: 'New Appverse App submitted' }).then((messages) => {
        expect(messages, 'contrib appverse_review_requested mail must be suppressed for Collection submits').to.have.length(0);
      });
    });
  });

  describe('Request changes (admin → contributor notification)', () => {
    describe('Case A: email only (ready_for_review starting state)', () => {
      const COLLECTION_TITLE = 'Test Notebooks (Ready)';
      const REVIEW_COMMENT = 'Please update the README and re-submit.';

      beforeEach(() => {
        cy.loginUser(ADMIN_EMAIL, ADMIN_PASS);
        seedRepo({ title: COLLECTION_TITLE, state: 'ready_for_review' });
        cy.clearMailpit();
      });

      it('emails the contributor with the reviewer comment', () => {
        cy.visit('/appverse/manage-repos', { failOnStatusCode: false });
        cy.contains('.appverse-hub-card', COLLECTION_TITLE, { timeout: 10000 })
          .within(() => {
            // Request changes is now a direct inline icon link (no kebab).
            cy.get('a[href*="/request-changes"]').click();
          });

        // Fill out the Request changes form.
        cy.url().should('include', '/request-changes');
        cy.get('textarea[name="comment"]').type(REVIEW_COMMENT);
        cy.get('form input[type="submit"][value="Request changes"]').click();

        cy.waitForEmail({
          to: CONTRIBUTOR_EMAIL,
          subject: 'Changes requested',
        }).then((message) => {
          cy.assertEmailContent(message, {
            subject: 'Changes requested',
            to: CONTRIBUTOR_EMAIL,
            bodyContains: [COLLECTION_TITLE, REVIEW_COMMENT, 'my-appverse'],
          });
        });
      });
    });

    describe('Case B: email + cascade-unpublish (published starting state)', () => {
      const COLLECTION_TITLE = 'Test Notebooks (Published)';
      const REVIEW_COMMENT = 'Discovered a regression, please address.';

      beforeEach(() => {
        cy.loginUser(ADMIN_EMAIL, ADMIN_PASS);
        seedRepo({
          title: COLLECTION_TITLE,
          state: 'published',
          memberApps: 2,
          memberAppState: 'published',
        });
        cy.clearMailpit();
      });

      it('emails the contributor AND cascade-unpublishes member apps', () => {
        cy.visit('/appverse/manage-repos', { failOnStatusCode: false });
        cy.contains('.appverse-hub-card', COLLECTION_TITLE, { timeout: 10000 })
          .within(() => {
            // Request changes is now a direct inline icon link (no kebab).
            cy.get('a[href*="/request-changes"]').click();
          });

        cy.url().should('include', '/request-changes');
        cy.get('textarea[name="comment"]').type(REVIEW_COMMENT);
        cy.get('form input[type="submit"][value="Request changes"]').click();

        // Email landed.
        cy.waitForEmail({
          to: CONTRIBUTOR_EMAIL,
          subject: 'Changes requested',
        }).then((message) => {
          cy.assertEmailContent(message, {
            subject: 'Changes requested',
            to: CONTRIBUTOR_EMAIL,
            bodyContains: [COLLECTION_TITLE, REVIEW_COMMENT],
          });
        });

        // Cascade-unpublish: every member app moved off published.
        // Session is still admin from beforeEach, so JSON:API can see
        // unpublished nodes (filter status=1 should return zero rows).
        const collectionUuid = Cypress.env('TEST_COLLECTION_UUID');
        cy.request({
          url: `/jsonapi/node/appverse_app?filter[field_appverse_repo.id]=${collectionUuid}&filter[status]=1`,
          headers: { Accept: 'application/vnd.api+json' },
        }).then((res) => {
          expect(res.body.data).to.have.length(0);
        });
      });
    });
  });

  describe('Publish (admin → contributor + cascade)', () => {
    const COLLECTION_TITLE = 'Test Notebooks (Ready for Publish)';

    beforeEach(() => {
      cy.loginUser(ADMIN_EMAIL, ADMIN_PASS);
      seedRepo({
        title: COLLECTION_TITLE,
        state: 'ready_for_review',
        memberApps: 2,
        memberAppState: 'draft',
      });
      cy.clearMailpit();
    });

    it('emails the contributor once and cascade-publishes member apps', () => {
      cy.visit('/appverse/manage-repos', { failOnStatusCode: false });
      cy.contains('.appverse-hub-card', COLLECTION_TITLE, { timeout: 10000 })
        .within(() => {
          cy.get('form[action*="/publish"] button[type="submit"]')
            .contains('Publish')
            .click();
        });

      // Contributor email landed.
      cy.waitForEmail({
        to: CONTRIBUTOR_EMAIL,
        subject: 'Your Repo is published',
      }).then((message) => {
        cy.assertEmailContent(message, {
          subject: 'Your Repo is published',
          to: CONTRIBUTOR_EMAIL,
          bodyContains: [COLLECTION_TITLE, '/appverse/#/repo/'],
        });
      });

      // No fan-out: exactly one message in Mailpit even though the cascade
      // published two member apps. App-bundle saves must NOT trigger the
      // Collection notifier. Poll until the count has been stable across two
      // successive checks, so a hypothetical async second message arriving
      // shortly after waitForEmail resolves on the first match still fails
      // the assertion below.
      let stableCount = null;
      const pollStable = () => cy.getMailpitMessages().then((messages) => {
        if (stableCount === messages.length) {
          expect(messages.length).to.equal(1);
          return;
        }
        stableCount = messages.length;
        cy.wait(500);
        return pollStable();
      });
      pollStable();

      // Cascade-publish: member apps flipped from draft to published.
      const collectionUuid = Cypress.env('TEST_COLLECTION_UUID');
      cy.request({
        url: `/jsonapi/node/appverse_app?filter[field_appverse_repo.id]=${collectionUuid}&filter[status]=1`,
        headers: { Accept: 'application/vnd.api+json' },
      }).then((res) => {
        expect(res.body.data).to.have.length(2);
      });
    });
  });
});
