FROM node:hydrogen-alpine3.17

COPY package*.json ./

RUN npm ci

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
# Tell docker that all future commands should run as the appuser user
USER appuser

COPY . .

CMD npm run start
