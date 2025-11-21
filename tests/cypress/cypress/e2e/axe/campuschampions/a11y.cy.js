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
  it('home', () => {
    checkA11y('/');
  });

  it('mentorship program', () => {
    checkA11y('campus-champions-ai-mentorship-program');
  });

  it('News', () => {
    checkA11y('/news');
  });

  it('Champions', () => {
    checkMultipleUrls([
      '/current-champions',
      '/champions/current-campus-champions',
      '/form/join-campus-champions'
    ]);
  });

  it('About', () => {
    checkMultipleUrls([
      '/about',
      '/about-us/governance',
      '/about-us/affinity-groups-faq'
    ]);
  });

    it('conduct', () => {
    checkMultipleUrls([
      '/code-of-conduct',
      '/connectci-code-of-conduct'
    ]);
  });

  it('people', () => {
    checkA11y('/people?facets_query=&f%5B0%5D=program%3A572');
  });

  it('Announcments', () => {
    checkMultipleUrls([
      '/announcements',
      '/announcements/announcing-campus-champions-cc-ai-mentorship-program'
    ]);
  });

  it('Affinity Groups', () => {
    checkA11y('/affinity-groups');
  });

  it('Member', () => {
    checkA11y('/become-member-cssn-community');
  });

  it('Resources', () => {
    checkMultipleUrls([
      '/nsf-access-resources',
      '/resources'
    ]);
  });

  it('Tags', () => {
    checkMultipleUrls([
      '/tags',
      '/form/request-tag',
      '/tags/nlp',
      '/add-interest',
      '/add-skill'
    ]);
  });

  it('grad goals', () => {
    checkA11y('/node/11170');
  });

  it('Events', () => {
    checkA11y('/events');
  });

  it('User pages', () => {
    checkMultipleUrls([
      '/user/edit',
      '/user/password'
    ]);
  });

  it('privacy policy', () => {
    checkA11y('/connectci-privacy-policy');
  });

});
