# pp-news — Power Platform News Feed

Single-page news feed built with Nuxt 3, Supabase, and Tailwind CSS.

## Setup

```bash
pnpm install
```

Create a `.env` file:

```
SUPABASE_URL=https://xyoioywjjimjiawivhfb.supabase.co
SUPABASE_KEY=<your-legacy-anon-key>
```

Get the key from Supabase → Settings → API → **Legacy anon, service_role API keys** → `anon`.

## Development

```bash
pnpm dev
```

## Production build

```bash
pnpm build
pnpm preview
```
