FROM node:16-alpine3.11

COPY package*.json ./

RUN npm ci

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
# Tell docker that all future commands should run as the appuser user
USER appuser

COPY . .

CMD npm run start
