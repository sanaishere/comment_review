
FROM node:14-alpine


WORKDIR /app
COPY  package*.json ./
RUN npm install
COPY . .
EXPOSE 6002
CMD ["npm","run","start"]