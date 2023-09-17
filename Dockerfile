FROM node:18.16.1-bullseye

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -D typescript

RUN npm run build

EXPOSE 3000

ENV NODE_ENV=production

ENV MONGODB_USER=
ENV MONGODB_PASSWORD=
ENV MONGODB_URL=

ENV OPENFOODS_FILES_URL=
ENV OPENFOODS_DOWNLOAD_URL=
ENV DOWNLOAD_LOCATION=

ENV REDIS_URL=
ENV REDIS_PASSWORD=

ENV SYNC_INTERVAL="0 0 * * *"

CMD ["npm", "start"]

