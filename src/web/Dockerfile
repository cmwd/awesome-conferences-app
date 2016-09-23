FROM node:6.6.0-wheezy

MAINTAINER cmwd <pwojtkowiak@gmail.com>

RUN mkdir -p /var/www/web

COPY . /var/www/web
WORKDIR /var/www/web

RUN npm install --production

CMD ["npm", "start"]
