FROM node:16.18.0

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json /app/

COPY ./package-lock.json /app/


RUN npm install

COPY . /app/

EXPOSE 4000

CMD ["npm", "test"]
