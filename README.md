# sv-crud

A simple todo app comparing **3 SvelteKit data patterns**.

## Approaches

**1. SSR** - Form actions (`+page.server.ts`)  
**2. CSR** - API routes (`+server.ts`)  
**3. Remote** - Remote functions (`data.remote.ts`)

## Comparison

| | SSR | CSR | Remote |
|---|---|---|---|
| **Code** | ~35 lines | ~120 lines | ~85 lines |
| **Works without JS** | ✅ | ❌ | ❌ |
| **Type Safe** | ⚠️ | ❌ | ✅ |
| **Reactivity** | ❌ | ✅ | ✅ |
| **Boilerplate** | Low | High | Low |

## Setup

```bash
# install
bun install

# push db
bun db:push

# run project
bun dev
```

---

Built to learn SvelteKit data patterns.