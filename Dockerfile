FROM node

WORKDIR /usr/src

COPY . .

RUN npm install

EXPOSE 3000

