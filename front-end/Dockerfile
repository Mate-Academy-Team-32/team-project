FROM node:20-alpine

WORKDIR /app/frontend/

COPY front-end/. /app/frontend/
RUN npm install --force

COPY . /app/frontend/

RUN npm run build
CMD ["npm", "start"]
