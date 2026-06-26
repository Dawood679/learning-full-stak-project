export const dockerContent = {
  slug: "docker",
  briefDescription: [
    "Docker solves the 'it works on my machine' problem by packaging your application and ALL its dependencies (Node.js version, npm packages, system libraries, environment variables) into a container — an isolated, portable unit that runs identically on any machine. DevOps is about combining development and operations through automation. Docker is the foundation of modern DevOps: it enables CI/CD pipelines (Continuous Integration / Continuous Delivery) by making builds reproducible and deployments predictable.",
    "A Dockerfile is a text file with instructions that define how to build your Docker image. Key instructions: FROM (base image — e.g., node:20-alpine), WORKDIR (set working directory), COPY (copy files into image), RUN (execute commands during build — install dependencies), EXPOSE (document which port the app uses), CMD (command to run when container starts). A .dockerignore file (like .gitignore but for Docker) excludes files like node_modules, .env, .git from being copied into the image.",
    "Docker Compose orchestrates multi-container applications in a single docker-compose.yml file — define your app (Node.js API), database (PostgreSQL), and cache (Redis) as separate services that start together. Multi-stage builds reduce image size: Stage 1 installs devDependencies and builds the app, Stage 2 starts fresh from a slim base image and copies only the production artifacts — devDependencies are never in the final image. Volumes persist data beyond container lifetime (essential for databases).",
  ],
  keyConcepts: [
    "Docker: package app + all dependencies into a portable container",
    "Container vs image: image is the blueprint (read-only), container is the running instance",
    "Dockerfile: FROM, WORKDIR, COPY, RUN, EXPOSE, CMD, ENTRYPOINT",
    ".dockerignore: exclude node_modules, .env, .git from build context",
    "docker build -t myapp:latest . — build image from Dockerfile",
    "docker run -p 3000:3000 myapp:latest — run container mapping host:container port",
    "docker compose up -d — start all services defined in docker-compose.yml",
    "Multi-stage builds: build in large image, copy artifacts to slim production image",
    "Volumes: named volumes persist data beyond container restarts (use for databases)",
    "Environment variables: -e VAR=value or env_file: .env in docker-compose.yml",
    "Container registries: Docker Hub, AWS ECR, GitHub Container Registry (ghcr.io)",
    "CI/CD pipelines: Continuous Integration (test every commit) + Continuous Delivery (auto deploy)",
  ],
  codeExample: {
    language: "dockerfile",
    title: "Multi-Stage Next.js Dockerfile + Docker Compose with Postgres and Redis",
    code: `# ── Dockerfile (Multi-Stage Build) ───────────────
# Stage 1: Install dependencies (includes devDependencies for build)
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: Build Next.js app
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production image (no devDependencies)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Create non-root user for security
RUN addgroup --system nodejs && adduser --system --ingroup nodejs nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]

# ── .dockerignore ─────────────────────────────────
# node_modules
# .env
# .git
# .next
# README.md

# ── docker-compose.yml ────────────────────────────
# version: '3.9'
# services:
#   app:
#     build: .
#     ports: ["3000:3000"]
#     env_file: .env
#     depends_on:
#       db: { condition: service_healthy }
#       redis: { condition: service_started }
#
#   db:
#     image: postgres:16-alpine
#     environment:
#       POSTGRES_DB: devonix
#       POSTGRES_USER: postgres
#       POSTGRES_PASSWORD: secret
#     volumes: [pgdata:/var/lib/postgresql/data]
#     healthcheck:
#       test: ["CMD-SHELL", "pg_isready -U postgres"]
#       interval: 5s
#       timeout: 5s
#       retries: 5
#
#   redis:
#     image: redis:7-alpine
#     volumes: [redisdata:/data]
#
# volumes:
#   pgdata:
#   redisdata:

// Usage commands:
// docker build -t devonix:latest .
// docker compose up -d           (start all services in background)
// docker compose logs -f app     (stream logs)
// docker compose down            (stop all services)
// docker compose down -v         (stop and delete volumes)`,
  },
}
