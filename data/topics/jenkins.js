export const jenkinsContent = {
  slug: "jenkins",
  briefDescription: [
    "Jenkins is an open-source automation server used for Continuous Integration and Continuous Delivery (CI/CD). It builds, tests, and deploys applications automatically whenever code is pushed, catching bugs early and enabling fast, reliable releases.",
    "Jenkins pipelines are defined as code using a Jenkinsfile (Groovy DSL). The Declarative Pipeline syntax provides a structured, opinionated way to define stages: checkout, build, test, deploy. Pipelines can run on multiple agents in parallel.",
    "Jenkins has over 1,800 plugins for integration with Git, Docker, Kubernetes, AWS, Slack, SonarQube, and more. Alternatives like GitHub Actions, GitLab CI, and CircleCI are cloud-native options, but Jenkins remains dominant in enterprise environments.",
  ],
  keyConcepts: [
    "Jenkins Pipeline: Declarative vs Scripted syntax",
    "Stages and Steps: sequential and parallel execution",
    "Jenkinsfile: pipeline as code in version control",
    "Agents: where stages run (any, docker, label-based)",
    "Environment variables and credentials management",
    "Triggers: GitHub webhooks, polling, cron schedules",
    "Post actions: always, success, failure, unstable",
    "Shared Libraries: reusable pipeline code",
  ],
  codeExample: {
    language: "groovy",
    title: "Declarative Jenkins Pipeline for Node.js",
    code: `pipeline {
  agent any

  environment {
    NODE_ENV = 'production'
    DOCKER_IMAGE = "myapp/backend:\${BUILD_NUMBER}"
    AWS_REGION = 'us-east-1'
  }

  triggers {
    githubPush()
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install & Test') {
      agent { docker 'node:20-alpine' }
      steps {
        sh 'npm ci'
        sh 'npm run lint'
        sh 'npm test -- --coverage'
      }
      post {
        always {
          junit 'coverage/junit.xml'
          publishHTML(target: [reportDir: 'coverage', reportFiles: 'index.html'])
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        sh "docker build -t \${DOCKER_IMAGE} ."
      }
    }

    stage('Push & Deploy') {
      when { branch 'main' }
      steps {
        withCredentials([aws(credentialsId: 'aws-creds')]) {
          sh "aws ecr get-login-password | docker login --username AWS --password-stdin \${ECR_URL}"
          sh "docker push \${DOCKER_IMAGE}"
          sh "aws ecs update-service --cluster prod --service api --force-new-deployment"
        }
      }
    }
  }

  post {
    failure {
      slackSend(color: 'danger', message: "Build failed: \${BUILD_URL}")
    }
  }
}`,
  },
}
