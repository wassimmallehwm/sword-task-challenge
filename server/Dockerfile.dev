FROM node:18-alpine
WORKDIR /app
COPY package*.json .
RUN npm i
RUN npm i -D nodemon
COPY . .
EXPOSE 4000
CMD [ "npm", "run", "dev"]