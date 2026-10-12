// Vitest runs content/lib modules directly under Node, not through Next.js's
// bundler, which is the only thing that gives real meaning to the
// `server-only` package (it throws unconditionally when executed as plain
// JS — see node_modules/server-only/index.js). This no-op shim stands in
// for it during tests only (aliased in vitest.config.ts); the real package
// still guards against client-bundle leaks in the actual Next.js build.
export {};
