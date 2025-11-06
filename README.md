# sv-crud

A simple todo app comparing **3 SvelteKit data patterns**.

## Approaches

**1. SSR** - Form actions (`+page.server.ts`)  
**2. CSR** - API routes (`+server.ts`)  
**3. Remote** - Remote functions (`data.remote.ts`)

## Comparison

| Feature | SSR | CSR | Remote |
|---------|-----|-----|--------|
| **Lines of Code** | ~35 | ~120 | ~85 |
| **Boilerplate** | Minimal | High | Low |
| **Works without JS** | ✅ | ❌ | ❌ |
| **Type Safety** | ⚠️ | ❌ | ✅ |
| **Loading States** | ⚠️ | ⚠️ | ✅ |
| **Error Handling** | ⚠️ | ⚠️ | ✅ |
| **Reactivity** | ❌ | ✅ | ✅ |
| **SEO Friendly** | ✅ | ⚠️ | ✅ |
| **Real-time Updates** | ❌ | ✅ | ✅ |
| **API Reusability** | ❌ | ✅ | ⚠️ |
| **Learning Curve** | Easy | Medium | Medium |
| **Best For** | Simple forms | Complex SPAs | Modern apps |
| **Progressive Enhancement** | ✅ | ❌ | ❌ |
| **State Management** | Server-driven | Client-driven | Hybrid |

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