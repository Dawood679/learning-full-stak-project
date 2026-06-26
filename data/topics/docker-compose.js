export const dockerComposeContent = {
  slug: "docker-compose",
  briefDescription: [
    "Docker Compose is a tool for defining and running multi-container applications. Instead of running multiple docker run commands with long lists of flags, you define all services in a single docker-compose.yml file and start everything with docker compose up. A Compose file defines services (containers), networks (how containers talk to each other), and volumes (persistent data storage). Each service specifies its image (or build context), ports, environment variables, dependencies (depends_on), and network connections. Compose is perfect for local development where you need a database, backend, and frontend running together.",
    "The docker-compose.yml structure uses YAML format. Services are the main section — each key under services is a container name. The image field uses a Docker Hub image; the build field points to a Dockerfile for custom images. The ports field maps host:container ports (8080:3000 means localhost:8080 maps to container port 3000). The environment field sets env vars. The volumes field mounts host directories into containers. The networks field connects containers on the same network — containers on the same network can reach each other by service name (e.g., the backend can connect to a database service named 'postgres' at hostname 'postgres').",
    "Docker Compose DevOps workflow: docker compose up -d starts all services in detached (background) mode. docker compose logs -f service-name follows logs for one service. docker compose ps shows running services. docker compose exec service-name sh opens a shell inside a running container. docker compose down stops and removes containers. docker compose down -v also removes volumes (data). Override files (docker-compose.override.yml) let you have different settings for development vs production. The --env-file flag loads environment variables from a specific file. Compose handles container startup order with depends_on and health checks.",
  ],
  keyConcepts: [
    "docker compose up: start all services; -d flag runs in background (detached mode)",
    "docker compose down: stop and remove containers; -v also removes volumes",
    "docker compose logs -f service: stream logs from a specific service",
    "docker compose exec service sh: open shell inside running container",
    "services: defines each container — image/build, ports, environment, volumes, depends_on",
    "networks: containers on the same network reach each other by service name",
    "volumes: persist data between container restarts; bind mounts for local development",
    "depends_on: ensures service A starts before service B (but not that A is ready)",
    "healthcheck: poll until a service is truly ready before starting dependents",
    "environment: / env_file: — set environment variables inline or from a file",
    "build: context + dockerfile — build a custom image instead of pulling from registry",
    "docker compose override: docker-compose.override.yml — dev overrides on top of base config",
  ],
  codeExample: {
    language: "yaml",
    title: "docker-compose.yml — Full Stack App with Postgres, Redis, Backend, Frontend",
    code: `# docker-compose.yml
version: '3.9'

services:

  # ── PostgreSQL Database ──
  postgres:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_DB:       devonix_db
      POSTGRES_USER:     devonix
      POSTGRES_PASSWORD: \${POSTGRES_PASSWORD}   # from .env file
    ports:
      - "5432:5432"         # host:container
    volumes:
      - postgres_data:/var/lib/postgresql/data  # named volume — data persists
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U devonix -d devonix_db"]
      interval: 5s
      timeout: 5s
      retries: 5

  # ── Redis Cache ──
  redis:
    image: redis:7-alpine
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes   # enable persistence

  # ── Node.js Backend ──
  backend:
    build:
      context: ./backend        # folder with Dockerfile
      dockerfile: Dockerfile
    restart: unless-stopped
    environment:
      NODE_ENV:     production
      DATABASE_URL: postgresql://devonix:\${POSTGRES_PASSWORD}@postgres:5432/devonix_db
      REDIS_URL:    redis://redis:6379
      JWT_SECRET:   \${JWT_SECRET}
      PORT:         3000
    ports:
      - "3000:3000"
    depends_on:
      postgres:
        condition: service_healthy   # wait for postgres healthcheck to pass
      redis:
        condition: service_started
    volumes:
      - ./backend/uploads:/app/uploads  # bind mount for uploaded files

  # ── Next.js Frontend ──
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    restart: unless-stopped
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:3000
    ports:
      - "3001:3000"
    depends_on:
      - backend

  # ── Nginx Reverse Proxy ──
  nginx:
    image: nginx:alpine
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - backend
      - frontend

networks:
  default:
    name: devonix_network

volumes:
  postgres_data:
  redis_data:

---

# .env (not committed to git)
# POSTGRES_PASSWORD=supersecretpassword
# JWT_SECRET=myverylongrandomsecret

---

# Common commands:
# docker compose up -d                   # start all in background
# docker compose up -d postgres redis    # start specific services
# docker compose logs -f backend         # stream backend logs
# docker compose exec postgres psql -U devonix -d devonix_db  # psql shell
# docker compose exec backend sh        # shell in backend container
# docker compose down                    # stop everything
# docker compose down -v                 # stop + delete volumes (data gone!)
# docker compose ps                      # show status of all services
# docker compose pull                    # pull latest images`,
  },
}
