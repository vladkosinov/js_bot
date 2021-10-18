# node_modules
FROM mhart/alpine-node:16.4.2 AS node_modules
RUN apk add --no-cache make gcc g++ python

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --prod

# Prod
FROM mhart/alpine-node:slim-14.16.0

WORKDIR /app

COPY --from=node_modules /app .
COPY src ./src

CMD ["node", "src/index.js"]
