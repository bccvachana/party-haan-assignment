FROM node:12-alpine
WORKDIR /app
CMD yarn install && yarn dev
