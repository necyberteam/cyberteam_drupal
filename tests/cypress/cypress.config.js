const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');

// Get base URL from environment variable or default to local DDEV
const baseUrl = process.env.CYPRESS_BASE_URL || 'https://cyberteam-drupal.ddev.site';

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

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
    specPattern: "cypress/**",
    supportFile: "cypress/support/e2e.js",
    fixturesFolder: "cypress/fixtures",
    experimentalStudio: true,
    viewportWidth: 1440,
    viewportHeight: 900,

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
      on('task', {
        'a11y:writeReport'(payload) {
          const reportDir = config.env.A11Y_REPORT_DIR || 'cypress-a11y-reports';
          ensureDir(reportDir);

          // Write JSON (one file per test)
          const base = payload.fileBase || `report_${Date.now()}`;
          const jsonPath = path.join(reportDir, `${base}.json`);
          fs.writeFileSync(jsonPath, JSON.stringify(payload.results, null, 2));

          // Append CSV summary (create header if new)
          const csvPath = path.join(reportDir, `summary.csv`);
          if (!fs.existsSync(csvPath)) {
            fs.writeFileSync(
              csvPath,
              'spec,url,violations,critical,serious,moderate,minor,json\n'
            );
          }
          const counts = { critical: 0, serious: 0, moderate: 0, minor: 0 };
          (payload.results.violations || []).forEach(v => {
            const k = (v.impact || 'minor').toLowerCase();
            if (counts[k] !== undefined) counts[k] += 1;
          });
          const line = [
            JSON.stringify(payload.spec || ''),
            JSON.stringify(payload.url || ''),
            (payload.results.violations || []).length,
            counts.critical, counts.serious, counts.moderate, counts.minor,
            JSON.stringify(path.basename(jsonPath)),
          ].join(',') + '\n';
          fs.appendFileSync(csvPath, line);

          return { jsonPath, csvPath, counts };
        },
        log(msg) {
          console.log(msg);
          return null;
        }
      });

      return config;
    },

  },
});
