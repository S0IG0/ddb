FROM node:18.17.0-alpine3.17

WORKDIR /frontend
COPY package.json /frontend

RUN npm install

CMD ["npm", "run", "dev"]