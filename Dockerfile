FROM node:14.17.3

WORKDIR /

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
