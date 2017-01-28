FROM node:7.4.0-wheezy

MAINTAINER cmwd <pwojtkowiak@gmail.com>

RUN mkdir -p /var/www/editor && \
  curl -o- -L https://yarnpkg.com/install.sh | bash
COPY . /var/www/editor
WORKDIR /var/www/editor

RUN $HOME/.yarn/bin/yarn --pure-lockfile

CMD npm run build

