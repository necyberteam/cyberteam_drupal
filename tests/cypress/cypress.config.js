const { defineConfig } = require("cypress");

module.exports = defineConfig({

  env: {
    MY_VARIABLE2: "my_value2",
    // baseUrl: "http://localhost:49182/",
  },

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
      on('task', {
        log(message) {
          // Then to see the log messages in the terminal
          //   cy.task("log", "my message");
          console.log('log: ' + message);
          return null;
        },
      });
      // const baseUrl = "http://localhost:49260/";
    },
    // http://127.0.0.1:39317/devtools/inspector.html?ws=127.0.0.1:39317/devtools/page/E4E43917D5EDBCDFB470EE5220BAE032
    // http://localhost:49284/
    baseUrl: "http://127.0.0.1:32784/",
    specPattern: "cypress/**/*.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js",
    fixturesFolder: "cypress/fixtures"
  },
});
