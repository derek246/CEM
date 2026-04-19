# AGENTS.md — CE Module Early Warning System

## Commands

```bash
npm run dev      # Dev server at http://localhost:3000 (0.0.0.0)
npm run build    # Production build → dist/
npm run preview  # Serve dist/ locally
npm run lint     # Type-check only (tsc --noEmit) — no ESLint configured
npm run clean    # rm -rf dist
```

**Environment**: Copy `.env.example` → `.env.local` and set `GEMINI_API_KEY`. The key is injected at build time via `process.env.GEMINI_API_KEY` (defined in `vite.config.ts`).

---

## Architecture

Single-page React app. No backend — all state lives in `localStorage`.

### Routes
| Path | Component | Purpose |
|---|---|---|
| `/` | `RegisterPage` | List/search all early warning notices |
| `/detail/*` | `DetailPage` | View/edit a single EWN (4-tab panel) |
| `/create` | `CreatePage` | Form to create a new EWN draft |

### State / Data Layer (`src/store/demoStore.ts`)
- Persistence: `localStorage` key `ce_module_early_warnings`
- First load seeds from `MOCK_DATA` (two sample EWNs)
- Exports: `getStore()`, `saveStore()`, `addWarning()`, `updateWarning()`
- No reactive store (no Zustand/Redux/Context) — components call `getStore()` directly on mount and `saveStore()`/`addWarning()`/`updateWarning()` on mutation, then navigate or re-render manually

### Core Type (`src/types.ts`)
`EarlyWarning` is the central model. Key fields to be aware of:
- `id` — display identifier (`DC/2024/09-EWN-XXXX`)
- `status`: `'Mitigated' | 'Awaiting' | 'Requested'`
- `noticeGivenBy`: `'Main Contractor' | 'PM'`
- `approvalProgress`: ordered `ApprovalStep[]` rendered as a timeline
- `response?: ResponseData` — optional PM response block

---

## Stack

| Concern | Library |
|---|---|
| UI components | Ant Design (`antd` v6) |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite` plugin — **no `tailwind.config.js`**) |
| Routing | `react-router-dom` v7 |
| Dates | `dayjs` |
| Icons | `@ant-design/icons` + `lucide-react` |
| Animation | `motion` (Framer Motion v12) |
| AI | `@google/genai` (Gemini) |

---

## Conventions & Patterns

### Styling
- Tailwind utility classes inline on JSX. Custom colors are written as arbitrary values: `text-[rgba(0,0,0,0.45)]`, `bg-[#f5f5f5]`, `border-[#f0f0f0]`.
- The Ant Design theme token overrides in `App.tsx` (`THEME` constant) define the canonical color palette — match these values when adding new components.
- No CSS modules or styled-components.

### Ant Design usage
- `Form` + `Form.Item` for all user input; use `form.useForm()` hook.
- `antd` `Select`, `DatePicker`, `Checkbox.Group`, `Table`, `Timeline`, `Tag`, `Tabs` are already in use — prefer these over alternatives.
- `message.success()` / `message.error()` for toast feedback.

### Path alias
`@/` maps to the project root (not `src/`). So `@/src/types` is valid; `@/types` resolves to `./types.ts` at root level (which doesn't exist — actual types are at `src/types.ts`). Use relative imports within `src/`.

### ID generation
New EWN IDs are generated with `Math.random()` in `CreatePage.tsx` — there is no server-assigned sequential ID. `replyRequiredDate` is auto-set to `dateAware + 14 days`.

### DetailPage structure
Left panel is a mock PDF viewer (static UI). Right panel has 4 tabs (`general`, `approval`, `response`, `activities`). The EWN is loaded from `getStore()` using the URL path segment as the `id`.

---

## Gotchas

- **No `tailwind.config.js`** — Tailwind v4 is configured entirely via the Vite plugin. Don't create a config file; add customizations via CSS `@theme` directives in `index.css` if needed.
- **`tsc --noEmit` is the lint command** — there is no ESLint. TypeScript errors are the only static check.
- **`allowImportingTsExtensions: true`** — `.tsx` extensions in import paths are intentional and valid.
- **`express` and `dotenv` are listed as runtime dependencies** but there is no server file in the repo. They appear to be unused scaffolding from the AI Studio template.
- **`@google/genai` is a dependency** but no AI calls are wired in the current source — the `GEMINI_API_KEY` env var is injected for future use.
- **HMR can be disabled** by setting `DISABLE_HMR=true` (handled in `vite.config.ts`).
- **Mock data reseeds** only on the very first load (when `localStorage` is empty). To reset to demo data, clear `localStorage` key `ce_module_early_warnings` in DevTools.
