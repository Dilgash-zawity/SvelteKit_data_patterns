# SvelteKit CRUD Demo - AI Coding Instructions

## Project Overview
This is a SvelteKit application demonstrating different data access patterns for CRUD operations with SQLite + Drizzle ORM. The project is structured to showcase client-side, server-side, API routes, and remote data handling approaches.

## Architecture & Data Flow

### Database Layer
- **ORM**: Drizzle ORM with better-sqlite3 driver
- **Schema**: Located in `src/lib/server/db/schema.ts` - currently has a `todo` table with UUID primary keys
- **Database**: SQLite database configured via `DATABASE_URL` environment variable
- **Connection**: Initialized in `src/lib/server/db/index.ts` with schema export

### Route Structure (Data Access Patterns)
The routes demonstrate different SvelteKit data loading approaches:
- `/` - Basic landing page
- `/client` - Client-side data fetching (browser-side)
- `/server` - Server-side rendering with `+page.server.ts` load functions
- `/remote` - Remote data integration via `src/lib/remote/data.remote.ts`
- `/api/data` - REST API endpoint in `+server.ts`

## Key Development Workflows

### Database Management
```bash
bun run db:generate    # Generate migrations from schema changes
bun run db:push       # Push schema directly to database (dev)
bun run db:migrate    # Run pending migrations (production)
bun run db:studio     # Launch Drizzle Studio GUI
```

### Development Commands
```bash
bun run dev          # Start dev server
bun run check        # Type checking with svelte-check
bun run check:watch  # Continuous type checking
```

## Project Conventions

### Database Schema Patterns
- Use `crypto.randomUUID()` for primary keys (see `todo` table example)
- Schema definitions in `src/lib/server/db/schema.ts`
- Export all tables from schema for type inference

### SvelteKit File Naming
- `+page.svelte` - Route component
- `+page.server.ts` - Server-side load functions (SSR data)
- `+server.ts` - API endpoints (REST routes)
- `+layout.svelte` - Layout component with props-based children

### Code Organization
- Server-only code: `src/lib/server/` (database, backend logic)
- Shared utilities: `src/lib/` 
- Remote integrations: `src/lib/remote/`
- Static assets: Referenced via `$lib/assets/` alias

### Svelte 5 Patterns
- Use `let { children } = $props()` in layouts
- Render children with `{@render children()}`
- TypeScript throughout with strict configuration

## Environment Setup
- Requires `DATABASE_URL` environment variable for database connection
- SQLite database file location specified in drizzle.config.ts
- Uses SvelteKit's `$env/dynamic/private` for server-side env access

## Integration Points
- **Drizzle + SvelteKit**: Database instance exported from `src/lib/server/db/index.ts`
- **TypeScript**: Strict configuration extending SvelteKit's generated config  
- **Vite**: Standard SvelteKit Vite configuration
- **Asset handling**: SVG favicon imported and referenced in layout

## Development Notes
- Most route files are currently empty - this appears to be a template/starter structure
- The `todo` table schema has a naming inconsistency (`name: integer('name')`) that should be addressed
- Project uses SvelteKit's file-based routing with multiple data access pattern examples
- Database operations should be performed in server-side contexts only (`+page.server.ts`, `+server.ts`)