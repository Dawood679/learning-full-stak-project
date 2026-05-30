import { htmlContent } from "./topics/html"
import { cssContent } from "./topics/css"
import { javascriptContent } from "./topics/javascript"
import { reactContent } from "./topics/react"
import { nextjsContent } from "./topics/nextjs"
import { nodejsContent } from "./topics/nodejs"
import { expressContent } from "./topics/express"
import { sqlFundamentalsContent } from "./topics/sql-fundamentals"
import { nosqlConceptsContent } from "./topics/nosql-concepts"
import { mongodbContent } from "./topics/mongodb"
import { postgresqlContent } from "./topics/postgresql"
import { prismaOrmContent } from "./topics/prisma-orm"
import { mongooseContent } from "./topics/mongoose"
import { cronJobsContent } from "./topics/cron-jobs"
import { bullmqContent } from "./topics/bullmq"
import { pubsubPatternContent } from "./topics/pubsub-pattern"
import { websocketsContent } from "./topics/websockets"
import { webrtcContent } from "./topics/webrtc"
import { processManagementContent } from "./topics/process-management"
import { dockerContent } from "./topics/docker"
import { awsEc2Content } from "./topics/aws-ec2"
import { jenkinsContent } from "./topics/jenkins"
import { kubernetesContent } from "./topics/kubernetes"
import { devopsContent } from "./topics/devops"

export const TOPICS_MAP = {
  html: htmlContent,
  css: cssContent,
  javascript: javascriptContent,
  react: reactContent,
  nextjs: nextjsContent,
  nodejs: nodejsContent,
  express: expressContent,
  "sql-fundamentals": sqlFundamentalsContent,
  "nosql-concepts": nosqlConceptsContent,
  mongodb: mongodbContent,
  postgresql: postgresqlContent,
  "prisma-orm": prismaOrmContent,
  mongoose: mongooseContent,
  "cron-jobs": cronJobsContent,
  bullmq: bullmqContent,
  "pubsub-pattern": pubsubPatternContent,
  websockets: websocketsContent,
  webrtc: webrtcContent,
  "process-management": processManagementContent,
  docker: dockerContent,
  "aws-ec2": awsEc2Content,
  jenkins: jenkinsContent,
  kubernetes: kubernetesContent,
  devops: devopsContent,
}

export const ALL_SLUGS = Object.keys(TOPICS_MAP)

/**
 * Minimal display metadata for each topic.
 * Used as a fallback when the DB is unreachable so the topic detail page
 * can still render TopicHeader without crashing on topic.category etc.
 */
export const TOPIC_STUBS = {
  html:               { title: "HTML",               category: "FRONTEND",         icon: "Code2",       difficulty: "BEGINNER",     description: "The standard markup language for creating web pages and structuring content." },
  css:                { title: "CSS",                category: "FRONTEND",         icon: "Paintbrush",  difficulty: "BEGINNER",     description: "Style sheet language used for describing the presentation of HTML documents." },
  javascript:         { title: "JavaScript",         category: "FRONTEND",         icon: "Braces",      difficulty: "BEGINNER",     description: "The programming language of the web — used for dynamic, interactive content." },
  react:              { title: "React",              category: "FRONTEND",         icon: "Layers",      difficulty: "INTERMEDIATE", description: "A JavaScript library for building fast, component-based user interfaces." },
  nextjs:             { title: "Next.js",            category: "FRONTEND",         icon: "Triangle",    difficulty: "INTERMEDIATE", description: "The React framework for production — with SSR, SSG, and App Router built in." },
  nodejs:             { title: "Node.js",            category: "BACKEND",          icon: "Server",      difficulty: "INTERMEDIATE", description: "JavaScript runtime built on Chrome's V8 engine for building server-side applications." },
  express:            { title: "Express.js",         category: "BACKEND",          icon: "Globe",       difficulty: "INTERMEDIATE", description: "Minimal and flexible Node.js web application framework for building APIs." },
  "sql-fundamentals": { title: "SQL Fundamentals",  category: "DATABASES",        icon: "Table2",      difficulty: "BEGINNER",     description: "The standard language for managing and querying relational databases." },
  "nosql-concepts":   { title: "NoSQL Concepts",    category: "DATABASES",        icon: "DatabaseZap", difficulty: "INTERMEDIATE", description: "Non-relational databases designed for flexible, scalable data storage." },
  mongodb:            { title: "MongoDB",            category: "DATABASES",        icon: "Leaf",        difficulty: "INTERMEDIATE", description: "A document-oriented NoSQL database for flexible, JSON-like data storage." },
  postgresql:         { title: "PostgreSQL",         category: "DATABASES",        icon: "Database",    difficulty: "INTERMEDIATE", description: "Powerful open-source relational database with advanced features and SQL compliance." },
  "prisma-orm":       { title: "Prisma ORM",        category: "DATABASES",        icon: "Wand2",       difficulty: "INTERMEDIATE", description: "Next-generation ORM for Node.js and TypeScript with type-safe database access." },
  mongoose:           { title: "Mongoose ORM",      category: "DATABASES",        icon: "GitBranch",   difficulty: "INTERMEDIATE", description: "Elegant MongoDB object modeling for Node.js with schema validation." },
  "cron-jobs":        { title: "Cron Jobs",         category: "ADVANCED_BACKEND", icon: "Clock",       difficulty: "INTERMEDIATE", description: "Schedule recurring tasks at specified intervals in server-side applications." },
  bullmq:             { title: "Bull MQ",           category: "ADVANCED_BACKEND", icon: "ListTodo",    difficulty: "ADVANCED",     description: "Premium Node.js queue and job scheduler backed by Redis." },
  "pubsub-pattern":   { title: "Pub/Sub Pattern",  category: "ADVANCED_BACKEND", icon: "Radio",       difficulty: "ADVANCED",     description: "Asynchronous messaging pattern for decoupled, event-driven architectures." },
  websockets:         { title: "WebSockets",        category: "ADVANCED_BACKEND", icon: "Wifi",        difficulty: "INTERMEDIATE", description: "Full-duplex communication protocol for real-time, bidirectional data transfer." },
  webrtc:             { title: "WebRTC",            category: "ADVANCED_BACKEND", icon: "Video",       difficulty: "ADVANCED",     description: "Peer-to-peer communication technology for real-time audio, video, and data." },
  "process-management": { title: "Process Management", category: "INFRASTRUCTURE", icon: "Activity",  difficulty: "INTERMEDIATE", description: "Managing, monitoring, and scaling Node.js processes in production environments." },
  docker:             { title: "Docker",            category: "INFRASTRUCTURE",   icon: "Container",   difficulty: "INTERMEDIATE", description: "Platform for building, shipping, and running applications in containers." },
  "aws-ec2":          { title: "AWS EC2",           category: "INFRASTRUCTURE",   icon: "Cloud",       difficulty: "INTERMEDIATE", description: "Amazon's scalable virtual server service for hosting applications in the cloud." },
  jenkins:            { title: "Jenkins",           category: "INFRASTRUCTURE",   icon: "GitMerge",    difficulty: "INTERMEDIATE", description: "Open-source automation server for building, testing, and deploying code with CI/CD pipelines." },
  kubernetes:         { title: "Kubernetes",        category: "CLOUD_DEVOPS",     icon: "Hexagon",     difficulty: "ADVANCED",     description: "Container orchestration system for automating deployment, scaling, and management." },
  devops:             { title: "DevOps for Developers", category: "CLOUD_DEVOPS", icon: "Rocket",     difficulty: "INTERMEDIATE", description: "Practices and tools bridging development and operations for faster, reliable delivery." },
}
