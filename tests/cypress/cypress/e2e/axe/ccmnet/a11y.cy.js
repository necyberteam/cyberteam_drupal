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
    it('Main Pages', () => {
    checkMultipleUrls([
      '/',
      '/mentorships',
      '/members',
      '/about-ccmnet',
      '/annual-meeting'
    ]);
  });

  it('User login pages', () => {
    checkMultipleUrls([
      '/user/register',
      '/user/login'
    ]);
  });

  it('Affinity Groups', () => {
    checkMultipleUrls([
      '/affinity-groups/ccmnet-mentoring',
      '/affinity-groups'
    ]);
  });

  it('Knowledgebase', () => {
    checkMultipleUrls([
      '/knowledge-base/resources/mentorship',
      '/knowledge-base/resources'
    ]);
  });

  it('conduct', () => {
    checkA11y('/tags');
  });

});
