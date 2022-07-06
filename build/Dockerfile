FROM node:16-alpine as base_image

# USED FOR 1PASSWORD INTEGRATION
RUN apk add --no-cache curl

WORKDIR /app

COPY ./app/package*.json /app/
RUN npm install

COPY ./app /app

COPY ./entrypoint.sh /entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]
CMD [ "" ]
