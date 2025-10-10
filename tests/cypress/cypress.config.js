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

          // Create base filenames
          const base = payload.fileBase || `report_${Date.now()}`;

          // Write CSV instead of JSON for each test
          const detailedCsvPath = path.join(reportDir, `${base}.csv`);

          // HTML report path
          const htmlReportPath = path.join(reportDir, `${base}.html`);

          // Convert violations to CSV format with detailed node information
          const csvHeader = 'impact,id,description,help,helpUrl,tags,html,target,failureSummary\n';

          let csvRows = [];

          // Calculate counts early for both HTML and CSV reports
          const counts = { critical: 0, serious: 0, moderate: 0, minor: 0 };
          (payload.results.violations || []).forEach(v => {
            const k = (v.impact || 'minor').toLowerCase();
            if (counts[k] !== undefined) counts[k] += 1;
          });

          // Generate HTML content
          let htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accessibility Test Results</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        h1, h2, h3 { margin-top: 20px; }
        .summary { background: #f5f5f5; padding: 15px; border-radius: 4px; margin-bottom: 20px; }
        .violation { border: 1px solid #ddd; padding: 15px; margin-bottom: 15px; border-radius: 4px; }
        .critical { border-left: 5px solid #d9534f; }
        .serious { border-left: 5px solid #f0ad4e; }
        .moderate { border-left: 5px solid #5bc0de; }
        .minor { border-left: 5px solid #5cb85c; }
        .impact { font-weight: bold; }
        .impact.critical { color: #d9534f; }
        .impact.serious { color: #f0ad4e; }
        .impact.moderate { color: #5bc0de; }
        .impact.minor { color: #5cb85c; }
        .node { border-left: 3px solid #eee; padding-left: 15px; margin: 10px 0; }
        .code { background: #f8f9fa; padding: 10px; border-radius: 4px; white-space: pre-wrap; overflow-wrap: break-word; }
        .target { font-family: monospace; margin-top: 5px; }
        .failure-summary { background: #fff3cd; padding: 10px; border-radius: 4px; margin-top: 10px; }
    </style>
</head>
<body>
    <h1>Accessibility Test Results</h1>
    <div class="summary">
        <h2>Test Summary</h2>
        <p><strong>URL:</strong> ${payload.url || 'N/A'}</p>
        <p><strong>Test Spec:</strong> ${payload.spec || 'N/A'}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Total Violations:</strong> ${(payload.results.violations || []).length}</p>
        <p><strong>Critical:</strong> ${counts.critical}</p>
        <p><strong>Serious:</strong> ${counts.serious}</p>
        <p><strong>Moderate:</strong> ${counts.moderate}</p>
        <p><strong>Minor:</strong> ${counts.minor}</p>
    </div>
`;

          // Using the existing counts object for both HTML and CSV reports

          // Expand each violation to include node-specific details
          if (payload.results.violations && payload.results.violations.length > 0) {
            htmlContent += '<h2>Violations</h2>';

            (payload.results.violations || []).forEach(violation => {
              // Impact for this violation
              const impact = (violation.impact || 'minor').toLowerCase();

              // Add violation to HTML
              htmlContent += `
    <div class="violation ${impact}">
        <h3>${violation.id} - ${violation.help}</h3>
        <p class="impact ${impact}">Impact: ${violation.impact}</p>
        <p><strong>Description:</strong> ${violation.description}</p>
        <p><strong>Help:</strong> <a href="${violation.helpUrl}" target="_blank">${violation.help}</a></p>
        <p><strong>Tags:</strong> ${(violation.tags || []).join(', ')}</p>
        <h4>Affected Elements (${violation.nodes.length})</h4>
`;

              // Process each node for this violation
              violation.nodes.forEach(node => {
                htmlContent += `
        <div class="node">
            <div class="code">${node.html.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
            <p class="target"><strong>Target:</strong> ${(node.target || []).join(', ')}</p>
            <div class="failure-summary"><strong>Failure Summary:</strong><br>${node.failureSummary.replace(/\n/g, '<br>')}</div>
        </div>`;

                csvRows.push([
                  violation.impact || '',
                  violation.id || '',
                  JSON.stringify(violation.description || ''),
                  JSON.stringify(violation.help || ''),
                  JSON.stringify(violation.helpUrl || ''),
                  JSON.stringify((violation.tags || []).join(';')),
                  JSON.stringify(node.html || ''),
                  JSON.stringify((node.target || []).join(';')),
                  JSON.stringify(node.failureSummary || '')
                ].join(','));
              });

              htmlContent += `
    </div>`;
            });
          } else {
            htmlContent += '<h2>No violations found!</h2>';
          }

          htmlContent += `
</body>
</html>`;

          // Write HTML and CSV files
          fs.writeFileSync(htmlReportPath, htmlContent);
          fs.writeFileSync(detailedCsvPath, csvHeader + csvRows.join('\n'));

          // Append CSV summary (create header if new)
          const csvPath = path.join(reportDir, `summary.csv`);
          if (!fs.existsSync(csvPath)) {
            fs.writeFileSync(
              csvPath,
              'spec,url,violations,critical,serious,moderate,minor,csv\n'
            );
          }
          // counts already calculated above for both reports
          const line = [
            JSON.stringify(payload.spec || ''),
            JSON.stringify(payload.url || ''),
            (payload.results.violations || []).length,
            counts.critical, counts.serious, counts.moderate, counts.minor,
            JSON.stringify(path.basename(detailedCsvPath)),
          ].join(',') + '\n';
          fs.appendFileSync(csvPath, line);

          return { detailedCsvPath, csvPath, counts };
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
