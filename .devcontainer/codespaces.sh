#! /bin/bash

dir=${PWD}

# Install Lando maybe
curl -fsSL -o /usr/local/bin/lando "https://files.lando.dev/cli/lando-linux-x64-v3.11.0"
chmod +x /usr/local/bin/lando


php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === '55ce33d7678c5a611085589f1f3ddf8b3c52d662cd01d4ba75c0ee0459970c2200a51f492d557530c71c15d8dba01eae') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
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
