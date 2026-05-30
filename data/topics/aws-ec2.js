export const awsEc2Content = {
  slug: "aws-ec2",
  briefDescription: [
    "Amazon EC2 (Elastic Compute Cloud) provides resizable virtual machines (instances) in the cloud. You choose the instance type (CPU, RAM, GPU), OS (Amazon Linux, Ubuntu, etc.), storage, and region — giving full control over the server environment.",
    "EC2 instances live within a VPC (Virtual Private Cloud). Security Groups act as virtual firewalls controlling inbound/outbound traffic. Elastic IPs provide static public addresses. Load Balancers distribute traffic across Auto Scaling groups.",
    "For Node.js applications, the typical EC2 stack includes: EC2 instances behind an Application Load Balancer, RDS for the database, ElastiCache for Redis, and an S3 bucket for static assets. IAM roles grant EC2 instances permissions to AWS services without storing credentials.",
  ],
  keyConcepts: [
    "Instance types: t3.micro (cheap) to c6i.32xlarge (compute)",
    "AMI: Amazon Machine Image — the OS snapshot",
    "Security Groups: stateful firewall rules",
    "VPC, subnets, public vs private subnet architecture",
    "Elastic Load Balancer (ALB) + Auto Scaling Groups",
    "IAM roles: grant EC2 access to S3, RDS, etc.",
    "EC2 User Data: bootstrap scripts on first launch",
    "Key pairs and SSH access",
  ],
  codeExample: {
    language: "bash",
    title: "EC2 User Data Bootstrap Script (Node.js)",
    code: `#!/bin/bash
# User Data script — runs as root on first launch

# Update system
yum update -y

# Install Node.js 20 via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
export NVM_DIR="/root/.nvm"
source "$NVM_DIR/nvm.sh"
nvm install 20
nvm use 20

# Install PM2 globally
npm install -g pm2

# Clone application
git clone https://github.com/yourorg/your-app.git /app
cd /app
npm ci --production

# Set environment variables from AWS Parameter Store
export DB_URL=$(aws ssm get-parameter --name /app/DB_URL --with-decryption --query Parameter.Value --output text)
export REDIS_URL=$(aws ssm get-parameter --name /app/REDIS_URL --with-decryption --query Parameter.Value --output text)

# Start application
pm2 start ecosystem.config.js
pm2 startup systemd -u ec2-user --hp /home/ec2-user
pm2 save

# Configure Nginx as reverse proxy
yum install -y nginx
systemctl enable nginx && systemctl start nginx`,
  },
}
