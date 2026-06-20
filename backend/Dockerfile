FROM node:20-alpine

WORKDIR /app

ENV PORT=8000
ENV MONGO_URI=mongodb://mongodb:27017/urlShortner

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "node", "src/index.js" ]
