#!/bin/sh

# Fail on error
set -e

storeKey () {
  mkdir -p ~/.ssh/
  eval $(ssh-agent -s)
  echo "$SSH_PRIVATE_KEY" > ~/.ssh/private.key
  chmod 0600 ~/.ssh/private.key
  ssh-add ~/.ssh/private.key
  git config --global --add safe.directory "*"
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

if [ "$runner" = cr ];
then
  storeKey
  terminusApi
  terminus remote:drush $site_name.$env -- cr
fi

if [ "$runner" = deploy ];
then
  storeKey
  terminusApi
  current_version=$(git describe --tags --abbrev=0)
  terminus env:deploy --note "Version: $current_version" $flags -- $site_name.$env
fi

if [ "$runner" = bkup ];
then
  storeKey
  terminusApi
  mkdir backups
  terminus backup:get $site_name.$env --element=db --to=backups/site.sql.gz
fi

if [ "$runner" = bkup-files ];
then
  storeKey
  terminusApi
  mkdir backups
  file_url=$(terminus backup:get $site_name.$env --element=files)
  wget -O files.tar.gz $file_url
  tar -xzvf files.tar.gz
  rm -fR files_live/php/twig/*
  rm -fR files_live/private/20*
  rm -fR files_live/private/.keys
  rm -fR files_live/private/styles/*
  rm -fR files_live/private/webform/*
  mv files_live files
  tar -czvf files.tar.gz files
  rm -fR files
fi

if [ "$runner" = update ];
then
  storeKey
  sh -c "composer config -g github-oauth.github.com $gh_token"
  composer install --no-dev --ignore-platform-reqs
  branch="${GITHUB_REF#refs/heads/}"
  if [ "$branch" = "main" ]; then
    branch="master"
  fi
  GIT_SSH_COMMAND="ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no" $blt artifact:deploy --commit-msg "$message" --branch "$branch" --ignore-dirty --ignore-platform-reqs --no-interaction --verbose
fi

if [ "$runner" = composer_update ];
then
  storeKey
  git branch $drupal_update
  git checkout $drupal_update
  git remote set-url origin "https://$username:$gh_token@github.com/necyberteam/cyberteam_drupal.git"
  git config --global user.email \"$email\"
  git config --global user.name \"$username\"
  composer config -g github-oauth.github.com $gh_token
  composer install --no-dev --ignore-platform-reqs
  $blt amp:ciupdate "$drupal_update" --no-interaction --verbose
  git push origin $drupal_update
fi

if [ "$runner" = deletepr ];
then
  branch=$PR_BRANCH
  echo $branch
  storeKey
  terminusApi
  terminus multidev:delete --delete-branch --yes -- accessmatch.$branch
fi

if [ "$runner" = md_check ];
then
  storeKey
  terminusApi
  branch="${GITHUB_REF#refs/heads/}"
  touch md_check.txt
  vendor/bin/blt pmd:check $branch --no-interaction >> md_check.txt
fi

if [ "$runner" = md_create ];
then
  storeKey
  terminusApi
  branch="${GITHUB_REF#refs/heads/}"
  vendor/bin/blt pmd:create $branch --no-interaction
fi

if [ "$runner" = md_file_commands ];
then
  storeKey
  terminusApi
  branch="${GITHUB_REF#refs/heads/}"
  commands=$(cat blt/md/$branch)
  echo $commands
  terminus remote:drush accessmatch.$branch -- domain:default $commands
fi
