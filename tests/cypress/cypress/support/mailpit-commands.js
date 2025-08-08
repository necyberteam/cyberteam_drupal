/**
 * Mailpit API commands for email testing
 * 
 * Mailpit API documentation: https://github.com/axllent/mailpit/blob/develop/docs/apiv1/README.md
 */

// Get mailpit URL from environment or use default DDEV URL
const getMailpitUrl = () => {
  return Cypress.env('MAILPIT_URL') || 'https://cyberteam-drupal.ddev.site:8026';
};

/**
 * Get all messages from mailpit
 */
Cypress.Commands.add('getMailpitMessages', () => {
  const mailpitUrl = getMailpitUrl();
  return cy.request({
    method: 'GET',
    url: `${mailpitUrl}/api/v1/messages`,
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(200);
    return response.body.messages || [];
  });
});

/**
 * Search for messages in mailpit
 * @param {object} searchParams - Search parameters
 * @param {string} searchParams.to - To email address
 * @param {string} searchParams.from - From email address
 * @param {string} searchParams.subject - Subject contains
 * @param {string} searchParams.query - Full text search query
 */
Cypress.Commands.add('searchMailpitMessages', (searchParams) => {
  const mailpitUrl = getMailpitUrl();
  const params = new URLSearchParams();
  
  if (searchParams.to) params.append('query', `to:"${searchParams.to}"`);
  if (searchParams.from) params.append('query', `from:"${searchParams.from}"`);
  if (searchParams.subject) params.append('query', `subject:"${searchParams.subject}"`);
  if (searchParams.query) params.append('query', searchParams.query);
  
  return cy.request({
    method: 'GET',
    url: `${mailpitUrl}/api/v1/search?${params.toString()}`,
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(200);
    return response.body.messages || [];
  });
});

/**
 * Get a specific message by ID
 * @param {string} messageId - Message ID
 */
Cypress.Commands.add('getMailpitMessage', (messageId) => {
  const mailpitUrl = getMailpitUrl();
  return cy.request({
    method: 'GET',
    url: `${mailpitUrl}/api/v1/message/${messageId}`,
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(200);
    return response.body;
  });
});

/**
 * Delete all messages from mailpit
 */
Cypress.Commands.add('clearMailpit', () => {
  const mailpitUrl = getMailpitUrl();
  return cy.request({
    method: 'DELETE',
    url: `${mailpitUrl}/api/v1/messages`,
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});

/**
 * Wait for an email to arrive and return it
 * @param {object} criteria - Search criteria
 * @param {string} criteria.to - To email address
 * @param {string} criteria.subject - Subject contains
 * @param {number} timeout - Max time to wait in ms (default 10000)
 */
Cypress.Commands.add('waitForEmail', (criteria, timeout = 10000) => {
  const startTime = Date.now();
  
  const checkForEmail = () => {
    return cy.searchMailpitMessages(criteria).then((messages) => {
      if (messages.length > 0) {
        // Return the most recent message
        return messages[0];
      }
      
      if (Date.now() - startTime > timeout) {
        throw new Error(`Email not found after ${timeout}ms with criteria: ${JSON.stringify(criteria)}`);
      }
      
      // Wait 500ms and try again
      cy.wait(500);
      return checkForEmail();
    });
  };
  
  return checkForEmail();
});

/**
 * Assert email content
 * @param {object} message - Email message from mailpit
 * @param {object} expectations - Expected values
 * @param {string} expectations.subject - Expected subject
 * @param {string} expectations.from - Expected from address
 * @param {string} expectations.to - Expected to address
 * @param {string} expectations.bodyContains - Text that should be in body
 * @param {string} expectations.htmlContains - HTML that should be in body
 */
Cypress.Commands.add('assertEmailContent', (message, expectations) => {
  if (expectations.subject) {
    expect(message.Subject).to.contain(expectations.subject);
  }
  
  if (expectations.from) {
    const fromAddress = message.From?.Address || message.From?.address;
    expect(fromAddress).to.equal(expectations.from);
  }
  
  if (expectations.to) {
    const toAddresses = message.To?.map(t => t.Address || t.address) || [];
    expect(toAddresses).to.include(expectations.to);
  }
  
  // Get full message details if we need to check body content
  if (expectations.bodyContains || expectations.htmlContains) {
    cy.getMailpitMessage(message.ID).then((fullMessage) => {
      if (expectations.bodyContains) {
        expect(fullMessage.Text || '').to.contain(expectations.bodyContains);
      }
      
      if (expectations.htmlContains) {
        expect(fullMessage.HTML || '').to.contain(expectations.htmlContains);
      }
    });
  }
});