export const postgresqlContent = {
  slug: "postgresql",
  briefDescription: [
    "PostgreSQL is the world's most advanced open-source relational database. Unlike MongoDB (which is schema-less), PostgreSQL enforces a strict schema — you define columns, data types, and constraints upfront. Relational databases organize data into tables (like spreadsheets) that are linked via foreign keys. You use SQL (Structured Query Language) to create tables, insert data, query with SELECT, update, and delete. PostgreSQL is used in this cohort via Prisma ORM and Neon (a serverless Postgres provider).",
    "SQL fundamentals: SELECT queries with WHERE (filter), ORDER BY (sort), GROUP BY + HAVING (aggregate), and LIMIT/OFFSET (pagination). JOINs combine data from multiple tables: INNER JOIN (only matching rows), LEFT JOIN (all left rows + matching right), RIGHT JOIN, and FULL OUTER JOIN. Aggregate functions: COUNT(), SUM(), AVG(), MIN(), MAX(). Transactions with BEGIN/COMMIT/ROLLBACK ensure atomic operations — either all succeed or all roll back. ACID properties (Atomicity, Consistency, Isolation, Durability) guarantee data integrity.",
    "PostgreSQL has advanced features: JSONB columns store JSON data with indexing support, full-text search with tsvector/tsquery, Row-Level Security (RLS) to restrict row access per user, EXPLAIN ANALYZE to debug slow queries by viewing the execution plan, and powerful index types: B-tree (default), GIN (for JSONB/arrays/full-text), GiST. Supabase and Neon provide managed PostgreSQL in the cloud. Prisma ORM provides type-safe queries against PostgreSQL without writing raw SQL.",
  ],
  keyConcepts: [
    "Relational model: tables, rows, columns, primary keys, foreign keys",
    "SQL basics: SELECT, INSERT, UPDATE, DELETE, CREATE TABLE, ALTER TABLE, DROP",
    "Filtering and sorting: WHERE, ORDER BY, LIMIT, OFFSET, DISTINCT",
    "JOINs: INNER JOIN (matching rows), LEFT JOIN (all left + matching right)",
    "Aggregate functions: COUNT, SUM, AVG, MIN, MAX + GROUP BY + HAVING",
    "Transactions: BEGIN, COMMIT, ROLLBACK, SAVEPOINT — ACID properties",
    "Primary key: uniquely identifies each row, auto-increments or UUID",
    "Foreign key: references another table's primary key — enforces referential integrity",
    "Indexes: B-tree (default), GIN (JSONB/arrays), speeds up reads at cost of write speed",
    "JSONB: store and query JSON data with indexing (PostgreSQL-specific feature)",
    "Row-Level Security (RLS): policies that filter rows based on user identity",
    "EXPLAIN ANALYZE: shows actual query execution plan with timing — find slow queries",
  ],
  codeExample: {
    language: "sql",
    title: "PostgreSQL: Tables, JOINs, Aggregation, and Transactions",
    code: `-- Create tables with constraints
CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  email      VARCHAR(255) UNIQUE NOT NULL,
  name       VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE posts (
  id         SERIAL PRIMARY KEY,
  title      VARCHAR(255) NOT NULL,
  content    TEXT,
  user_id    INTEGER REFERENCES users(id) ON DELETE CASCADE,
  views      INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert data
INSERT INTO users (email, name) VALUES ('ali@devonix.io', 'Ali Khan');
INSERT INTO posts (title, user_id) VALUES ('Hello HTML', 1);

-- SELECT with JOIN
SELECT
  u.name,
  p.title,
  p.views,
  p.created_at
FROM posts p
INNER JOIN users u ON u.id = p.user_id
WHERE p.views > 0
ORDER BY p.created_at DESC
LIMIT 10;

-- LEFT JOIN: get all users even without posts
SELECT u.name, COUNT(p.id) AS post_count
FROM users u
LEFT JOIN posts p ON p.user_id = u.id
GROUP BY u.id, u.name
HAVING COUNT(p.id) > 0
ORDER BY post_count DESC;

-- Transaction (atomic: all or nothing)
BEGIN;
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;  -- or ROLLBACK if something fails

-- JSONB column
ALTER TABLE users ADD COLUMN metadata JSONB;
UPDATE users SET metadata = '{"plan": "pro", "country": "PK"}' WHERE id = 1;
SELECT metadata->>'plan' FROM users WHERE id = 1;  -- returns "pro"

-- Create index for performance
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created ON posts(created_at DESC);`,
  },
}
