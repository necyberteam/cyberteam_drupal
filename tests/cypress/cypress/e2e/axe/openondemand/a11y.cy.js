// Helper function to check accessibility for a given URL
const checkA11y = (url) => {
  cy.visit(url);
  cy.injectAxe();
  cy.a11yCheckWithReport({
    exclude: [
      [
        ['#universal-menus'],
        ['#header'],
        ['#site-menus']
      ]
    ]
  });
};

// Helper function to check multiple URLs in a single test
const checkMultipleUrls = (urls) => {
  urls.forEach(url => checkA11y(url));
};

describe('Accessibility Testing - reports all violations without failing CI (initial phase)', () => {
  it('Main pages', () => {
    checkMultipleUrls([
      '/',
      '/about',
      '/about-open-ondemand-community-portal',
      '/code-of-conduct',
      '/connectci-privacy-policy'
    ]);
  });

  it('Affinity Groups', () => {
    checkMultipleUrls([
      '/affinity-groups',
      '/affinity-groups/customizing-ood-backend',
      '/affinity-groups/genomics-ood',
      '/affinity-groups/new-open-ondemand',
      '/affinity-groups/ood-appverse',
      '/affinity-groups/ood-security-best-practices',
      '/affinity-groups/web-apps-and-absolute-urls-ood',
      '/form/affinity-group-request'
    ]);
  });

  it('announcment', () => {
    checkA11y('/announcements');
  });

  it('Contact', () => {
    checkA11y('/contact/open_ondemand');
  });

  it('Events', () => {
    checkMultipleUrls([
      '/events',
      '/events/8070'
    ]);
  });

  it('Resources', () => {
    cy.loginAs('pecan@pie.org', 'Pecan');
    checkMultipleUrls([
      '/form/resource',
      '/knowledge-base/resources'
    ]);
  });

  it('people', () => {
    checkA11y('/people');
  });

  it('tags', () => {
    checkA11y('/tags/ruby');
  });

  it('User login resources', () => {
    checkMultipleUrls([
      '/user/register/ondemand',
      '/user/password',
      '/user/register',
      '/user/register/ccmnet/',
      '/google-signin'
    ]);
  });

});
