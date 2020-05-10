FROM mhart/alpine-node:8 AS node_modules
WORKDIR /app

COPY package.json package-lock.json ./
RUN apk add --no-cache make gcc g++ python
RUN npm ci --prod

FROM mhart/alpine-node:slim-8
WORKDIR /app

COPY --from=node_modules /app .
COPY src ./src
CMD ["node", "src/index.js"]
