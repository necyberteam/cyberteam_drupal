#!/bin/sh

# Fail on error
set -e

storeKey () {
  mkdir -p ~/.ssh/
  eval $(ssh-agent -s)
  echo "$SSH_PRIVATE_KEY" > ~/.ssh/private.key
  chmod 0600 ~/.ssh/private.key
  ssh-add ~/.ssh/private.key
}

terminusApi () {
  terminus auth:login --machine-token=$terminus_api
}

if [ "$runner" = cron ];
then
  #curl $dev_cron_url
  storeKey
  terminusApi
  terminus remote:drush $site_name.$env -- core-cron -v
fi

if [ "$runner" = deploy ];
  storeKey
  terminusApi
  current_version=$(git describe --tags --abbrev=0)
  terminus env:deploy --note "Version: $current_version" -- $site_name.$env
fi

if [ "$runner" = bkup ];
then
  storeKey
  terminusApi
  mkdir backups
  terminus backup:get $site_name.$env --element=db --to=backups/site.sql.gz
fi

if [ "$runner" = deploy ];
then
  storeKey
  sh -c "composer config -g github-oauth.github.com $gh_token"
  composer install --no-dev --ignore-platform-reqs
  GIT_SSH_COMMAND="ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no" $blt artifact:deploy --commit-msg "$message" --branch "master" --ignore-dirty --ignore-platform-reqs --no-interaction --verbose
fi
