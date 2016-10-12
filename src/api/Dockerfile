FROM node:6.6.0-wheezy

MAINTAINER cmwd <pwojtkowiak@gmail.com>

RUN mkdir -p /var/www/api && \
  curl -o- -L https://yarnpkg.com/install.sh | bash
COPY . /var/www/api
WORKDIR /var/www/api

RUN $HOME/.yarn/bin/yarn install

CMD ["npm", "start"]
