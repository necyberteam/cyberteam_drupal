# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.209.6/containers/debian/.devcontainer/base.Dockerfile

# [Choice] Debian version (use bullseye or stretch on local arm64/Apple Silicon): bullseye, buster, stretch
ARG VARIANT="bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/base:0-${VARIANT}

# ** [Optional] Uncomment this section to install additional packages. **
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt install apt-transport-https lsb-release ca-certificates wget -y \
    && wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg \
    && sh -c 'echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list' \
    && sudo apt update \
    && apt -y install --no-install-recommends \
    php8.1 php8.1-fpm php8.1-common php8.1-mysql php8.1-zip php8.1-gd php8.1-mbstring php8.1-curl php8.1-xml php8.1-bcmath \
    python3-dev python3-pip python3-setuptools
RUN wget -O /usr/local/bin/blt https://github.com/acquia/blt-launcher/releases/latest/download/blt.phar && chmod 755 /usr/local/bin/blt
# Install composer and terminus
RUN mkdir -p ~/terminus && cd ~/terminus
RUN curl -L https://github.com/pantheon-systems/terminus/releases/download/3.1.0/terminus.phar --output terminus
RUN chmod +x terminus
RUN ./terminus self:update
RUN mv terminus /usr/local/bin/terminus && chmod 755 /usr/local/bin/terminus
