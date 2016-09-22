FROM node:6.3.0

MAINTAINER cmwd <pwojtkowiak@gmail.com>

RUN useradd --user-group --create-home --shell /bin/false api

ENV HOME=/home/api

COPY package.json npm-shrinkwrap.json $HOME/app/
RUN chown -R api:api $HOME/*

USER api

WORKDIR $HOME/app
RUN npm install

USER root
COPY . $HOME/app
RUN chown -R api:api $HOME/*
USER api

CMD ["npm", "start"]
