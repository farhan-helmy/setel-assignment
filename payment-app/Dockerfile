FROM node:16
WORKDIR /app
COPY package.json /app
RUN yarn install
COPY . /app
CMD yarn start:dev
EXPOSE 5000