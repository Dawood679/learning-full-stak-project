export const kubernetesAdvancedContent = {
  slug: "kubernetes-advanced",
  briefDescription: [
    "Kubernetes advanced topics build on the fundamentals of Pods and Deployments. ConfigMaps store non-secret configuration data as key-value pairs and can be mounted into pods as environment variables or files. Secrets work the same way but are base64-encoded and meant for sensitive data (passwords, API keys, tokens). Resource limits and requests (resources.requests and resources.limits) tell Kubernetes how much CPU and memory a container needs — requests reserve resources for scheduling; limits prevent a container from consuming more than allowed. Liveness probes restart a container if it becomes unhealthy; readiness probes prevent traffic from reaching a pod until it's ready to serve.",
    "Horizontal Pod Autoscaler (HPA) automatically scales the number of pod replicas based on CPU/memory usage or custom metrics. You set a target metric (e.g., 70% CPU) and min/max replicas — Kubernetes adjusts the replica count every 15 seconds. StatefulSets are like Deployments but for stateful applications (databases, message queues) — pods get stable, predictable names (pod-0, pod-1), stable network identities, and ordered startup/shutdown. PersistentVolumes (PV) and PersistentVolumeClaims (PVC) provide durable storage that outlives pods. StorageClasses define the type of storage (SSD, HDD, NFS) and how it's provisioned.",
    "Kubernetes networking: each pod gets its own IP. Services (ClusterIP, NodePort, LoadBalancer) expose pods to internal or external traffic. Ingress is a more powerful HTTP routing layer — one Ingress controller can route multiple domains and paths to different services, handle SSL termination, and do path-based routing. Helm is the Kubernetes package manager — charts bundle Kubernetes manifests with configurable values.yaml files for reusable, versioned deployments. Namespaces logically isolate resources within a cluster — useful for separating dev/staging/prod environments or teams. RBAC (Role-Based Access Control) controls who can do what in the cluster.",
  ],
  keyConcepts: [
    "ConfigMap: store non-secret config — mount as env vars or files in pods",
    "Secret: store sensitive data (base64-encoded) — never commit to git; use sealed secrets",
    "resources.requests: minimum CPU/memory guaranteed for scheduling",
    "resources.limits: maximum CPU/memory a container can consume",
    "Liveness probe: restarts container if it fails — httpGet, exec, tcpSocket",
    "Readiness probe: removes pod from Service endpoints until probe passes",
    "HPA (Horizontal Pod Autoscaler): auto-scale replicas based on CPU/memory/custom metrics",
    "StatefulSet: for stateful apps — stable pod names (pod-0, pod-1), ordered operations",
    "PersistentVolume (PV) + PersistentVolumeClaim (PVC): durable storage that outlives pods",
    "Ingress: HTTP routing — multiple domains/paths to different services, SSL termination",
    "Helm: Kubernetes package manager — charts with configurable values.yaml",
    "Namespace: logical isolation — separate dev/staging/prod; ResourceQuotas per namespace",
  ],
  codeExample: {
    language: "yaml",
    title: "ConfigMap, Secret, Resource Limits, Probes, HPA, Ingress, PersistentVolume",
    code: `# ── ConfigMap ──
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  NODE_ENV: production
  LOG_LEVEL: info
  APP_PORT: "3000"

---
# ── Secret (values are base64-encoded) ──
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
stringData:             # Kubernetes auto-encodes these to base64
  JWT_SECRET: "myverylongsecretkey"
  DATABASE_URL: "postgresql://user:pass@postgres:5432/mydb"

---
# ── Deployment with probes, resource limits, ConfigMap, Secret ──
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
        - name: backend
          image: myregistry/backend:v1.2.0
          ports:
            - containerPort: 3000
          envFrom:
            - configMapRef:
                name: app-config        # inject all ConfigMap keys as env vars
            - secretRef:
                name: app-secrets       # inject all Secret keys as env vars
          resources:
            requests:
              memory: "128Mi"
              cpu: "100m"               # 0.1 CPU core
            limits:
              memory: "512Mi"
              cpu: "500m"               # 0.5 CPU core
          livenessProbe:
            httpGet:
              path: /healthz
              port: 3000
            initialDelaySeconds: 15    # wait 15s before first check
            periodSeconds: 20
            failureThreshold: 3        # restart after 3 failures
          readinessProbe:
            httpGet:
              path: /ready
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 10

---
# ── Horizontal Pod Autoscaler ──
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: backend-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: backend
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70    # scale up when avg CPU > 70%

---
# ── PersistentVolumeClaim (for database storage) ──
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-pvc
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: fast-ssd     # StorageClass defines SSD/HDD provisioner
  resources:
    requests:
      storage: 20Gi

---
# ── Ingress — HTTP routing with SSL ──
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/rate-limit: "100"
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - api.devonix.io
        - app.devonix.io
      secretName: devonix-tls
  rules:
    - host: api.devonix.io
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: backend-service
                port:
                  number: 3000
    - host: app.devonix.io
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend-service
                port:
                  number: 3001`,
  },
}
