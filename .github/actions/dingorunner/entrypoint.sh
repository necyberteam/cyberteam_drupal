#!/bin/sh

# Fail on error
set -e

storeKey () {
  mkdir -p ~/.ssh/
  eval $(ssh-agent -s)
  echo "$SSH_PRIVATE_KEY" > ~/.ssh/private.key
  chmod 0600 ~/.ssh/private.key
  ssh-add ~/.ssh/private.key
  touch /root/.ssh/known_hosts
  chmod 600 /root/.ssh/known_hosts
  echo "Host *.drush.in" > /root/.ssh/config
  echo "    StrictHostKeyChecking no" >> /root/.ssh/config
  chmod 600 /root/.ssh/config
  cat /root/.ssh/config

  ssh-add -l
  git config --global --add safe.directory "*"
  git config --global --add safe.directory /github/workspace
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
  # Get the latest backup (including manual backups)
  terminus backup:get $site_name.$env --element=db --latest --to=backups/site.sql.gz
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
  git config --global --add safe.directory /github/workspace

  COMPOSER_IGNORE_PLATFORM_REQS=1

  git config --global user.email "$git_email"
  git config --global user.name "$git_name"

  original_directory=$(pwd)

  sh -c "composer config -g github-oauth.github.com $gh_token"

  composer install --no-dev --ignore-platform-reqs

  branch="${GITHUB_REF#refs/heads/}"
  if [ "$branch" = "main" ]; then
    branch="master"
  fi

  mkdir backups
  cd backups
  echo 'Cloning Pantheon repo'
  git clone $PANTHEON_GIT_REPO -b master accessmatch

  cd accessmatch
  # Check if the branch exists (locally or remotely)
  if git show-ref --verify --quiet "refs/heads/$branch" || git show-ref --verify --quiet "refs/remotes/origin/$branch"; then
    echo "Branch '$branch' exists. Checking it out..."
    git checkout "$branch"
  else
    echo "Branch '$branch' does not exist. Creating and checking it out..."
    git checkout -b "$branch"
  fi
  echo 'Pantheon repo'
  git config --get remote.origin.url

  cd $original_directory
  echo 'Github repo'
  git config --get remote.origin.url
  rm -fR .git
  mv backups/accessmatch/.git .
  echo 'Switched Pantheon repo'
  git branch
  git config --get remote.origin.url

  echo 'Remove some dev files/folders'
  # Remove all .txt files.
  find . -type f -name "*.txt" -delete
  # Remove all .github directories.
  find . -mindepth 1 -type f -name "*.txt" -not -path "*/.github/*" -delete
  rm -fR .devcontainer
  rm -fR .editorconfig
  rm -fR .github
  rm -fR README.md
  rm -fR backups
  rm -fR robo
  rm -fR docroot/.editorconfig
  rm -fR docroot/sites/example.settings.local.php
  rm -fR docroot/sites/example.sites.php
  rm -fR tests
  rm -fR web/themes/contrib/bootstrap5/dist/bootstrap/5.2.3/.github/

  git checkout .gitignore

  echo 'Git status check'
  git status
  echo 'Add new files'
  git add .
  echo 'Commit changes'
  git commit -m "$message"
  echo 'status'
  git status
  echo 'push'
  git push origin $branch
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
  echo '-=-=-=-=-=-=-=- Composer update -=-=-=-=-=-=-=-'
  $robo ciupdate $drupal_update $version --no-interaction --verbose
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

if [ "$runner" = sync ];
then
  storeKey
  terminusApi
  terminus env:clone-content "$site_name".live dev --yes --no-interaction
fi

if [ "$runner" = md_check ];
then
  storeKey
  terminusApi
  branch="${GITHUB_REF#refs/heads/}"
  touch md_check.txt
  vendor/bin/robo pmd:check $branch --no-interaction | grep -o "FALSE\|TRUE" > md_check.txt
fi

if [ "$runner" = md_create ];
then
  storeKey
  terminusApi
  branch="${GITHUB_REF#refs/heads/}"
  vendor/bin/robo pmd:create $branch --no-interaction
fi

if [ "$runner" = md_file_commands ];
then
  storeKey
  terminusApi
  branch="${GITHUB_REF#refs/heads/}"
  commands=$(cat robo/assets/md/$branch)
  echo $commands
  terminus remote:drush accessmatch.$branch -- domain:default $commands
fi
