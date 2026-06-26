export const jenkinsContent = {
  slug: "jenkins",
  briefDescription: [
    "Jenkins is an open-source CI/CD (Continuous Integration / Continuous Delivery) automation server. CI/CD means: every time you push code to GitHub, Jenkins automatically runs tests, builds the application, and can deploy it — without manual steps. This catches bugs immediately (within minutes of a code push), ensures the codebase is always in a deployable state, and enables teams to ship features confidently and frequently. DevOps emphasizes automating the entire software delivery pipeline.",
    "A Jenkinsfile is the pipeline definition stored in your repository (Pipeline as Code). You write it in Groovy DSL. The Declarative Pipeline syntax has a structured format: pipeline{} contains stages{}, each stage{} contains steps{}. Stages are sequential by default but can run in parallel using the 'parallel' block. An 'agent' defines WHERE each stage runs — 'any' (available Jenkins node), a Docker container (agent { docker 'node:20' }), or a labeled node.",
    "The 'post' block in a Declarative Pipeline defines actions that run after stages: 'always' (regardless of result), 'success' (on success), 'failure' (on failure). Common post actions: send Slack/email notifications, publish test reports, clean up Docker images, and update deployment status. Jenkins integrates with over 1,800 plugins for GitHub, Docker, Kubernetes, AWS, SonarQube (code quality), and more. Modern alternatives include GitHub Actions (built into GitHub), GitLab CI, and CircleCI.",
  ],
  keyConcepts: [
    "CI/CD: Continuous Integration (test every commit) + Continuous Delivery (auto-deployable)",
    "Jenkins: automation server that runs CI/CD pipelines triggered by code pushes",
    "Jenkinsfile: pipeline as code in Groovy DSL — stored in repository root",
    "Declarative Pipeline: structured syntax with pipeline{}, stages{}, stage{}, steps{}",
    "Scripted Pipeline: full Groovy code — more flexible, less structured",
    "agent: where stages run — any, { docker 'node:20' }, or labeled node",
    "stages: sequential pipeline steps — Checkout, Install, Test, Build, Deploy",
    "parallel: run multiple stages simultaneously to reduce pipeline duration",
    "post block: always, success, failure, unstable — actions after stage/pipeline",
    "environment: define pipeline-wide environment variables",
    "withCredentials: securely inject secrets (AWS keys, tokens) without hardcoding",
    "triggers: githubPush() (webhook), pollSCM (polling), cron schedule (periodic)",
  ],
  codeExample: {
    language: "groovy",
    title: "Declarative Jenkinsfile: Test, Build Docker Image, Deploy to AWS",
    code: `// Jenkinsfile — place in repository root
pipeline {
  agent any

  environment {
    NODE_ENV    = 'production'
    DOCKER_IMG  = "devonix/api:\${BUILD_NUMBER}"
    AWS_REGION  = 'us-east-1'
    ECR_URL     = '123456789.dkr.ecr.us-east-1.amazonaws.com'
  }

  // Trigger on every push to GitHub
  triggers {
    githubPush()
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm  // clone the repository
      }
    }

    // Run tests and linting in a Docker container
    stage('Install & Test') {
      agent { docker { image 'node:20-alpine' } }
      steps {
        sh 'npm ci'
        sh 'npm run lint'
        sh 'npm test -- --coverage --ci'
      }
      post {
        always {
          publishHTML([reportDir: 'coverage', reportFiles: 'index.html', reportName: 'Coverage'])
        }
      }
    }

    // Run security scan and unit tests in parallel
    stage('Parallel Quality Checks') {
      parallel {
        stage('Unit Tests') {
          steps { sh 'npm test' }
        }
        stage('Security Audit') {
          steps { sh 'npm audit --audit-level high' }
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        sh "docker build -t \${DOCKER_IMG} ."
      }
    }

    // Only deploy when code is merged to main branch
    stage('Push & Deploy') {
      when { branch 'main' }
      steps {
        withCredentials([aws(credentialsId: 'aws-prod-creds', region: AWS_REGION)]) {
          sh "aws ecr get-login-password | docker login --username AWS --password-stdin \${ECR_URL}"
          sh "docker push \${DOCKER_IMG}"
          sh "aws ecs update-service --cluster prod --service api --force-new-deployment"
        }
      }
    }

  }

  post {
    success {
      slackSend(color: 'good', message: "✅ Build #\${BUILD_NUMBER} deployed: \${BUILD_URL}")
    }
    failure {
      slackSend(color: 'danger', message: "❌ Build #\${BUILD_NUMBER} failed: \${BUILD_URL}")
    }
    always {
      sh 'docker system prune -f'  // cleanup Docker images
    }
  }
}`,
  },
}
