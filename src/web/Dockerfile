FROM node:6.6.0-wheezy

MAINTAINER cmwd <pwojtkowiak@gmail.com>

RUN mkdir -p /var/www/web && \
  curl -o- -L https://yarnpkg.com/install.sh | bash

COPY . /var/www/web
WORKDIR /var/www/web

RUN $HOME/.yarn/bin/yarn install

CMD ["npm", "start"]
