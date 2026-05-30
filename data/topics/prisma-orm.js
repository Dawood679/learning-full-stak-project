export const prismaOrmContent = {
  slug: "prisma-orm",
  briefDescription: [
    "Prisma is a next-generation ORM for Node.js and TypeScript/JavaScript. It consists of Prisma Client (auto-generated, type-safe query builder), Prisma Migrate (declarative database migrations), and Prisma Studio (GUI for your database).",
    "Prisma's schema-first approach means you define your data model in schema.prisma, and Prisma generates the database migrations and the client code. This single source of truth eliminates mismatches between your models and database.",
    "Prisma Client provides an intuitive API for CRUD operations, filtering, sorting, pagination, relations, aggregations, and raw queries. It supports PostgreSQL, MySQL, SQLite, SQL Server, MongoDB, and CockroachDB.",
  ],
  keyConcepts: [
    "Schema: model, fields, types, @id, @unique, @default",
    "Relations: @relation, one-to-many, many-to-many",
    "CRUD: findMany, findUnique, create, update, upsert, delete",
    "Filtering: where, AND, OR, NOT, contains, startsWith",
    "Select & Include: control returned fields and eager load relations",
    "Transactions: prisma.$transaction([...]) and interactive tx",
    "Prisma Migrate: prisma migrate dev, deploy, reset",
    "Middleware and soft deletes",
  ],
  codeExample: {
    language: "javascript",
    title: "Prisma CRUD, Relations & Transactions",
    code: `import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Create with nested relation
const user = await prisma.user.create({
  data: {
    email: 'alice@example.com',
    profile: {
      create: { bio: 'Full-stack developer' }
    },
    posts: {
      create: [{ title: 'Hello World', published: true }]
    }
  },
  include: { profile: true, posts: true }
})

// Filtered query with pagination
const posts = await prisma.post.findMany({
  where: {
    published: true,
    author: { email: { contains: '@example.com' } }
  },
  orderBy: { createdAt: 'desc' },
  skip: 0,
  take: 10,
  select: { id: true, title: true, author: { select: { name: true } } }
})

// Interactive transaction
const result = await prisma.$transaction(async (tx) => {
  const debit = await tx.account.update({
    where: { id: 'acc1' },
    data: { balance: { decrement: 100 } }
  })
  if (debit.balance < 0) throw new Error('Insufficient funds')
  return tx.account.update({
    where: { id: 'acc2' },
    data: { balance: { increment: 100 } }
  })
})`,
  },
}
