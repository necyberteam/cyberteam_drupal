describe("Test registration page", () => {
  const accountTypes = [
    {
      selector: '',
      link: '/user/register/rcf',
      linkText: 'Research Computing Facilitator',
      expectedText: 'Create new research computing facilitator account'
    },
    {
      selector: '',
      link: '/user/register/rse',
      linkText: 'Research Software Engineer',
      expectedText: 'Create new research software engineer account'
    },
    {
      selector: '',
      link: '/user/register/cise',
      linkText: 'Cyberinfrastructure Systems Engineer',
      expectedText: 'Create new ci systems engineer account'
    },
    {
      selector: '',
      link: '/user/register/student_champion',
      linkText: 'Student Champion',
      expectedText: 'Create new student champion account'
    },
    {
      selector: '',
      link: '/user/register/domain_champion',
      linkText: 'Domain Champion',
      expectedText: 'Create new domain champion account'
    },
    {
      selector: '.card:nth-child(3) ',
      link: '/user/register/representative',
      linkText: 'Representative',
      expectedText: 'Create new representative account'
    }
  ];

  accountTypes.forEach(account => {
    it(`should display the correct form for ${account.linkText}`, () => {
      // Visit the "user/register" URL
      cy.visit('/user/register');

      // Assert the presence of the specific text
      cy.contains('Please select an account type below to create');

      // Click the account type link
      cy.contains(account.linkText);
      cy.get(account.selector + "a[href='" + account.link + "']:nth-child(1)").click();

      // Assert the presence of the specific text
      cy.contains(account.expectedText);
    });
  })

});
