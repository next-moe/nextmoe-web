ARG NODE_VERSION=24

FROM node:${NODE_VERSION}-trixie-slim AS build
RUN corepack enable
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .
RUN pnpm generate

FROM nginx:alpine AS run
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/nextmoe.conf
COPY --from=build /app/.output/public /usr/share/nginx/html
EXPOSE 80
