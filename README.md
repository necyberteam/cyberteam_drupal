# cyberteam_drupal

## Development Environment

This project uses **DDEV** for local development. DDEV provides a consistent, containerized development environment that works across different operating systems.

## robo

We switched to the robo command so we could remove BLT as it's no longer supported. Some of the commands have been revised as well.

| Command          | Description                                                                                                                                                                                                                                                            |
| -------------    | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------                                                                             |
| ddevsetup    | Runs the commands needed for an initial setup of the site with DDEV.                                                                                                                                                                                                   |
| cypress      | Runs cypress tests on accessmatch1. Add a space and the test you want to run for other tests (ie: robo cypress crct).                                                                                                                                                  |
| did          | Runs composer install then reloads from 'backups/site.sql.gz', by running ```gh:pulldb``` you can replaces this with the latest backup. You can add the corresponding number to do a domain switch that you get from the ds command as an argument.                    |
| ds           | Switch default domain.                                                                                                                                                                                                                                                 |
| mds          | Create file (blt/md/md-xxx) that will set the default domain on multidev site.                                                                                                                                                                                         |
| cex          | Export config files and then restore the deleted files. This is helpful if you aren't deleted any config files and want to get past the deleted views.                                                                                                                 |
| snap:create  | Create snapshot.                                                                                                                                                                                                                                                       |
| snap:restore | Restore snapshot.                                                                                                                                                                                                                                                      |
| checkout     | Arguments: `branch` `domain_number`. Use this command to checkout a branch and run the commands needed to get setup and ready to go.                                                                                                                                   |
| gh:keepalive     | This will echo bing every 2 minutes in order to keep a codespace running. Use with caution as if you forget this is running and don't close your codespace, you may run up your minutes. You can use ctrl+c to stop this command from running.                         |
| gh:pulldb        | Daily github action pulls in and processes the production database and places it into an [artifact](https://github.com/necyberteam/cyberteam_drupal/actions/workflows/backupdb.yml). This pulls the latest artifact.                                                   |
| gh:pullfiles     | Daily github action pulls in last pantheon backup and cleans up the private files directory to decrease the size and places it into an [artifact](https://github.com/necyberteam/cyberteam_drupal/actions/workflows/backupfiles.yml).  This pulls the latest artifact. |
| gh:pr            | This command will create a github pull request. It will ask you for the description and then fill in the rest of the template for you.                                                                                                                                 |

## Testing

### Cypress Testing

This project includes Cypress for end-to-end testing. The Cypress configuration is located in `tests/cypress/`.

#### Configuring the Base URL

The base URL for testing is configured in `tests/cypress/cypress.config.js`. By default, it's set to the local DDEV environment.

**Available URLs for testing:**
- **Local DDEV**: `https://cyberteam-drupal.ddev.site` (default)
- **Access Match**: `https://accessmatch.ddev.site`
- **CCMNet**: `https://ccmnet.ddev.site`
- **ConnectCI**: `https://connectci.ddev.site`
- **CRCT**: `https://crct.ddev.site`
- **Campus Champions**: `https://campuschampions.ddev.site`
- **COCO**: `https://coco.ddev.site`
- **Great Plains**: `https://greatplains.ddev.site`
- **KYCT**: `https://kyct.ddev.site`
- **NECT**: `https://nect.ddev.site`
- **OnDemand**: `https://ondemand.ddev.site`

#### Running Cypress Tests

1. **Navigate to the Cypress directory:**
   ```bash
   cd tests/cypress
   ```

2. **Run with a specific URL using environment variable:**
   ```bash
   # Test accessmatch domain
   CYPRESS_BASE_URL=https://accessmatch.ddev.site npm run cypress:run

   # Test crct domain
   CYPRESS_BASE_URL=https://crct.ddev.site npm run cypress:open

   # Test production (if available)
   CYPRESS_BASE_URL=https://your-production-site.com npm run cypress:run
   ```

#### Using Robo for Cypress

You can also run Cypress tests using the robo command:
```bash
vendor/bin/robo cypress [test_name]
```

For example:
- `vendor/bin/robo cypress` - Runs tests on accessmatch1
- `vendor/bin/robo cypress crct` - Runs tests on crct domain

### Accessibility Testing with Axe

This project includes automated accessibility testing using [axe-core](https://github.com/dequelabs/axe-core) and [cypress-axe](https://github.com/component-driven/cypress-axe).

#### Running Accessibility Tests

Accessibility tests are located in `tests/cypress/cypress/e2e/axe/` and test key pages across the site for WCAG compliance.

**Local Testing:**
```bash
cd tests/cypress
# Run all accessibility tests (default domain: accessmatch)
CYPRESS_BASE_URL=https://accessmatch.ddev.site npm run cypress:run -- --spec "cypress/e2e/axe/**/*.js"

# Or test on a different domain
CYPRESS_BASE_URL=https://connectci.ddev.site npm run cypress:run -- --spec "cypress/e2e/axe/**/*.js"
```

**GitHub Actions:**
The accessibility tests run automatically when you include `#a11y` in your:
- Commit message
- Pull request title
- Pull request body

Example commit: `git commit -m "Fix navigation aria-labels #a11y"`

#### Accessibility Reports

When tests run, detailed HTML and CSV reports are generated in `tests/cypress/cypress-a11y-reports/`:
- **summary.html** - Overview of all violations grouped by severity
- **Individual HTML reports** - Detailed breakdown for each tested page
- **CSV files** - Violation data for further analysis

**In CI/CD**, reports are:
1. Uploaded to the [cypress-a11y repository](https://necyberteam.github.io/cypress-a11y/) at `reports/YYYYMMDD/BRANCH_NAME/RUN_ID/summary.html`
2. Available as GitHub Actions artifacts (downloadable for 90 days)
3. Linked in the GitHub Actions run summary
4. Posted to Slack (#cypress-git-notifications) with direct links

#### Controlling Test Failures

By default, accessibility tests **report violations but do not fail**. This allows you to track and fix issues progressively.

To make tests fail on specific severity levels, set the `CYPRESS_A11Y_FAIL_ON` environment variable:

```bash
# Fail on critical issues only
CYPRESS_A11Y_FAIL_ON=critical npm run cypress:run

# Fail on serious and critical issues
CYPRESS_A11Y_FAIL_ON=serious,critical npm run cypress:run
```

**Severity Levels:**
- **Critical** - Serious impact on accessibility, must be fixed
- **Serious** - Significant barrier for some users
- **Moderate** - Noticeable issue but not blocking
- **Minor** - Small improvements that enhance accessibility

#### Custom Accessibility Helper

The project includes a custom `cy.a11yCheckWithReport()` command that:
- Runs axe-core analysis on the current page
- Generates detailed HTML and CSV reports
- Logs violation counts by severity
- Optionally fails tests based on severity thresholds

**Example usage:**
```javascript
describe('My Page Accessibility', () => {
  it('should be accessible', () => {
    cy.visit('/my-page');
    cy.injectAxe();
    cy.a11yCheckWithReport();
  });
});
```

## Github Actions

| Workflow                                                                                                                                                                                                                                                                                                                                                                                              | Ran                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------                                                                                                                                                                                                                                                                                                                                                                                              | ---                            | -----------                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| (A) Config Sync — Run backups <br /> [![(A) Config Sync — Run backups](https://github.com/necyberteam/cyberteam_drupal/actions/workflows/configsync.yml/badge.svg)](https://github.com/necyberteam/cyberteam_drupal/actions/workflows/configsync.yml)                                                                                                                                                 | Weekly on Wed. Afternoon       | Pulls in prod database and adds it to an artifact. Then builds the site from the production db. Next, it diffs the config files from the last git tag and creates a file to checkout all of those files so they don't change. Then it runs ```drush cex -y``` and runs the diff file to checkout anything that has changed since the last tag, any git files that are left over are committed to a new branch and the pull request is created. |
| (A) Database to artifact <br /> [![(A) Database to artifact](https://github.com/necyberteam/cyberteam_drupal/actions/workflows/backupdb.yml/badge.svg)](https://github.com/necyberteam/cyberteam_drupal/actions/workflows/backupdb.yml)                                                                                                                                                               | Daily in the early morning     | This builds the site from the lastest db and then runs everything needed for the dev version of the site. Enables modules, and sanitizes the db. Once this all is complete, the db is exported and added to an artifact. This is the db that will be pulled for the _Composer Updates_ workflow and local version of the site.                                                                                                                |
| (A) Deploy to dev <br /> [![(A) Deploy to dev](https://github.com/necyberteam/cyberteam_drupal/actions/workflows/main.yml/badge.svg)](https://github.com/necyberteam/cyberteam_drupal/actions/workflows/main.yml)                                                                                                                                                                                     | Any push to main or md- branch | This builds the site using the blt command and then pushes the built version to the hosts dev site on pantheon. You can skip this workflow by adding ```#nobuild``` to your commit message. You can also run the behat workflow by adding #behat to your commit message. On initial push of md- branch this will create the md site on pantheon. This will also setup the default domain if set using blt amp:mds                                                                                                                                                                      |
| (A) Files to artifact <br /> [![(A) Database to artifact](https://github.com/necyberteam/cyberteam_drupal/actions/workflows/backupfiles.yml/badge.svg)](https://github.com/necyberteam/cyberteam_drupal/actions/workflows/backupfiles.yml)                                                                                                                                                            | Daily in the early morning     | This pulls the files from dev, cleans out the private directory, and adds them to an artifact. These can then be used on the local version of the site.                                                                                                                                                                                                                                                                                       |
| (AM) Behat Tests  <br /> [![(M) Behat Tests](https://github.com/necyberteam/cyberteam_drupal/actions/workflows/behat.yml/badge.svg)](https://github.com/necyberteam/cyberteam_drupal/actions/workflows/behat.yml)                                                                                                                                                                                     | PR, Deploy to dev, Manual      | This pulls builds the current PR or branch  and runs behat tests against the site.                                                                                                                                                                                                                                                                                                                                                            |
| (M) Composer Updates <br /> [![(A) Database to artifact](https://github.com/necyberteam/cyberteam_drupal/actions/workflows/updates.yml/badge.svg)](https://github.com/necyberteam/cyberteam_drupal/actions/workflows/updates.yml)                                                                                                                                                                     | Manual                         | You specify the module or library name for the input box and click run. This will build the site, update the module and run the proper drush commands, and lastly run the behat tests. If all runs well, the updated composer.lock file will be committed to a branch named after the update and then a pull request will be created.                                                                                                         |
| (M) Create Release <br /> [![(A) Database to artifact](https://github.com/necyberteam/cyberteam_drupal/actions/workflows/releases.yml/badge.svg)](https://github.com/necyberteam/cyberteam_drupal/actions/workflows/releases.yml)                                                                                                                                                                     | Manual                         | If the defaults are kept for the inputs this will iterate the last tag and then add release notes that include all commit messages since the last tag. After the release/tag are created, the terminus command will be ran to deploy to test.                                                                                                                                                                                                 |
| (M) Deploy to Prod  <br /> [![(M) Deploy to Prod](https://github.com/necyberteam/cyberteam_drupal/actions/workflows/deployprod.yml/badge.svg)](https://github.com/necyberteam/cyberteam_drupal/actions/workflows/deployprod.yml)                                                                                                                                                                      | Manual                         | If the defaults are kept for the inputs this will iterate the last tag and then add release notes that include all commit messages since the last tag. After the release/tag are created, the terminus command will be ran to deploy to test.                                                                                                                                                                                                 |

## Getting Started

### Prerequisites
- [DDEV](https://ddev.readthedocs.io/en/stable/#installation) installed on your local machine
- [Docker](https://docs.docker.com/get-docker/) (required by DDEV)

### Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/necyberteam/cyberteam_drupal.git
   cd cyberteam_drupal
   ```

2. **Start DDEV and setup the site:**
   ```bash
   vendor/bin/robo ddevsetup [GITHUB_TOKEN] [AMP_UID]
   ```

   Or setup manually:
   ```bash
   ddev start
   ddev exec vendor/bin/robo gh:pulldb
   ddev exec vendor/bin/robo gh:pullfiles
   ddev exec vendor/bin/robo did
   ```

3. **Access the site:**
   - Main site: https://cyberteam-drupal.ddev.site
   - All configured domains:
     - https://accessmatch.ddev.site
     - https://ccmnet.ddev.site
     - https://connectci.ddev.site
     - https://crct.ddev.site
     - https://campuschampions.ddev.site
     - https://coco.ddev.site
     - https://greatplains.ddev.site
     - https://kyct.ddev.site
     - https://nect.ddev.site
     - https://ondemand.ddev.site

## Codespaces

This repository is setup to run in GitHub Codespaces with DDEV. If you are starting from scratch it'll take a little over 15 minutes to run through the setup script. The script will fully start DDEV and install the site. You will need to set two codespaces secrets in your personal github settings under codespaces located at: https://github.com/settings/codespaces

- AMP_GH_TOKEN_REPO
- AMP_UID

The ```AMP_GH_TOKEN_REPO``` secret will have a github token that has access to the cyberteam repositories with full repo control and ```AMP_UID``` is the user id of your user on the website. You can default to uid 1 if you don't have or know your user id.

Optionally, you can setup two other secrets to automatically login to terminus to connect to Pantheon. You can always run the command to login after install as well. These are the secrets to have the login setup for you:

- AMP_TERMINUS_EMAIL
- AMP_TERMINUS_TOKEN

The email secret is the email you use with pantheon and the token can be setup under your settings within your pantheon account.

### Github CLI

You can create, open, and ssh into your codespaces using Github CLI, see [install instructions](https://github.com/cli/cli#installation) to install on your local system. Once installed check out the [documentation](https://docs.github.com/en/codespaces/developing-in-codespaces/using-github-codespaces-with-github-cli) for commands you can use. You can authorize Github CLI by running the following command:

```gh auth login```
