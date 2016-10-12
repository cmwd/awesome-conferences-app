FROM node:6.6.0-wheezy

MAINTAINER cmwd <pwojtkowiak@gmail.com>

RUN mkdir -p /var/www/collectors && \
  curl -o- -L https://yarnpkg.com/install.sh | bash

COPY . /var/www/collectors
WORKDIR /var/www/collectors

RUN $HOME/.yarn/bin/yarn install

CMD ["npm", "start"]
