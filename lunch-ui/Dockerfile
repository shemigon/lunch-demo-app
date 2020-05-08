FROM node:alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install install --silent
RUN npm install react-scripts -g --silent

COPY . ./

EXPOSE 3000

CMD npm start