FROM node:14-alpine

WORKDIR /app

COPY . /app

RUN npm i -g pm2

RUN npm i --production

EXPOSE 5000

USER node

CMD ["pm2-runtime", "npm", "--", "start"]

