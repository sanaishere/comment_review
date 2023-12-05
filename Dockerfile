
FROM node:14-alpine


WORKDIR /app
COPY  package*.json ./
RUN npm install
COPY . .
EXPOSE 6001
CMD ["npm","run","start"]