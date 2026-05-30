export const kubernetesContent = {
  slug: "kubernetes",
  briefDescription: [
    "Kubernetes (K8s) is an open-source container orchestration platform that automates deploying, scaling, and managing containerized applications. It abstracts away the underlying infrastructure, treating clusters of machines as a single resource pool.",
    "The core building blocks: Pods (smallest deployable units, run containers), Deployments (desired state for Pods, handles rolling updates and rollbacks), Services (stable DNS name and IP for a set of Pods), ConfigMaps/Secrets (configuration and credentials), and Ingress (HTTP routing rules).",
    "Kubernetes' control loop continuously reconciles actual state with desired state. When you apply a Deployment YAML, the controller schedules Pods on nodes with available resources. If a Pod crashes, it's automatically replaced. HPA (Horizontal Pod Autoscaler) scales based on CPU/memory metrics.",
  ],
  keyConcepts: [
    "Pods: one or more containers sharing network and storage",
    "Deployments: ReplicaSets, rolling updates, rollbacks",
    "Services: ClusterIP, NodePort, LoadBalancer",
    "Ingress: HTTP routing, TLS termination",
    "ConfigMaps and Secrets for configuration",
    "Namespaces for team/environment isolation",
    "kubectl: apply, get, describe, logs, exec, port-forward",
    "HPA: Horizontal Pod Autoscaler for scaling",
  ],
  codeExample: {
    language: "yaml",
    title: "Deployment + Service + Ingress Manifest",
    code: `# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-server
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels: { app: api-server }
  strategy:
    type: RollingUpdate
    rollingUpdate: { maxSurge: 1, maxUnavailable: 0 }
  template:
    metadata:
      labels: { app: api-server }
    spec:
      containers:
      - name: api
        image: myregistry/api:v1.2.3
        ports: [{ containerPort: 3000 }]
        envFrom:
        - secretRef: { name: api-secrets }
        resources:
          requests: { cpu: "100m", memory: "128Mi" }
          limits: { cpu: "500m", memory: "512Mi" }
        readinessProbe:
          httpGet: { path: /health, port: 3000 }
          initialDelaySeconds: 10
---
apiVersion: v1
kind: Service
metadata: { name: api-service, namespace: production }
spec:
  selector: { app: api-server }
  ports: [{ port: 80, targetPort: 3000 }]
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: api-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: api.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service: { name: api-service, port: { number: 80 } }`,
  },
}
