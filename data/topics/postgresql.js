export const postgresqlContent = {
  slug: "postgresql",
  briefDescription: [
    "PostgreSQL is the world's most advanced open-source relational database. It supports standard SQL while adding powerful features: JSONB columns, full-text search, arrays, enums, custom types, table inheritance, and advanced indexing.",
    "PostgreSQL's concurrency model uses MVCC (Multi-Version Concurrency Control) — readers never block writers and writers never block readers. Isolation levels (READ COMMITTED, REPEATABLE READ, SERIALIZABLE) control transaction behavior.",
    "Advanced features like partial indexes, expression indexes, GIN/GiST indexes for JSONB and full-text, logical replication, row-level security (RLS), and extensions (uuid-ossp, pg_trgm, PostGIS) make Postgres enterprise-grade.",
  ],
  keyConcepts: [
    "JSONB: storing, querying and indexing JSON data",
    "Full-text search with tsvector and tsquery",
    "GIN and GiST index types for complex data",
    "Row-Level Security (RLS) for multi-tenant apps",
    "EXPLAIN ANALYZE for query plan debugging",
    "Partitioning: RANGE, LIST, HASH",
    "Extensions: uuid-ossp, pg_trgm, pgcrypto",
    "Logical replication and pg_logical",
  ],
  codeExample: {
    language: "sql",
    title: "JSONB Queries + Full-Text Search + RLS",
    code: `-- JSONB storage and querying
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_events_data ON events USING GIN (data);

-- Query JSONB fields
SELECT data->>'name', data->'address'->>'city'
FROM events
WHERE data @> '{"type": "purchase"}'
  AND (data->>'amount')::numeric > 100;

-- Full-text search
ALTER TABLE posts ADD COLUMN search_vector TSVECTOR;
CREATE INDEX idx_search ON posts USING GIN (search_vector);

UPDATE posts SET search_vector =
  to_tsvector('english', title || ' ' || content);

SELECT title, ts_rank(search_vector, query) AS rank
FROM posts, to_tsquery('english', 'postgres & indexing') query
WHERE search_vector @@ query
ORDER BY rank DESC;

-- Row-Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON orders
  USING (tenant_id = current_setting('app.tenant_id')::uuid);`,
  },
}
