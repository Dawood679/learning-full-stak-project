export const sqlFundamentalsContent = {
  slug: "sql-fundamentals",
  briefDescription: [
    "SQL (Structured Query Language) is the standard language for working with relational databases. The four main SQL operations are CRUD: CREATE (INSERT), READ (SELECT), UPDATE, and DELETE. Relational databases organize data in tables with rows and columns. Each table has a PRIMARY KEY that uniquely identifies every row. Tables are linked through FOREIGN KEYS — a column in one table that references the primary key of another, enabling you to represent real-world relationships without duplicating data.",
    "Querying data with SELECT: you filter rows using WHERE (with conditions like =, >, <, BETWEEN, LIKE, IN), sort results with ORDER BY (ASC/DESC), limit results with LIMIT and OFFSET (for pagination), and group rows with GROUP BY paired with aggregate functions (COUNT, SUM, AVG, MIN, MAX). HAVING is like WHERE but for aggregate results. Subqueries let you nest SELECT statements. CTEs (WITH clause) make complex queries readable by naming intermediate result sets.",
    "JOINs are the most powerful SQL feature — they combine rows from two tables based on matching column values. INNER JOIN returns only matching rows. LEFT JOIN returns all rows from the left table plus matching rows from the right (NULLs where no match). Normalization (1NF, 2NF, 3NF) reduces data redundancy by splitting data across related tables. Database transactions (BEGIN/COMMIT/ROLLBACK) group multiple operations into an all-or-nothing unit, guaranteeing ACID properties: Atomicity, Consistency, Isolation, Durability.",
  ],
  keyConcepts: [
    "SQL statements: SELECT, INSERT INTO, UPDATE, DELETE, CREATE TABLE, ALTER TABLE",
    "Primary key: unique identifier for each row (SERIAL, UUID, or manual)",
    "Foreign key: references primary key of another table — enforces referential integrity",
    "WHERE clause: filter rows — =, !=, >, <, BETWEEN, LIKE, IN, IS NULL",
    "ORDER BY: sort ascending (ASC) or descending (DESC); LIMIT/OFFSET for pagination",
    "Aggregate functions: COUNT(), SUM(), AVG(), MIN(), MAX() with GROUP BY",
    "HAVING: filter after aggregation (like WHERE but for grouped results)",
    "JOINs: INNER JOIN (both match), LEFT JOIN (all left + matching right), FULL OUTER JOIN",
    "Subqueries: SELECT inside SELECT — useful for filtering with aggregated values",
    "CTEs (Common Table Expressions): WITH name AS (SELECT ...) — readable complex queries",
    "Normalization: 1NF (atomic values), 2NF (no partial dependency), 3NF (no transitive dependency)",
    "Transactions: BEGIN/COMMIT/ROLLBACK — ACID guarantees for data integrity",
  ],
  codeExample: {
    language: "sql",
    title: "SQL: SELECT, JOINs, Aggregation, CTEs, and Transactions",
    code: `-- SELECT with WHERE, ORDER BY, LIMIT
SELECT id, name, email, created_at
FROM users
WHERE email LIKE '%@devonix.io'
  AND created_at >= '2026-01-01'
ORDER BY created_at DESC
LIMIT 10 OFFSET 0;  -- page 1 (offset 0), page 2 (offset 10)

-- Aggregate: count orders per user
SELECT
  user_id,
  COUNT(*)        AS order_count,
  SUM(amount)     AS total_spent,
  AVG(amount)     AS avg_order
FROM orders
GROUP BY user_id
HAVING COUNT(*) > 2       -- only users with more than 2 orders
ORDER BY total_spent DESC;

-- INNER JOIN: posts with their authors
SELECT
  p.title,
  p.views,
  u.name   AS author_name,
  u.email  AS author_email
FROM posts p
INNER JOIN users u ON u.id = p.user_id
WHERE p.views > 50;

-- LEFT JOIN: all users, even those with no posts
SELECT u.name, COUNT(p.id) AS post_count
FROM users u
LEFT JOIN posts p ON p.user_id = u.id
GROUP BY u.id, u.name;

-- Subquery: users who spent more than average
SELECT name, email
FROM users
WHERE id IN (
  SELECT user_id FROM orders
  GROUP BY user_id
  HAVING SUM(amount) > (SELECT AVG(amount) FROM orders)
);

-- CTE (Common Table Expression): readable complex query
WITH top_users AS (
  SELECT user_id, SUM(amount) AS total
  FROM orders
  GROUP BY user_id
  ORDER BY total DESC
  LIMIT 10
)
SELECT u.name, tu.total
FROM top_users tu
JOIN users u ON u.id = tu.user_id;

-- Transaction: transfer money safely
BEGIN;
  UPDATE accounts SET balance = balance - 500 WHERE id = 1;
  UPDATE accounts SET balance = balance + 500 WHERE id = 2;
COMMIT;  -- if any error occurs, ROLLBACK instead`,
  },
}
