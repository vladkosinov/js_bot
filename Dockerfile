# node_modules
FROM mhart/alpine-node:8 AS node_modules
RUN apk add --no-cache make gcc g++ python

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --prod

# Prod
FROM mhart/alpine-node:slim-8

WORKDIR /app

COPY --from=node_modules /app .
COPY src ./src

CMD ["node", "src/index.js"]
