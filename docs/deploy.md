# Deploying nextmoe-web

## What ships

One image, two stages: a Node stage runs `pnpm generate` and the prerendered
`.output/public` is copied into `nginx:alpine`, which listens on **80**.

The result is a finished static site. There is no server runtime, no database and
**no runtime configuration** — every domain, canonical and sitemap URL is baked in
at build time from `shared/constants/site.ts`. The container takes no environment
variables, so unlike the member sites there is nothing to set in the Dokploy
panel, and no `docker/*.env` to copy.

## DNS

Point **both** `www.nextmoe.com` and `nextmoe.com` at the app. The apex → www 301
is served by nginx inside the container (`nginx.conf`), not by the proxy, so the
apex has to actually reach it. Dokploy terminates TLS and forwards plain HTTP to
port 80.

## Option A — Dokploy Compose + the GHCR image (what CI is wired for)

`.github/workflows/build.yml` runs on every push to `main`:

1. `gates` — typecheck, `gate:i18n`, `gate:icon`, `generate`, `gate:build`.
   Pushes to `main` do not run CI separately; this job is the check, so a red
   commit never reaches the registry. CI runs on pull requests.
2. `build` — pushes `ghcr.io/next-moe/nextmoe-web:latest` and `:<sha>`.
3. `deploy` — `POST`s the Dokploy redeploy webhook, if one is configured.

Set up:

- Dokploy → new **Compose** application → this repository, compose file
  `docker-compose.prod.yml`.
- Add both domains, container port **80**.
- Copy the app's redeploy webhook into the repository secret
  **`DOKPLOY_WEBHOOK_NEXTMOE_WEB`**. Without it the image still publishes; only
  the automatic pull is skipped.

The compose service is named `nextmoe-web`, not `web`, on purpose: Dokploy
registers the **service name** on the shared `dokploy-network`, so a generic name
collides with every other app that has one.

Roll back by pinning `image:` to a `:<sha>` tag and redeploying.

## Option B — Dokploy Application building the Dockerfile

Simpler, no registry, no CI secret: point a Dokploy **Application** at this
repository, build type Dockerfile, container port 80. Dokploy builds on the
server on every push.

The cost is that the Nuxt build then runs on the VPS — it wants roughly a
gigabyte of RAM and a minute or two of CPU that the box is otherwise serving
with. Option A moves that to a GitHub runner. Both produce the same image.

## Verifying locally

```bash
docker compose up -d --build          # http://localhost:15020
curl -sI localhost:15020/ | head -1
curl -s localhost:15020/sitemap.xml | head -5
curl -sI -H 'Host: nextmoe.com' localhost:15020/terms | rg -i 'HTTP|location'
curl -sI localhost:15020/nope | head -1          # 404
docker compose down
```

The six canonical routes must answer 200 directly, an unknown path under `/en/`
must return the **English** 404, and `Host: nextmoe.com` must 301 to
`https://www.nextmoe.com` preserving the path.

## Headers

`nginx.conf` sends `X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy` and a `Permissions-Policy`, plus a `Cache-Control` chosen by
the `$nextmoe_cache` map: immutable for `/_nuxt/`, 30 days for images, an hour
for `robots.txt` and `sitemap.xml`, `no-cache` for HTML.

HSTS is deliberately **not** set here. It belongs at the TLS terminator, and a
`max-age` a browser has already cached cannot be withdrawn for its full duration
— turn it on in Dokploy/Traefik once the certificate setup is settled.
