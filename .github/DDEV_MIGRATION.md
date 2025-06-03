# GitHub Actions Migration: Lando to DDEV

This document outlines the migration of GitHub Actions workflows from Lando to DDEV.

## Overview

We've created DDEV-based GitHub Actions workflows to replace the Lando-based ones. The new workflows provide better performance, reliability, and maintainability.

## New Files Created

### 1. **DDEV Cypress Action** (`.github/actions/ddev-cypress/action.yml`)
- Reusable composite action that sets up DDEV and runs Cypress tests
- Replaces the external `necyberteam/amp_lando_start@v2.3` action
- Handles database import, file download, and test execution

### 2. **DDEV Cypress Workflow** (`.github/workflows/cypress-ddev-simple.yml`)
- Direct replacement for the existing `cypress.yml` workflow
- Uses the new DDEV action for each site test
- Maintains the same site coverage and conditional logic

### 3. **Matrix-based Workflow** (`.github/workflows/cypress-ddev.yml`)
- Alternative approach using GitHub Actions matrix strategy
- More efficient for running multiple similar jobs
- Easier to maintain and extend

## Key Changes

### Lando → DDEV Command Mapping

| Lando | DDEV |
|-------|------|
| `lando start` | `ddev start` |
| `lando composer install` | `ddev composer install` |
| `lando drush wd-show` | `ddev exec drush wd-show` |
| `lando drush watchdog:delete all -y` | `ddev exec drush watchdog:delete all -y` |
| `lando robo cypress` | `ddev exec vendor/bin/robo cypress` |

### Environment Setup

**Lando Setup (old):**
```yaml
- uses: necyberteam/amp_lando_start@v2.3
  with:
    database: ${{ secrets.database }}
    gh_token: ${{ secrets.GH_TOKEN_REPO }}
```

**DDEV Setup (new):**
```yaml
- uses: ddev/github-action-setup-ddev@v1
  with:
    autostart: false
- name: Configure DDEV
  run: |
    ddev config --project-type=drupal10 --docroot=web
    ddev start
```

> Note: The `--create-docroot` flag has been removed as it's deprecated in newer DDEV versions.

### Database Import

**Lando (handled by action):**
- Automatic download and import via `amp_lando_start` action

**DDEV (explicit steps):**
```yaml
- name: Download database
  run: |
    if [ -n "$DATABASE" ]; then
      wget -O site.sql.gz "$DATABASE"
    else
      ddev exec vendor/bin/robo gh:pulldb
    fi
- name: Import database
  run: ddev exec vendor/bin/robo did
```

## Configuration Updates

### DDEV Config (`.ddev/config.yaml`)
- Added `webimage_extra_packages: [gh]` for GitHub CLI
- Added `nodejs_version: "20"` for Cypress
- Configured for Drupal 10 with MySQL 5.7 and PHP 8.2

### Robo Commands
- Updated `did()` function to auto-detect DDEV environment
- Added `ddevsetup()` command for local development
- Environment detection works in both local and CI contexts

## Benefits of DDEV Migration

1. **Performance**: DDEV typically starts faster than Lando
2. **Reliability**: More stable container management
3. **Maintainability**: Active development and better documentation
4. **GitHub Actions Integration**: Official DDEV GitHub Action
5. **Consistency**: Same tool for local development and CI

## Migration Strategy

### Phase 1: Parallel Testing
- Keep existing Lando workflows active
- Run new DDEV workflows in parallel
- Compare results and performance

### Phase 2: Gradual Replacement
- Replace one site at a time
- Monitor for issues
- Update any site-specific configurations

### Phase 3: Full Migration
- Disable old Lando workflows
- Remove Lando dependencies
- Update documentation

## Usage

### Local Development
```bash
# Setup DDEV environment
vendor/bin/robo ddevsetup

# Run tests locally
ddev exec vendor/bin/robo cypress accessmatch1
```

### GitHub Actions
The workflows will automatically run on:
- Pull requests
- Merge group events
- Manual workflow dispatch

### Manual Trigger
```bash
gh workflow run cypress-ddev-simple.yml \
  --ref main \
  -f sites="accessmatch1,ccmnet" \
  -f database="https://example.com/custom-db.sql.gz"
```

## Troubleshooting

### Common Issues

1. **GitHub CLI Authentication**
   - Ensure `GH_TOKEN_REPO` secret has `read:org` scope
   - Verify token permissions for artifact download

2. **Database Import Failures**
   - Check artifact availability
   - Verify custom database URL accessibility
   - Ensure sufficient disk space

3. **Cypress Test Failures**
   - Check DDEV site URLs match test configuration
   - Verify Node.js and npm installation
   - Review Drupal deployment and configuration import

### Debug Commands
```bash
# Check DDEV status
ddev describe

# View Drupal logs
ddev exec drush wd-show --count=100

# Test Cypress setup
cd tests/cypress && ddev exec npm install
```

## Rollback Plan

If issues arise, rollback steps:

1. Re-enable original `cypress.yml` workflow
2. Disable new DDEV workflows
3. Investigate and fix issues
4. Re-attempt migration

## Next Steps

1. Test new workflows on a feature branch
2. Compare performance metrics
3. Update team documentation
4. Schedule migration timeline
5. Plan team training if needed