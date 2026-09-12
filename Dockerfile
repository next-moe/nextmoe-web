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
EXPOSE 6761

# In the image, not in the compose files: a Dokploy Application builds this
# Dockerfile and never reads a compose file, so a healthcheck defined only there
# leaves that deployment path unmonitored.
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=5 \
  CMD wget -qO /dev/null http://127.0.0.1:6761/ || exit 1
