FROM node:6.3.0

MAINTAINER cmwd <pwojtkowiak@gmail.com>

# Create app directory
RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api

# Install app dependencies
COPY package.json /usr/src/api/
RUN npm install --production

# Bundle app source
COPY . /usr/src/api

EXPOSE 8002
CMD [ "npm", "start" ]
