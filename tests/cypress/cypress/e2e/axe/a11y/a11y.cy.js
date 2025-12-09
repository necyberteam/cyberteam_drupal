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

  it('announcements', () => {
    checkMultipleUrls([
      '/announcements',
      '/announcements/tacc-status-saturday-september-27-2025'
    ]);
  });

  it('events', () => {
    checkMultipleUrls([
      '/events',
      '/events/8482'
    ]);
  });

  it('Outages', () => {
    checkA11y('/outages');
  });

  it('Community', () => {
    checkA11y('/community/overview');
  });

  it('Affinity Groups', () => {
    checkMultipleUrls([
      '/affinity-groups',
      '/affinity-groups/anvil'
    ]);
  });

  it('CSSN', () => {
    checkMultipleUrls([
      '/community/cssn',
      '/community/cssn/directory',
      '/community-persona/100',
      '/community/badges',
      '/community/scipe'
    ]);
  });

  it('Workforce Dev Workshops', () => {
    checkA11y('/ccep-workforce-development-funded-workshops');
  });

  it('Knowledge Base Overview', () => {
    checkMultipleUrls([
      '/knowledge-base/overview',
      '/knowledge-base/resources'
    ]);
  });

  it('Find', () => {
    checkA11y('/find');
  });

  it('Tags', () => {
    checkA11y('/tags');
  });

  it('Video Learning Center', () => {
    checkA11y('/video-learning-center');
  });

  it('MATCH Services', () => {
    checkA11y('/match/overview');
  });

  it('ACCESS and NAIRR Pilot Office Hours', () => {
    checkA11y('/access-and-nairr-pilot-office-hours');
  });

  it('ACCESS Tools', () => {
    checkA11y('/tools/overview');
  });

  it('OnDemand', () => {
    checkA11y('/tools/ondemand');
  });

  it('Pegasus Workflows', () => {
    checkA11y('/tools/pegasus');
  });

  it('Science Gateways', () => {
    checkA11y('/tools/science-gateways');
  });

  it('XDMoD', () => {
    checkA11y('/tools/xdmod');
  });

  it('open a help ticket', () => {
    checkA11y('/help-ticket');
  });

  it('create an announcement', () => {
    cy.loginAs('pecan@pie.org', 'Pecan');
    checkA11y('/node/add/access_news');
  });

  it('create an event', () => {
    cy.loginAs('pecan@pie.org', 'Pecan');
    checkA11y('/events/add');
  });

  it('request an affinity group', () => {
    cy.loginAs('pecan@pie.org', 'Pecan');
    checkA11y('/events/add/default');
  });

  it('add a KB resource', () => {
    cy.loginAs('pecan@pie.org', 'Pecan');
    checkA11y('/form/resource');
  });

  it('request an engagement', () => {
    cy.loginAs('pecan@pie.org', 'Pecan');
    checkA11y('/node/add/match_engagement?type=plus');
  });

  it('Edit Community Persona', () => {
    cy.loginAs('pecan@pie.org', 'Pecan');
    checkA11y('/user/edit');
  });

});
