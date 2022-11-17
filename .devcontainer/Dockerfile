# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.209.6/containers/debian/.devcontainer/base.Dockerfile

# [Choice] Debian version (use bullseye or stretch on local arm64/Apple Silicon): bullseye, buster, stretch
ARG VARIANT="bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/base:0-${VARIANT}

# ** [Optional] Uncomment this section to install additional packages. **
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    php php-cli php-fpm php-json php-common php-mysql php-zip php-gd php-mbstring php-curl php-xml php-pear php-bcmath \
    python3-dev python3-pip python3-setuptools
RUN wget -O /usr/local/bin/blt https://github.com/acquia/blt-launcher/releases/latest/download/blt.phar && chmod 755 /usr/local/bin/blt