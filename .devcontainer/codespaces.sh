#! /bin/bash

dir=${PWD}

php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === 'e21205b207c3ff031906575712edab6f13eb0b361f2085f1f1237b7126d785e826a450292b6cfd1d64d92e6563bbde02') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"
sudo mv composer.phar /usr/local/bin/composer
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
