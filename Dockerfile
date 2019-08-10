FROM node:8.15-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install
 
EXPOSE 5432

CMD ["npm", "run", "startpg"]
