#! /bin/bash

dir=${PWD}

sleep 30

# Add DDEV
echo '>>> Installing DDEV...'
curl -fsSL https://apt.fury.io/drud/gpg.key | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/ddev.gpg > /dev/null
echo "deb [signed-by=/etc/apt/trusted.gpg.d/ddev.gpg] https://apt.fury.io/drud/ * *" | sudo tee /etc/apt/sources.list.d/ddev.list
sudo apt-get update && sudo apt-get install -y ddev
ddev config global --instrumentation-opt-in=false

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

echo '>>> composer install'
composer install --ignore-platform-reqs -n

vendor/bin/robo ddevsetup $GITHUB_TOKEN $AMP_UID
