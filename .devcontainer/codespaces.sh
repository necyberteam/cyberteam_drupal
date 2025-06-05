#! /bin/bash

dir=${PWD}

sleep 30

# Add Lando
echo '>>> Downloading lando from GitHub releases'
curl -fsSL -o lando.deb "https://github.com/lando/lando/releases/latest/download/lando-x64.deb"
sudo dpkg -i lando.deb
rm lando.deb

# Install composer
echo '>>> composer install'
EXPECTED_CHECKSUM="$(php -r 'copy("https://composer.github.io/installer.sig", "php://stdout");')"
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
ACTUAL_CHECKSUM="$(php -r "echo hash_file('sha384', 'composer-setup.php');")"

if [ "$EXPECTED_CHECKSUM" != "$ACTUAL_CHECKSUM" ]
then
    >&2 echo '>>> ERROR: Invalid installer checksum'
    rm composer-setup.php
    exit 1
fi

echo '=-=-=-=-=-=-=-=- composer-setup =-=-=-=-=-='
php composer-setup.php --quiet
echo '>>> mv composer.phar'
sudo mv composer.phar /usr/local/bin/composer
echo '>>> rm composer-setup.php'
rm composer-setup.php

echo '>>> protocols'
composer config --global github-protocols https

if [ -z ${AMP_TERMINUS_EMAIL+x} ];
then
  echo ">>> Terminus variables not set up."
else
  terminus auth:login --email=$AMP_TERMINUS_EMAIL --machine-token=$AMP_TERMINUS_TOKEN
fi

mkdir -p ~/.lando/cache

echo '>>> composer install'
composer install --ignore-platform-reqs -n

vendor/bin/robo landosetup $GITHUB_TOKEN $AMP_UID
