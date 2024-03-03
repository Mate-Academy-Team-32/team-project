FROM node:16-alpine

WORKDIR /app/frontend/

COPY front-end/. /app/frontend/
RUN npm install --force

COPY . /app/frontend/

CMD ["npm", "start"]
