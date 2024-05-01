FROM node:lts-alpine3.18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4010
CMD ["node", "statistic.js"]
