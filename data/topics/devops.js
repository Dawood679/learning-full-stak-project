export const devopsContent = {
  slug: "devops",
  briefDescription: [
    "DevOps is a cultural and technical movement that unifies software development (Dev) and IT operations (Ops). The goal is to shorten the development lifecycle while delivering high-quality software continuously through automation, collaboration, and monitoring.",
    "Key DevOps practices: Continuous Integration (CI) — automatically test every commit; Continuous Delivery (CD) — every passing build is deployable; Infrastructure as Code (IaC) — manage infrastructure via Terraform/CloudFormation; observability — logs, metrics, and traces.",
    "The DevOps toolchain spans source control (Git), CI/CD (GitHub Actions, Jenkins, GitLab CI), containerization (Docker), orchestration (Kubernetes), IaC (Terraform), monitoring (Prometheus + Grafana), logging (ELK stack), and alerting (PagerDuty).",
  ],
  keyConcepts: [
    "CI/CD pipelines: build → test → stage → deploy",
    "Infrastructure as Code: Terraform, CloudFormation, Pulumi",
    "GitOps: Git as the single source of truth for deployments",
    "Observability: logs (structured JSON), metrics, distributed traces",
    "Prometheus + Grafana for metrics and dashboards",
    "12-Factor App methodology",
    "Blue/Green and Canary deployments",
    "SLIs, SLOs, SLAs and error budgets",
  ],
  codeExample: {
    language: "yaml",
    title: "GitHub Actions CI/CD Pipeline",
    code: `# .github/workflows/deploy.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with: { node-version: '20', cache: 'npm' }
    - run: npm ci
    - run: npm run lint
    - run: npm test -- --coverage
    - uses: codecov/codecov-action@v3

  build-and-push:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Build & push Docker image
      uses: docker/build-push-action@v5
      with:
        push: true
        tags: ghcr.io/\${{ github.repository }}:\${{ github.sha }}

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    steps:
    - name: Deploy to Kubernetes
      uses: azure/k8s-deploy@v4
      with:
        namespace: production
        images: ghcr.io/\${{ github.repository }}:\${{ github.sha }}
        manifests: k8s/`,
  },
}
