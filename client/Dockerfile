FROM node:12-slim

WORKDIR /usr/src/app


RUN npm install -g serve

COPY ./build ./


EXPOSE 5000

CMD ["serve", "-s", "./build"]
