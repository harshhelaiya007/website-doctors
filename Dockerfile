From node:14.18.0-alpine3.14

RUN mkdir /app
WORKDIR /home/app/
VOLUME /app/public

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent 

COPY . ./

EXPOSE 80

CMD ["npm", "run", "server"]