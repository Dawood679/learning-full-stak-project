export const awsEc2Content = {
  slug: "aws-ec2",
  briefDescription: [
    "Amazon EC2 (Elastic Compute Cloud) gives you virtual machines (called 'instances') in the cloud. AWS is one of the major cloud providers (alongside GCP and Azure). For this cohort, we deploy apps to EC2 instances. You launch an EC2 instance by choosing: an AMI (Amazon Machine Image — the OS snapshot, e.g., Ubuntu 22.04 or Amazon Linux), an instance type (hardware specs, e.g., t3.micro = 2 vCPU + 1GB RAM, cheap for dev), a key pair (SSH login credentials), a VPC and subnet, and a Security Group (virtual firewall).",
    "After launching an EC2 instance, you SSH into it: 'ssh -i keypair.pem ubuntu@PUBLIC_IP'. Then you set up your environment: install Node.js (via nvm), install PM2 globally, clone your repository from GitHub, install dependencies, set environment variables, and start the app with PM2. Next, configure NGINX as a reverse proxy — NGINX listens on port 80/443 and forwards requests to your Node.js app on port 3000. This way your app is accessible on the standard HTTP/HTTPS ports without running Node.js as root.",
    "Security Groups are virtual stateful firewalls that control inbound and outbound traffic to your EC2 instance. Common inbound rules: port 22 (SSH — restricted to your IP), port 80 (HTTP — from anywhere), port 443 (HTTPS — from anywhere). IAM Roles grant EC2 instances permissions to access other AWS services (S3, RDS, SSM Parameter Store for secrets) without storing AWS credentials in the instance. To link a custom domain to your EC2 instance: buy a domain, create an A record pointing to your Elastic IP (static public IP), then configure NGINX with that domain name and add an SSL certificate with Let's Encrypt (Certbot).",
  ],
  keyConcepts: [
    "EC2 instance: virtual machine in AWS cloud — choose AMI, instance type, storage, region",
    "AMI (Amazon Machine Image): OS snapshot used to launch instances (Ubuntu, Amazon Linux)",
    "Instance types: t3.micro (1GB RAM, dev), t3.medium, c6i (compute), r6g (memory-optimized)",
    "Key pair: SSH credentials (.pem file) — created on launch, stored securely by you",
    "SSH access: ssh -i keypair.pem ubuntu@PUBLIC_IP",
    "Security Group: virtual stateful firewall — allow port 22 (SSH), 80 (HTTP), 443 (HTTPS)",
    "NGINX: reverse proxy — listens on 80/443, forwards to Node.js on port 3000",
    "IAM Role: grants EC2 access to AWS services (S3, SSM, RDS) without storing credentials",
    "Elastic IP: static public IP address that persists across instance stop/start",
    "Custom domain: buy domain → create DNS A record pointing to Elastic IP → NGINX config",
    "SSL/TLS certificate: Let's Encrypt with Certbot — free HTTPS for your domain",
    "VPC and subnets: public subnet (internet-accessible) vs private subnet (internal only)",
  ],
  codeExample: {
    language: "bash",
    title: "EC2 Server Setup: Node.js + PM2 + NGINX + SSL",
    code: `#!/bin/bash
# After SSH into EC2: ssh -i keypair.pem ubuntu@YOUR_PUBLIC_IP

# ── 1. Install Node.js via NVM ────────────────────
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
node --version   # v20.x.x

# ── 2. Install PM2 ───────────────────────────────
npm install -g pm2

# ── 3. Clone and setup app ───────────────────────
git clone https://github.com/yourusername/devonix-app.git /home/ubuntu/app
cd /home/ubuntu/app
npm install --production

# ── 4. Set environment variables ─────────────────
# Create .env file (never push to GitHub!)
cat > .env << 'EOF'
DATABASE_URL="postgresql://..."
AUTH_SECRET="your-secret"
NODE_ENV=production
PORT=3000
EOF

# ── 5. Start app with PM2 ────────────────────────
pm2 start ecosystem.config.js --env production
pm2 startup      # generates auto-start command
pm2 save         # save current process list

# ── 6. Install and configure NGINX ───────────────
sudo apt update && sudo apt install -y nginx

# Create NGINX config for reverse proxy
sudo tee /etc/nginx/sites-available/devonix << 'EOF'
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/devonix /etc/nginx/sites-enabled/
sudo nginx -t          # test config
sudo systemctl restart nginx

# ── 7. Add SSL with Let's Encrypt ────────────────
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
# Auto-renews every 90 days`,
  },
}
