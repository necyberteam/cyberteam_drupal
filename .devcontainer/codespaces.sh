#! /bin/bash

dir=${PWD}

# Install composer
EXPECTED_CHECKSUM="$(php -r 'copy("https://composer.github.io/installer.sig", "php://stdout");')"
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
ACTUAL_CHECKSUM="$(php -r "echo hash_file('sha384', 'composer-setup.php');")"

if [ "$EXPECTED_CHECKSUM" != "$ACTUAL_CHECKSUM" ]
then
    >&2 echo 'ERROR: Invalid installer checksum'
    rm composer-setup.php
    exit 1
fi

php composer-setup.php --quiet
sudo mv composer.phar /usr/local/bin/composer
rm composer-setup.php

composer config --global github-protocols https
lando composer config --global github-protocols https

if [ -z ${AMP_TERMINUS_EMAIL+x} ];
then
  echo "Terminus variables not set up."
else
  terminus auth:login --email=$AMP_TERMINUS_EMAIL --machine-token=$AMP_TERMINUS_TOKEN
fi

mkdir -p ~/.lando/cache
composer install --ignore-platform-reqs -n
blt blt:telemetry:disable --no-interaction
lando blt blt:telemetry:disable --no-interaction
blt amp:landosetup $GITHUB_TOKEN $AMP_UID
