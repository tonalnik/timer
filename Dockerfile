ARG ALPINE_VERSION=3.18

FROM node:21-alpine${ALPINE_VERSION} as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build
CMD ["npm", "run", "start"]