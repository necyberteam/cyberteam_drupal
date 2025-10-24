describe('Accessibility Testing - reports all violations without failing CI (initial phase)', () => {
  it('home', () => {
    cy.visit('/');
    cy.injectAxe();
    cy.a11yCheckWithReport();
  });

  it('announcements', () => {
    cy.visit('/announcements');
    cy.injectAxe();
    cy.a11yCheckWithReport();

    cy.visit('/announcements/tacc-status-saturday-september-27-2025');
    cy.injectAxe();
    cy.a11yCheckWithReport();
  });

  it('events', () => {
    cy.visit('/events');
    cy.injectAxe();
    cy.a11yCheckWithReport();

    cy.visit('/events/8482');
    cy.injectAxe();
    cy.a11yCheckWithReport();
  });

  it('Outages', () => {
    cy.visit('/outages');
    cy.injectAxe();
    cy.a11yCheckWithReport();
  });

  it('Community', () => {
    cy.visit('/community/overview');
    cy.injectAxe();
    cy.a11yCheckWithReport();
  });

  it('Affinity Groups', () => {
    cy.visit('/affinity-groups');
    cy.injectAxe();
    cy.a11yCheckWithReport();

    cy.visit('/affinity-groups/anvil');
    cy.injectAxe();
    cy.a11yCheckWithReport();
  });

  it('CSSN', () => {
    cy.visit('/community/cssn');
    cy.injectAxe();
    cy.a11yCheckWithReport();

    cy.visit('/community/cssn/directory');
    cy.injectAxe();
    cy.a11yCheckWithReport();

    cy.visit('/community-persona/100');
    cy.injectAxe();
    cy.a11yCheckWithReport();

    cy.visit('/community/badges');
    cy.injectAxe();
    cy.a11yCheckWithReport();

    cy.visit('/community/scipe');
    cy.injectAxe();
    cy.a11yCheckWithReport();
  });

  it('Workforce Dev Workshops ', () => {
    cy.visit('/ccep-workforce-development-funded-workshops');
    cy.injectAxe();
    cy.a11yCheckWithReport();
  });

  it('Knowledge Base Overview ', () => {
    cy.visit('/knowledge-base/overview');
    cy.injectAxe();
    cy.a11yCheckWithReport();

    cy.visit('/knowledge-base/resources');
    cy.injectAxe();
    cy.a11yCheckWithReport();
  });

  it('Find', () => {
    cy.visit('/find');
    cy.injectAxe();
    cy.a11yCheckWithReport();
  });

  it('Tags', () => {
    cy.visit('/tags');
    cy.injectAxe();
    cy.a11yCheckWithReport();
  });

  it('Video Learning Center', () => {
    cy.visit('/video-learning-center');
    cy.injectAxe();
    cy.a11yCheckWithReport();
  });

  it('MATCH Services', () => {
    cy.visit('/match/overview');
    cy.injectAxe();
    cy.a11yCheckWithReport();
  });

  it('ACCESS and NAIRR Pilot Office Hours', () => {
    cy.visit('/access-and-nairr-pilot-office-hours');
    cy.injectAxe();
    cy.a11yCheckWithReport();
  });

  it('ACCESS Tools', () => {
    cy.visit('/tools/overview');
    cy.injectAxe();
    cy.a11yCheckWithReport();
  });

  it('OnDemand', () => {
    cy.visit('/tools/ondemand');
    cy.injectAxe();
    cy.a11yCheckWithReport();
  });

  it('Pegasus Workflows', () => {
    cy.visit('/tools/pegasus');
    cy.injectAxe();
    cy.a11yCheckWithReport();
  });

  it('Science Gateways', () => {
    cy.visit('/tools/science-gateways');
    cy.injectAxe();
    cy.a11yCheckWithReport();
  });

  it('XDMoD', () => {
    cy.visit('/tools/xdmod');
    cy.injectAxe();
    cy.a11yCheckWithReport();
  });

  it('open a help ticket', () => {
    cy.visit('/help-ticket');
    cy.injectAxe();
    cy.a11yCheckWithReport();
  });

  it('create an announcement', () => {
    cy.loginAs('pecan@pie.org', 'Pecan');
    cy.visit('/node/add/access_news');
    cy.injectAxe();
    cy.a11yCheckWithReport();
  });

  it('create an event', () => {
    cy.loginAs('pecan@pie.org', 'Pecan');
    cy.visit('/events/add');
    cy.injectAxe();
    cy.a11yCheckWithReport();
  });

  it('request an affinity group', () => {
    cy.loginAs('pecan@pie.org', 'Pecan');
    cy.visit('/events/add/default');
    cy.injectAxe();
    cy.a11yCheckWithReport();
  });

  it('add a KB resource', () => {
    cy.loginAs('pecan@pie.org', 'Pecan');
    cy.visit('/form/resource');
    cy.injectAxe();
    cy.a11yCheckWithReport();
  });

  it('request an engagement', () => {
    cy.loginAs('pecan@pie.org', 'Pecan');
    cy.visit('/node/add/match_engagement?type=plus');
    cy.injectAxe();
    cy.a11yCheckWithReport();
  });

  it('Edit Community Persona', () => {
    cy.loginAs('pecan@pie.org', 'Pecan');
    cy.visit('/user/edit');
    cy.injectAxe();
    cy.a11yCheckWithReport();
  });

});
