# syntax=docker/dockerfile:1

# Node 24 is current LTS; Next 16 needs >= 20.9. alpine, not slim — this
# app's native pieces (SWC, Tailwind's Lightning CSS/oxide, sharp) ship
# musl builds; verified building and running on alpine with no
# libc6-compat needed (re-checked against this app directly, not assumed).
ARG NODE_IMAGE=node:24-alpine

# ---- deps: install dependencies (cached until the lockfile changes) ----
FROM ${NODE_IMAGE} AS deps
# npm install, not Corepack: Corepack older than 0.36 cannot launch pnpm
# 12 (it looks for the removed bin/pnpm.cjs). Keep this version in sync
# with package.json's "packageManager".
RUN npm install -g pnpm@12.11.2
WORKDIR /app
# pnpm-workspace.yaml is required here too: it holds allowBuilds, and
# pnpm refuses a dependency's install script (sharp, @swc/core, etc.)
# that isn't explicitly allowed there.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Store outside the app and delete in the same RUN, so this layer holds
# node_modules only — not node_modules plus a second copy of every
# package sitting in pnpm's own content-addressable store.
RUN HUSKY=0 pnpm install --frozen-lockfile --store-dir /tmp/pnpm-store \
    && rm -rf /tmp/pnpm-store

# ---- build: compile the site ----
FROM deps AS build
COPY . .

# Every one of these is read by src/lib/env.ts (@t3-oss/env-nextjs) the
# moment `next build` first imports it during prerendering, which
# validates the *entire* schema eagerly — so even the server-only secrets
# below need some syntactically-valid value here or the build itself
# fails a Zod check. That's different from needing the real secret at
# build time: RESEND_API_KEY/INQUIRY_*_EMAIL are read again, fresh from
# the running container's real environment, every time a Server Action
# handles a real request — pass the *real* values with `docker run -e` /
# an env file at deploy time, never bake them in here.
#
# NEXT_PUBLIC_* is the opposite case: Next.js inlines these into the
# static client bundle at build time, so these specific ARGs must already
# be the real, final values — a runtime -e override later does not change
# already-built HTML/JS. Keep the runner stage's own ENV defaults (below)
# in sync with whatever you pass here, so server-rendered output doesn't
# disagree with the client bundle.
#
# docker build's own linter flags RESEND_API_KEY by name pattern
# ("SecretsUsedInArgOrEnv") — expected and safe here specifically because
# the default is a placeholder, never a real key, per the paragraph above.
# Don't rename the ARG to silence it — it has to match env.ts's actual
# variable name.
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_WHATSAPP_NUMBER
ARG NEXT_PUBLIC_GA_ID
ARG NEXT_PUBLIC_CONTENT_MODE=live
ARG RESEND_API_KEY=build-placeholder
ARG INQUIRY_TO_EMAIL=build-placeholder@example.com
ARG INQUIRY_FROM_EMAIL=build-placeholder@example.com
# NEXT_OUTPUT=standalone switches next.config.ts's `output` to
# "standalone" for this build only — a local `pnpm build` outside Docker
# isn't affected.
ENV NEXT_OUTPUT=standalone \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_WHATSAPP_NUMBER=$NEXT_PUBLIC_WHATSAPP_NUMBER \
    NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID \
    NEXT_PUBLIC_CONTENT_MODE=$NEXT_PUBLIC_CONTENT_MODE \
    RESEND_API_KEY=$RESEND_API_KEY \
    INQUIRY_TO_EMAIL=$INQUIRY_TO_EMAIL \
    INQUIRY_FROM_EMAIL=$INQUIRY_FROM_EMAIL \
    NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# ---- runner: the only stage that ships ----
# Fresh base: no pnpm, no devDependencies, no source, no build tooling.
FROM ${NODE_IMAGE} AS runner
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3060 \
    HOSTNAME=0.0.0.0 \
    NEXT_PUBLIC_CONTENT_MODE=live
WORKDIR /app
# Reuses the base image's own unprivileged "node" user/group instead of
# creating a new one — same effect, one fewer layer. It needs to own
# /app/.next so the image optimizer can write .next/cache/images.
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
USER node
# Coolify reads this and routes to it — keep in sync with PORT above.
EXPOSE 3060
# Coolify uses an image HEALTHCHECK instead of its dashboard one
# ("Running (no healthcheck)" otherwise) and waits for it before
# replacing the old container on redeploy. busybox wget ships with
# alpine, no curl needed. 127.0.0.1, not localhost: the server binds
# IPv4 0.0.0.0 only.
HEALTHCHECK --interval=30s --timeout=3s --start-period=15s --retries=3 \
    CMD wget -q --spider "http://127.0.0.1:${PORT}/" || exit 1
# `node` as PID 1, not `pnpm start`: one process instead of three, and
# SIGTERM from `docker stop` / a Coolify redeploy reaches Next directly
# for a clean shutdown.
CMD ["node", "server.js"]
