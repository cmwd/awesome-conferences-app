FROM node:6.6.0-wheezy

MAINTAINER cmwd <pwojtkowiak@gmail.com>

RUN mkdir -p /var/www/api && \
  curl -o- -L https://yarnpkg.com/install.sh | bash

ADD package.json yarn.lock /tmp/
RUN cd /tmp && $HOME/.yarn/bin/yarn --pure-lockfile && \
  mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

WORKDIR /opt/app
ADD . /opt/app

EXPOSE 8002

CMD ["npm", "start"]
