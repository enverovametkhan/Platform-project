
FROM node:16.18.0 as react-build

WORKDIR /app

ARG REACT_APP_BASE_URL=default

ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL

ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json /app/

COPY ./package-lock.json /app/

COPY ./nginx/default.conf /app/

RUN npm install

COPY . /app/

RUN npm run build

FROM nginx:latest

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=react-build /app/build /usr/share/nginx/html


EXPOSE 3000






