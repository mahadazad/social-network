FROM node:9

ENV NODE_ENV production

WORKDIR /app

COPY package-lock.json .
COPY package.json .

RUN npm install

COPY dist .

USER node

CMD node server.js
