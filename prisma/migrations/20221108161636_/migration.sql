-- This is an empty migration.

CREATE INDEX qa_idx ON qa USING GIN (to_tsvector('russian', keywords));
