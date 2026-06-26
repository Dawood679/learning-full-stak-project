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

// ── New session-specific topics ──
import { htmlTablesContent } from "./topics/html-tables"
import { htmlFormsContent } from "./topics/html-forms"
import { cssSelectorContent } from "./topics/css-selectors"
import { cssFlexboxContent } from "./topics/css-flexbox"
import { cssAnimationsContent } from "./topics/css-animations"
import { cssResponsiveContent } from "./topics/css-responsive"
import { javascriptLoopsContent } from "./topics/javascript-loops"
import { javascriptFunctionsContent } from "./topics/javascript-functions"
import { javascriptArraysContent } from "./topics/javascript-arrays"
import { javascriptDomContent } from "./topics/javascript-dom"
import { javascriptEventsContent } from "./topics/javascript-events"
import { javascriptBrowserContent } from "./topics/javascript-browser"
import { javascriptOopContent } from "./topics/javascript-oop"
import { javascriptAsyncContent } from "./topics/javascript-async"
import { javascriptAdvancedContent } from "./topics/javascript-advanced"
import { gitContent } from "./topics/git"
import { reactJsxContent } from "./topics/react-jsx"
import { reactStateContent } from "./topics/react-state"
import { reactHooksContent } from "./topics/react-hooks"
import { reactContextContent } from "./topics/react-context"
import { reactRouterContent } from "./topics/react-router"
import { reactReduxContent } from "./topics/react-redux"
import { reactFormsContent } from "./topics/react-forms"
import { reactDeploymentContent } from "./topics/react-deployment"
import { nodejsServerContent } from "./topics/nodejs-server"
import { expressMiddlewareContent } from "./topics/express-middleware"
import { expressRestContent } from "./topics/express-rest"
import { expressProductionContent } from "./topics/express-production"
import { nodejsOptimizationContent } from "./topics/nodejs-optimization"
import { nextjsAppRouterContent } from "./topics/nextjs-app-router"
import { genaiContent } from "./topics/genai"
import { pwaContent } from "./topics/pwa"
import { dockerComposeContent } from "./topics/docker-compose"
import { devopsMicroservicesContent } from "./topics/devops-microservices"
import { kubernetesAdvancedContent } from "./topics/kubernetes-advanced"

export const TOPICS_MAP = {
  // ── Original topics ──
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

  // ── Session-specific topics ──
  "html-tables": htmlTablesContent,
  "html-forms": htmlFormsContent,
  "css-selectors": cssSelectorContent,
  "css-flexbox": cssFlexboxContent,
  "css-animations": cssAnimationsContent,
  "css-responsive": cssResponsiveContent,
  "javascript-loops": javascriptLoopsContent,
  "javascript-functions": javascriptFunctionsContent,
  "javascript-arrays": javascriptArraysContent,
  "javascript-dom": javascriptDomContent,
  "javascript-events": javascriptEventsContent,
  "javascript-browser": javascriptBrowserContent,
  "javascript-oop": javascriptOopContent,
  "javascript-async": javascriptAsyncContent,
  "javascript-advanced": javascriptAdvancedContent,
  git: gitContent,
  "react-jsx": reactJsxContent,
  "react-state": reactStateContent,
  "react-hooks": reactHooksContent,
  "react-context": reactContextContent,
  "react-router": reactRouterContent,
  "react-redux": reactReduxContent,
  "react-forms": reactFormsContent,
  "react-deployment": reactDeploymentContent,
  "nodejs-server": nodejsServerContent,
  "express-middleware": expressMiddlewareContent,
  "express-rest": expressRestContent,
  "express-production": expressProductionContent,
  "nodejs-optimization": nodejsOptimizationContent,
  "nextjs-app-router": nextjsAppRouterContent,
  genai: genaiContent,
  pwa: pwaContent,
  "docker-compose": dockerComposeContent,
  "devops-microservices": devopsMicroservicesContent,
  "kubernetes-advanced": kubernetesAdvancedContent,
}

export const ALL_SLUGS = Object.keys(TOPICS_MAP)

/**
 * Minimal display metadata for each topic.
 * Used as a fallback when the DB is unreachable so the topic detail page
 * can still render TopicHeader without crashing on topic.category etc.
 */
export const TOPIC_STUBS = {
  // ── Original topics ──
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

  // ── Session-specific topics ──
  "html-tables":         { title: "HTML Tables",              category: "FRONTEND",         icon: "Table2",      difficulty: "BEGINNER",     description: "Structure tabular data with <table>, <thead>, <tbody>, colspan and rowspan." },
  "html-forms":          { title: "HTML Forms & Media",       category: "FRONTEND",         icon: "FormInput",   difficulty: "BEGINNER",     description: "Collect user input with forms, input types, labels, validation, and media tags." },
  "css-selectors":       { title: "CSS Selectors & Styling",  category: "FRONTEND",         icon: "Paintbrush",  difficulty: "BEGINNER",     description: "Target HTML elements with element, class, ID, attribute, and pseudo selectors." },
  "css-flexbox":         { title: "CSS Flexbox & Grid",       category: "FRONTEND",         icon: "LayoutGrid",  difficulty: "BEGINNER",     description: "Build one-dimensional (Flexbox) and two-dimensional (Grid) layouts with CSS." },
  "css-animations":      { title: "CSS Pseudo & Animations",  category: "FRONTEND",         icon: "Sparkles",    difficulty: "INTERMEDIATE", description: "Style elements with pseudo-classes, create transitions and @keyframes animations." },
  "css-responsive":      { title: "Responsive Design & SASS", category: "FRONTEND",         icon: "Smartphone",  difficulty: "INTERMEDIATE", description: "Build mobile-first layouts with media queries, responsive units, and SASS." },
  "javascript-loops":    { title: "Loops & Conditionals",     category: "FRONTEND",         icon: "Repeat",      difficulty: "BEGINNER",     description: "Control code flow with for, while, for...of, if/else, switch, and ternary." },
  "javascript-functions":{ title: "Functions in JavaScript",  category: "FRONTEND",         icon: "Braces",      difficulty: "BEGINNER",     description: "Write reusable code with functions, arrow functions, closures, and HOFs." },
  "javascript-arrays":   { title: "Arrays & Objects",         category: "FRONTEND",         icon: "Braces",      difficulty: "BEGINNER",     description: "Work with arrays (map, filter, reduce) and objects (destructuring, spread)." },
  "javascript-dom":      { title: "DOM Manipulation",         category: "FRONTEND",         icon: "Code2",       difficulty: "BEGINNER",     description: "Select, modify, create, and delete HTML elements using the DOM API." },
  "javascript-events":   { title: "Event Handling",           category: "FRONTEND",         icon: "MousePointer",difficulty: "BEGINNER",     description: "Respond to user interactions with addEventListener and event delegation." },
  "javascript-browser":  { title: "Browser APIs & Storage",   category: "FRONTEND",         icon: "Globe",       difficulty: "INTERMEDIATE", description: "Use localStorage, setTimeout, setInterval, Fetch API, and browser APIs." },
  "javascript-oop":      { title: "OOP in JavaScript",        category: "FRONTEND",         icon: "Layers",      difficulty: "INTERMEDIATE", description: "Use classes, inheritance, getters/setters, private fields, and OOP patterns." },
  "javascript-async":    { title: "Async JS & Promises",      category: "FRONTEND",         icon: "Timer",       difficulty: "INTERMEDIATE", description: "Handle asynchronous code with Promises, async/await, and Promise.all." },
  "javascript-advanced": { title: "Error Handling & Advanced JS", category: "FRONTEND",    icon: "AlertTriangle",difficulty: "INTERMEDIATE", description: "Handle errors with try/catch, debounce, throttle, Map, Set, and optional chaining." },
  git:                   { title: "Git & GitHub",             category: "TOOLS",            icon: "GitBranch",   difficulty: "BEGINNER",     description: "Version control with Git — branching, merging, and GitHub collaboration." },
  "react-jsx":           { title: "React Basics & JSX",       category: "FRONTEND",         icon: "Layers",      difficulty: "INTERMEDIATE", description: "Write JSX, create components, pass props, render lists, and handle conditions." },
  "react-state":         { title: "State, Props & Styling",   category: "FRONTEND",         icon: "Layers",      difficulty: "INTERMEDIATE", description: "Manage component state with useState, lift state up, and style React components." },
  "react-hooks":         { title: "React Hooks",              category: "FRONTEND",         icon: "Layers",      difficulty: "INTERMEDIATE", description: "Use useEffect, useRef, useMemo, useCallback, and write custom hooks." },
  "react-context":       { title: "Advanced Hooks & Context", category: "FRONTEND",         icon: "Layers",      difficulty: "INTERMEDIATE", description: "Manage complex state with useReducer and share it globally with Context API." },
  "react-router":        { title: "React Router",             category: "FRONTEND",         icon: "Route",       difficulty: "INTERMEDIATE", description: "Build SPA routing with React Router v6 — nested routes, params, guards." },
  "react-redux":         { title: "Redux & State Management", category: "FRONTEND",         icon: "Layers",      difficulty: "INTERMEDIATE", description: "Manage global state with Redux Toolkit — slices, actions, async thunks." },
  "react-forms":         { title: "Forms & Performance",      category: "FRONTEND",         icon: "FormInput",   difficulty: "INTERMEDIATE", description: "Build controlled forms, validate with React Hook Form, and optimize re-renders." },
  "react-deployment":    { title: "React Project & Deployment", category: "FRONTEND",       icon: "Rocket",      difficulty: "INTERMEDIATE", description: "Build, configure, and deploy React apps to Vercel, Netlify, or Nginx." },
  "nodejs-server":       { title: "Creating a Node.js Server", category: "BACKEND",         icon: "Server",      difficulty: "INTERMEDIATE", description: "Build raw HTTP servers with Node.js — routing, body parsing, JSON responses." },
  "express-middleware":  { title: "Middleware & File Handling", category: "BACKEND",         icon: "Globe",       difficulty: "INTERMEDIATE", description: "Write Express middleware, handle file uploads with Multer, and log requests." },
  "express-rest":        { title: "REST API Development",     category: "BACKEND",          icon: "Globe",       difficulty: "INTERMEDIATE", description: "Build RESTful APIs with Express Router, pagination, validation, and HTTP status codes." },
  "express-production":  { title: "Production Project Structure", category: "BACKEND",      icon: "Building",    difficulty: "INTERMEDIATE", description: "Organize Express apps with MVC pattern, environment config, and structured logging." },
  "nodejs-optimization": { title: "DB Optimization & Logging", category: "BACKEND",         icon: "Gauge",       difficulty: "INTERMEDIATE", description: "Optimize database queries, prevent N+1 problems, and add structured logging." },
  "nextjs-app-router":   { title: "Next.js App Router & SSR", category: "FRONTEND",         icon: "Triangle",    difficulty: "INTERMEDIATE", description: "Use Next.js App Router — Server Components, data fetching strategies, and Route Handlers." },
  genai:                 { title: "GenAI & LangChain",        category: "AI",               icon: "Sparkles",    difficulty: "INTERMEDIATE", description: "Build LLM-powered apps with LangChain — prompt templates, chains, RAG, and agents." },
  pwa:                   { title: "PWA Development",          category: "FRONTEND",         icon: "Smartphone",  difficulty: "ADVANCED",     description: "Build Progressive Web Apps — service workers, caching strategies, and web manifest." },
  "docker-compose":      { title: "Docker Compose & DevOps",  category: "INFRASTRUCTURE",   icon: "Container",   difficulty: "INTERMEDIATE", description: "Orchestrate multi-container apps with Docker Compose — services, volumes, networks." },
  "devops-microservices":{ title: "Microservices Architecture", category: "CLOUD_DEVOPS",   icon: "Network",     difficulty: "ADVANCED",     description: "Design microservices with API gateways, circuit breakers, and service communication." },
  "kubernetes-advanced": { title: "Kubernetes Advanced",      category: "CLOUD_DEVOPS",     icon: "Hexagon",     difficulty: "ADVANCED",     description: "ConfigMaps, Secrets, HPA, Ingress, PersistentVolumes, and Helm charts." },
}
