FROM node:6.3.0

MAINTAINER cmwd <pwojtkowiak@gmail.com>

# Create app directory
RUN mkdir -p /usr/src/collectors
WORKDIR /usr/src/collectors

# Install app dependencies
COPY package.json /usr/src/collectors/
RUN npm install

# Bundle app source
COPY . /usr/src/collectors

EXPOSE 8000
CMD [ "npm", "start" ]
