FROM node:12-slim

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 3001

CMD ["npm", "run", "start"]
