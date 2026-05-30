FROM node:20-alpine AS base
WORKDIR /app

# ── Stage 1: install dependencies ──────────────────────────────────────────
FROM base AS deps

# Copy manifests only (for better layer caching)
COPY package.json package-lock.json* ./

# Clean install — needs package-lock.json; installs ALL deps (dev + prod)
# so that Next.js CLI is available in the builder stage
RUN npm ci


# ── Stage 2: build the Next.js app ─────────────────────────────────────────
FROM base AS builder

# Bring in node_modules from deps stage using absolute path
COPY --from=deps /app/node_modules ./node_modules

# Copy full source code
COPY . .

# Generate Prisma client then build
# RUN apt update && apt install -y openssl-1.1x
RUN npx prisma generate
RUN npm run build


# ── Stage 3: minimal production runner ─────────────────────────────────────
FROM gcr.io/distroless/nodejs20-debian12 AS runner

ENV NODE_ENV=production


# Only copy what's needed to run the app
COPY --from=builder /app/.next          ./.next
COPY --from=builder /app/public         ./public
COPY --from=builder /app/package.json   ./package.json
COPY --from=builder /app/node_modules   ./node_modules
# COPY --from=builder /app/prisma         ./prisma

EXPOSE 3000

CMD ["node_modules/next/dist/bin/next", "start"]
