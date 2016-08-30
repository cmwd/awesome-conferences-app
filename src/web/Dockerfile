FROM node:6.3.0

MAINTAINER cmwd <pwojtkowiak@gmail.com>

# Create app directory
RUN mkdir -p /usr/src/web
WORKDIR /usr/src/web

# Install app dependencies
COPY package.json /usr/src/web/
RUN npm install

# Bundle app source
COPY . /usr/src/web

EXPOSE 8000
CMD [ "npm", "start" ]
