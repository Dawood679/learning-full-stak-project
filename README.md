# DevOnix — Full-Stack Learning Platform

A comprehensive learning platform covering the complete web development + DevOps stack with interactive quizzes.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router, JavaScript)
- **Database**: PostgreSQL via [Neon](https://neon.tech) (serverless)
- **ORM**: Prisma v5
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Icons**: Lucide React
- **Themes**: next-themes (dark/light mode)

## 📚 Topics (24 total, 170+ quiz questions)

| Category | Topics |
|---|---|
| **Frontend** | HTML, CSS, JavaScript, React, Next.js |
| **Backend** | Node.js, Express.js |
| **Databases** | SQL, NoSQL Concepts, MongoDB, PostgreSQL, Prisma ORM, Mongoose |
| **Advanced Backend** | Cron Jobs, BullMQ, Pub/Sub, WebSockets, WebRTC |
| **Infrastructure** | Process Management, Docker, AWS EC2, Jenkins |
| **Cloud & DevOps** | Kubernetes, DevOps for Developers |

## ⚡ Setup

### 1. Neon Database

1. Create a free account at https://neon.tech
2. Create a new project and copy the connection string

### 2. .env.local

Edit `.env.local` and set your DATABASE_URL:

```env
DATABASE_URL="postgresql://user:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Database setup

```bash
npm run db:push    # create tables in Neon
npm run db:seed    # seed 24 topics + 170 questions
```

### 4. Run

```bash
npm run dev
```

Open http://localhost:3000

## 📋 Scripts

```bash
npm run dev          # dev server
npm run build        # production build
npm run db:push      # push schema to DB
npm run db:seed      # seed database
npm run db:studio    # Prisma Studio GUI
npm run db:reset     # reset + re-seed
```
