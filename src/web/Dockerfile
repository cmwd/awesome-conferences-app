FROM node:6.3.0

MAINTAINER cmwd <pwojtkowiak@gmail.com>

ENV HOME=/home/web

COPY . $HOME/app
WORKDIR $HOME/app
RUN npm install

CMD ["npm", "start"]
