FROM node:6.3.0

MAINTAINER cmwd <pwojtkowiak@gmail.com>

# Create app directory
RUN mkdir -p /usr/src/web
WORKDIR /usr/src/web

# Bundle app source
COPY . /usr/src/web
RUN npm install --production

EXPOSE 8000
CMD [ "npm", "start" ]
