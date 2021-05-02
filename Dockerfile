FROM node:alpine

WORKDIR '/usr/src/app'

COPY package.json .
RUN yarn
RUN yarn add pm2 -g

COPY tsconfig.json ./
COPY ./src ./src

RUN yarn build

USER node

CMD ["pm2-runtime", "start", "dist/index.js"]
