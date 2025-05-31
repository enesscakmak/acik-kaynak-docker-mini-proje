FROM node:18-alpine

WORKDIR /usr/src/app

COPY src/package*.json ./
RUN npm install


COPY src/ .
COPY src/client ./client


COPY src/ .

EXPOSE 3000
CMD ["npm", "start"]
