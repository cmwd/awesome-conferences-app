FROM node:6.6.0-wheezy

MAINTAINER cmwd <pwojtkowiak@gmail.com>

RUN mkdir -p /var/www/collectors

COPY . /var/www/collectors
WORKDIR /var/www/collectors

RUN npm install --production

CMD ["npm", "start"]
