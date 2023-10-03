describe('Admin user sets ACCESS Support domain to the default', () => {
  it('should set the domain to default', () => {
    cy.loginAs('jasper.amp@gmail.com', 'jasper');
    // cy.login('user with administrator role');
    cy.visit('/admin/config/domain/edit/amp_cyberinfrastructure_org');
    cy.get('[name="default_domain"]').check();
    cy.get('[name="test_server_response"]').uncheck();
    cy.get('[name="hostname"]').type('cyberteam.lndo.site');
    cy.contains('Save').click();
    cy.drush("cr");
    // cy.clearCache();
    cy.visit('/');
    cy.request('GET', '/').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.contain('Supporting the ACCESS Research Community');
    });
  });
});
