export const sqlFundamentalsContent = {
  slug: "sql-fundamentals",
  briefDescription: [
    "SQL (Structured Query Language) is the standard language for interacting with relational databases. It covers data querying (SELECT), manipulation (INSERT/UPDATE/DELETE), definition (CREATE/ALTER/DROP), and transaction control (COMMIT/ROLLBACK).",
    "Relational databases store data in tables with rows and columns. Relationships between tables are defined via primary keys and foreign keys. Normalization reduces data redundancy by organizing data into related tables.",
    "Understanding JOINs (INNER, LEFT, RIGHT, FULL), subqueries, CTEs (WITH clause), window functions (RANK, ROW_NUMBER, LAG), and indexes is essential for writing efficient SQL at scale.",
  ],
  keyConcepts: [
    "SELECT with WHERE, ORDER BY, GROUP BY, HAVING",
    "JOINs: INNER, LEFT, RIGHT, FULL OUTER, CROSS",
    "Aggregate functions: COUNT, SUM, AVG, MIN, MAX",
    "Subqueries and Common Table Expressions (CTEs)",
    "Window functions: RANK(), ROW_NUMBER(), LAG(), LEAD()",
    "Indexes: B-tree, composite, partial, covering indexes",
    "Transactions: ACID properties, COMMIT, ROLLBACK, SAVEPOINT",
    "Normalization: 1NF, 2NF, 3NF",
  ],
  codeExample: {
    language: "sql",
    title: "CTEs, Window Functions & JOINs",
    code: `-- CTE to calculate running totals
WITH monthly_sales AS (
  SELECT
    DATE_TRUNC('month', created_at) AS month,
    SUM(amount) AS total
  FROM orders
  WHERE status = 'completed'
  GROUP BY 1
),
ranked AS (
  SELECT
    month,
    total,
    SUM(total) OVER (ORDER BY month) AS running_total,
    RANK() OVER (ORDER BY total DESC) AS rank
  FROM monthly_sales
)
SELECT * FROM ranked WHERE rank <= 3;

-- JOIN with aggregation
SELECT
  u.name,
  COUNT(o.id) AS order_count,
  COALESCE(SUM(o.amount), 0) AS lifetime_value
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id, u.name
HAVING COUNT(o.id) > 5
ORDER BY lifetime_value DESC;`,
  },
}
