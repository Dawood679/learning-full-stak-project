export const dockerContent = {
  slug: "docker",
  briefDescription: [
    "Docker is a containerization platform that packages applications with their dependencies into isolated, portable containers. Containers share the host OS kernel but run in isolated user spaces — lighter than VMs, faster to start, and consistent across environments.",
    "A Dockerfile defines the image build process: base image, working directory, dependency installation, file copying, and startup command. Docker Compose orchestrates multi-container apps — defining services, networks, and volumes in a single YAML file.",
    "Docker's layered filesystem caches each instruction in a Dockerfile. Understanding layer ordering (put rarely-changing steps first) dramatically speeds up builds. Multi-stage builds reduce final image size by separating build-time from runtime dependencies.",
  ],
  keyConcepts: [
    "Dockerfile: FROM, WORKDIR, COPY, RUN, EXPOSE, CMD, ENTRYPOINT",
    "docker build, docker run, docker push, docker pull",
    "Image layers and build cache optimization",
    "Multi-stage builds for small production images",
    "Docker Compose: services, networks, volumes, depends_on",
    "Volumes: named volumes vs bind mounts",
    ".dockerignore to exclude unnecessary files",
    "Container registries: Docker Hub, AWS ECR, GitHub Registry",
  ],
  codeExample: {
    language: "dockerfile",
    title: "Multi-Stage Next.js Dockerfile + Compose",
    code: `# Dockerfile — Multi-stage for Next.js
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]

# docker-compose.yml
version: '3.9'
services:
  app:
    build: .
    ports: ["3000:3000"]
    env_file: .env.local
    depends_on: [db, redis]
  db:
    image: postgres:16-alpine
    environment: { POSTGRES_DB: myapp, POSTGRES_PASSWORD: secret }
    volumes: [pgdata:/var/lib/postgresql/data]
  redis:
    image: redis:7-alpine
volumes:
  pgdata:`,
  },
}
