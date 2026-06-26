export const prismaOrmContent = {
  slug: "prisma-orm",
  briefDescription: [
    "Prisma is a next-generation ORM (Object-Relational Mapper) for Node.js that works with PostgreSQL, MySQL, SQLite, and MongoDB. It has three main components: Prisma Client (auto-generated, type-safe query builder), Prisma Migrate (declarative schema migrations — creates .sql files), and Prisma Studio (visual GUI to browse and edit your database). You define your entire data model in a single schema.prisma file using Prisma's schema language, then Prisma generates the TypeScript/JavaScript client code automatically.",
    "The Prisma schema defines models (tables) with fields, types, constraints, and relations. Relations use @relation to link models: one-to-many (User → Posts[]), many-to-many (Posts ↔ Tags via implicit join table), and one-to-one. After changing the schema, run 'npx prisma db push' for development (applies changes directly, no migration files) or 'npx prisma migrate dev' for production (creates versioned .sql migration files). Run 'npx prisma generate' to regenerate the Prisma Client after schema changes.",
    "Prisma Client provides an intuitive, type-safe API: prisma.user.findMany()/findUnique() for reads, create()/createMany() for inserts, update()/upsert() for updates, and delete() for deletions. The 'where' option filters, 'orderBy' sorts, 'select' picks specific fields, 'include' eager-loads relations (like JOIN), 'skip'/'take' paginate. prisma.$transaction([...]) runs multiple operations atomically. The 'upsert' operation creates-if-not-found or updates-if-found based on a unique identifier.",
  ],
  keyConcepts: [
    "Three components: Prisma Client (queries), Prisma Migrate (migrations), Prisma Studio (GUI)",
    "schema.prisma: single source of truth — models, fields, types, relations, constraints",
    "Prisma types: String, Int, Float, Boolean, DateTime, Json, @id, @unique, @default",
    "Relations: @relation — one-to-many (User has Post[]), many-to-many, one-to-one",
    "'npx prisma db push': sync schema to DB directly (no migration files — for development)",
    "'npx prisma migrate dev': create versioned .sql files (for production and version control)",
    "'npx prisma generate': regenerate Prisma Client after schema changes",
    "CRUD: findMany, findUnique, create, update, upsert, delete, deleteMany",
    "Filtering: where, AND, OR, NOT, contains, startsWith, gt, gte, lt, lte",
    "Select vs Include: select picks fields, include eager-loads related models",
    "Pagination: skip (offset) and take (limit) options",
    "prisma.$transaction([...]): run multiple operations atomically — all or nothing",
  ],
  codeExample: {
    language: "javascript",
    title: "Prisma CRUD, Relations, Upsert, and Transactions",
    code: `// schema.prisma
// model User {
//   id        String   @id @default(cuid())
//   email     String   @unique
//   name      String?
//   role      Role     @default(STUDENT)
//   posts     Post[]
//   createdAt DateTime @default(now())
// }
// model Post {
//   id       String @id @default(cuid())
//   title    String
//   author   User   @relation(fields: [authorId], references: [id])
//   authorId String
// }
// enum Role { STUDENT ADMIN }

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// ── CREATE ────────────────────────────────────────
const user = await prisma.user.create({
  data: {
    email: 'ali@devonix.io',
    name: 'Ali Khan',
    posts: {
      create: { title: 'My first post' }  // nested create relation
    }
  },
  include: { posts: true }  // return user + their posts
})

// ── READ ─────────────────────────────────────────
const users = await prisma.user.findMany({
  where: {
    role: 'STUDENT',
    email: { contains: '@devonix' },
    createdAt: { gte: new Date('2026-07-01') },
  },
  orderBy: { createdAt: 'desc' },
  skip: 0,
  take: 10,
  select: { id: true, name: true, email: true },  // only these fields
})

// ── UPSERT ────────────────────────────────────────
// Create if not found, update if found
const attendance = await prisma.attendance.upsert({
  where: { userId_sessionId: { userId, sessionId } },  // @@unique
  update: { status: 'PRESENT', quizScore: 80 },
  create: { userId, sessionId, status: 'PRESENT', quizScore: 80 },
})

// ── TRANSACTION ───────────────────────────────────
// Both operations succeed, or both are rolled back
const [quiz, attendance2] = await prisma.$transaction([
  prisma.quizAttempt.create({ data: { userId, topicSlug, score: 85 } }),
  prisma.attendance.upsert({
    where: { userId_sessionId: { userId, sessionId } },
    update: { status: 'PRESENT' },
    create: { userId, sessionId, status: 'PRESENT' },
  }),
])`,
  },
}
