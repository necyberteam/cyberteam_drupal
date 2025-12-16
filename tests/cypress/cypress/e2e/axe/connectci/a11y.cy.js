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
      '/connectci-privacy-policy',
      '/code-of-conduct',
    ]);
  });

  it('User Login pages', () => {
    checkMultipleUrls([
      '/user/login',
      '/user/password',
      '/user/register',
      '/user/register/student',
      '/user/register/rcf',
    ]);
  });

  it('Contact', () => {
    checkA11y('/contact/connect_ci');
  });

});
