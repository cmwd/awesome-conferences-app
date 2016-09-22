FROM node:6.3.0

MAINTAINER cmwd <pwojtkowiak@gmail.com>

RUN useradd --user-group --create-home --shell /bin/false web

ENV HOME=/home/web

COPY package.json npm-shrinkwrap.json $HOME/app/
RUN chown -R web:web $HOME/*

USER web

WORKDIR $HOME/app
RUN npm install

USER root
COPY . $HOME/app
RUN chown -R web:web $HOME/*
USER web

CMD ["npm", "start"]
