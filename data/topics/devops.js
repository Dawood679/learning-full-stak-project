export const devopsContent = {
  slug: "devops",
  briefDescription: [
    "DevOps is a culture and set of practices that unites software development (Dev) and IT operations (Ops) to deliver software faster and more reliably. The core idea: instead of developers writing code and then 'throwing it over the wall' to operations to deploy, both teams collaborate throughout the entire lifecycle — from writing code to monitoring it in production. Key DevOps practices: Continuous Integration (CI), Continuous Delivery (CD), Infrastructure as Code (IaC), automated testing, and observability.",
    "CI/CD (Continuous Integration / Continuous Delivery) is the backbone of DevOps. Continuous Integration: every time code is pushed to GitHub, an automated pipeline runs tests, linting, and a build — catching bugs within minutes. Continuous Delivery: every successful build is automatically deployed to staging, and with approval, to production. This replaces manual, error-prone deployments. Popular CI/CD tools: GitHub Actions (free for open source), Jenkins (self-hosted), GitLab CI, and CircleCI. A typical pipeline: code push → test → build Docker image → push to registry → deploy to Kubernetes.",
    "Microservices architecture structures an application as a collection of small, independently deployable services — each with a single responsibility, its own database, and its own deployment cycle. Communication between microservices: REST APIs (synchronous, simple) or message brokers like Redis Pub/Sub or RabbitMQ (asynchronous, decoupled). Challenges: service discovery, distributed tracing, network latency, and eventual consistency. Observability is essential for production: Logs (what happened — structured JSON), Metrics (how the system performs — Prometheus/Grafana), and Traces (distributed request flow across services — Jaeger/OpenTelemetry).",
  ],
  keyConcepts: [
    "DevOps culture: Dev + Ops collaboration — shared responsibility for software lifecycle",
    "CI: automated test + build on every code push — fast feedback, no 'it worked yesterday'",
    "CD: automated deployment pipeline — code merged → tested → deployed to production",
    "Typical CI/CD pipeline: commit → lint → test → build Docker image → push → deploy",
    "GitHub Actions / Jenkins / GitLab CI: tools to automate CI/CD pipelines",
    "Microservices: small independent services with single responsibility and own DB",
    "Monolithic vs Microservices: monolith is simpler, microservices scale better",
    "Service communication: REST (sync, simple) or message broker (async, decoupled)",
    "API Gateway: single entry point — routes to microservices, handles auth + rate limiting",
    "Observability: Logs (what happened) + Metrics (performance) + Traces (request flow)",
    "Prometheus + Grafana: metrics collection and dashboards for production monitoring",
    "Blue/Green deployment: switch traffic from old (blue) to new (green) with zero downtime",
  ],
  codeExample: {
    language: "yaml",
    title: "GitHub Actions CI/CD Pipeline for Node.js + Docker + Kubernetes",
    code: `# .github/workflows/deploy.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}

jobs:
  # ── Job 1: Test ───────────────────────────────
  test:
    name: Test & Lint
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4

    - uses: actions/setup-node@v4
      with: { node-version: '20', cache: 'npm' }

    - run: npm ci
    - run: npm run lint
    - run: npm test -- --coverage --ci

    - name: Upload coverage
      uses: codecov/codecov-action@v3

  # ── Job 2: Build & Push Docker Image ─────────
  build:
    name: Build Docker Image
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'  # only on main branch

    steps:
    - uses: actions/checkout@v4

    - name: Log in to GitHub Container Registry
      uses: docker/login-action@v3
      with:
        registry: \${{ env.REGISTRY }}
        username: \${{ github.actor }}
        password: \${{ secrets.GITHUB_TOKEN }}

    - name: Build and push Docker image
      uses: docker/build-push-action@v5
      with:
        context: .
        push: true
        tags: |
          \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:latest
          \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:\${{ github.sha }}

  # ── Job 3: Deploy to Kubernetes ───────────────
  deploy:
    name: Deploy to Production
    needs: build
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v4

    - name: Set up kubectl
      uses: azure/setup-kubectl@v3

    - name: Configure kubeconfig
      run: echo "\${{ secrets.KUBE_CONFIG }}" | base64 -d > ~/.kube/config

    - name: Update deployment image
      run: |
        kubectl set image deployment/devonix-api \\
          api=\${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:\${{ github.sha }} \\
          -n production
        kubectl rollout status deployment/devonix-api -n production`,
  },
}
