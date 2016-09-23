FROM node:6.6.0-wheezy

MAINTAINER cmwd <pwojtkowiak@gmail.com>

RUN mkdir -p /var/www/api

COPY . /var/www/api
WORKDIR /var/www/api

RUN npm install --production

CMD ["npm", "start"]
