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
      '/about-pa-science',
      '/about-us/project-guide',
      '/about-us/user-guide',
      '/code-of-conduct',
      '/connectci-code-of-conduct',
      '/connectci-privacy-policy',
      '/guide',
    ]);
  });

  it('User login links', () => {
    checkMultipleUrls([
      '/user/login',
      '/user/password',
      '/user/register',
      '/user/register/pascience',
    ]);
  });

  it('Projects', () => {
    checkA11y('/projects');
  });

  it('Projects', () => {
    cy.loginUser('pecan@pie.org', 'Pecan');
    checkA11y('/form/project');
  });

  it('Mentoring', () => {
    checkA11y('/affinity-groups/ccmnet-mentoring');
  });

  it('Contact', () => {
    checkA11y('/contact/pa_science');
  });

  it('Members', () => {
    checkA11y('/members');
  });

  it('People', () => {
    checkA11y('/people?facets_query=&f%5B0%5D=program%3A933');
  });

  it('Tags', () => {
    checkA11y('/tags');
  });

});
