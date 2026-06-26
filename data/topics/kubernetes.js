export const kubernetesContent = {
  slug: "kubernetes",
  briefDescription: [
    "Kubernetes (K8s) is the industry-standard container orchestration platform. It automates deploying, scaling, and managing Docker containers across a cluster of machines. The key problem it solves: when you have dozens of Docker containers running your microservices, manually managing where they run, restarting failed ones, scaling under load, and rolling out updates becomes impossible. Kubernetes abstracts the underlying machines as a 'cluster' — you tell it what you want (desired state) and it figures out how to achieve it.",
    "Core Kubernetes objects: Pod (smallest deployable unit — one or more containers sharing network + storage), Deployment (manages a set of identical Pods — ensures N replicas running, handles rolling updates), Service (stable DNS name + IP for a set of Pods — load balances traffic even as Pods restart), ConfigMap (non-sensitive configuration data), Secret (sensitive data like passwords and API keys), and Ingress (HTTP/HTTPS routing rules — routes traffic from outside the cluster to Services based on hostname or path).",
    "Microservices architecture means splitting a large monolithic application into small, independent services that each do one thing. Each microservice has its own codebase, database, and deployment. They communicate via REST APIs (synchronous) or message brokers like Redis Pub/Sub or RabbitMQ (asynchronous). An API Gateway (built with Express.js) serves as the single entry point — routing requests to the right microservice, handling authentication, and rate limiting. Kubernetes manages all these microservices: auto-restarts failed services, scales individual ones under load, and deploys updates with zero downtime.",
  ],
  keyConcepts: [
    "Kubernetes: container orchestration — automates deployment, scaling, and self-healing",
    "Pod: smallest deployable unit — one or more containers sharing network + storage",
    "Deployment: manages desired number of Pod replicas, handles rolling updates and rollbacks",
    "Service: stable DNS name + ClusterIP for a set of Pods — survives Pod restarts",
    "Service types: ClusterIP (internal), NodePort (external via node), LoadBalancer (cloud LB)",
    "Ingress: HTTP/HTTPS routing — route traffic by hostname or path to different Services",
    "ConfigMap: non-sensitive config (URLs, feature flags) injected as env vars or files",
    "Secret: sensitive data (passwords, API keys) — base64 encoded in Kubernetes",
    "kubectl: apply, get, describe, logs, exec, port-forward — main CLI tool",
    "Microservices: split monolith into small independent services with their own DBs",
    "API Gateway: single entry point for all microservices — routing, auth, rate limiting",
    "HPA (Horizontal Pod Autoscaler): auto-scale Pods based on CPU/memory metrics",
  ],
  codeExample: {
    language: "yaml",
    title: "Kubernetes Deployment + Service + Ingress + Microservices Architecture",
    code: `# ── Deployment: Manage 3 replicas of the API ─────
apiVersion: apps/v1
kind: Deployment
metadata:
  name: devonix-api
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels: { app: devonix-api }
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1         # start 1 new pod before killing old
      maxUnavailable: 0   # never have fewer than 3 running
  template:
    metadata:
      labels: { app: devonix-api }
    spec:
      containers:
      - name: api
        image: ghcr.io/devonix/api:v1.2.3
        ports: [{ containerPort: 3000 }]
        envFrom:
        - secretRef: { name: devonix-secrets }    # DATABASE_URL, AUTH_SECRET
        - configMapRef: { name: devonix-config }  # NODE_ENV, PORT
        resources:
          requests: { cpu: "100m", memory: "128Mi" }
          limits: { cpu: "500m", memory: "512Mi" }
        readinessProbe:
          httpGet: { path: /api/health, port: 3000 }
          initialDelaySeconds: 10
        livenessProbe:
          httpGet: { path: /api/health, port: 3000 }
          periodSeconds: 30
---
# ── Service: Stable endpoint for the API ─────────
apiVersion: v1
kind: Service
metadata: { name: devonix-api-svc, namespace: production }
spec:
  selector: { app: devonix-api }
  ports: [{ port: 80, targetPort: 3000 }]
---
# ── Ingress: Route traffic by hostname ───────────
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: devonix-ingress
  namespace: production
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  tls:
  - hosts: [api.devonix.io]
    secretName: devonix-tls
  rules:
  - host: api.devonix.io
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service: { name: devonix-api-svc, port: { number: 80 } }

# ── kubectl commands ──────────────────────────────
# kubectl apply -f deployment.yaml      (create/update resources)
# kubectl get pods -n production        (list all pods)
# kubectl logs -f pod-name             (stream pod logs)
# kubectl describe pod pod-name        (debug pod issues)
# kubectl exec -it pod-name -- sh      (shell into pod)`,
  },
}
