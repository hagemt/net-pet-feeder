# https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
ARG BASE_IMAGE=node:14-alpine

FROM ${BASE_IMAGE} AS basis
WORKDIR /src
RUN apk add --no-cache curl libc6-compat
COPY .npmrc package.json yarn.lock ./
RUN yarn install --frozen-lockfile --ignore-platform

FROM ${BASE_IMAGE} AS build
WORKDIR /src
COPY . ./
COPY --from=basis /src/node_modules ./node_modules
RUN yarn build

FROM ${BASE_IMAGE} AS final
WORKDIR /src
ENV NODE_ENV production
RUN addgroup -g 1001 -S nodejs
RUN adduser -u 1001 -S nextjs

COPY --from=build /src/*.js ./
COPY --from=build /src/public ./public
COPY --from=build --chown=nextjs:nodejs /src/.next ./.next
COPY --from=build /src/node_modules ./node_modules
COPY --from=build /src/package.json ./package.json

ARG HTTP_PORT=3003
ENV FEED_DIR /opt/feed
EXPOSE ${HTTP_PORT}
USER nextjs
CMD ["yarn", "start"]
