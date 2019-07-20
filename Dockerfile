FROM node:8.16.0

RUN apt-get update && apt-get install -y mysql-client && rm -rf /var/lib/apt

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install
 
EXPOSE 5000

CMD npm run database && \
    npm run seed && \
    npm run react-dev && \
    npm start