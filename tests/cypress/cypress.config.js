const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    fixturesFolder: "cypress/fixtures",
    integrationFolder: "cypress/integration",
    pluginsFile: "cypress/plugins/index.js",
    screenshotsFolder: "cypress/screenshots",
    supportFile: "cypress/support/e2e.js",
    videosFolder: "cypress/videos",
    viewportWidth: 1440,
    viewportHeight: 900,

  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    fixturesFolder: "cypress/fixtures"
  },
});
