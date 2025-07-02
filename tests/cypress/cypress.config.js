const { defineConfig } = require("cypress");

// Get base URL from environment variable or default to local DDEV
const baseUrl = process.env.CYPRESS_BASE_URL || 'https://cyberteam-drupal.ddev.site';

module.exports = defineConfig({

  component: {
    fixturesFolder: "cypress/fixtures",
    integrationFolder: "cypress/integration",
    pluginsFile: "cypress/plugins/index.js",
    screenshotsFolder: "cypress/screenshots",
    supportFile: "cypress/support/e2e.js",
    videosFolder: "cypress/videos",
  },

  e2e: {
    baseUrl: baseUrl,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        log(message) {
          // Then to see the log messages in the terminal
          //   cy.task("log", "my message");
          console.log('log: ' + message);
          return null;
        },
      });
    },
    specPattern: "cypress/**",
    supportFile: "cypress/support/e2e.js",
    fixturesFolder: "cypress/fixtures",
    experimentalStudio: true,
    viewportWidth: 1440,
    viewportHeight: 900,
  },
});
