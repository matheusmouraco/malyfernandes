# Censo da Mulher — Malu Fernandes

Landing page de coleta do Censo da Mulher para o mandato de Malu Fernandes (Alto Tietê & Vale do Paraíba).

Next.js 15 (App Router) + Tailwind v4 + Supabase + Framer Motion.

## Setup

1. **Supabase:** crie um projeto em [supabase.com](https://supabase.com) e rode `supabase/schema.sql` no SQL Editor.
2. **Env:** `cp .env.local.example .env.local` e preencha as chaves.
3. **Dev:** `npm run dev` → http://localhost:3000

## Estrutura

- `app/page.tsx` — hero + landing
- `app/components/CensoForm.tsx` — formulário multi-step (11 perguntas)
- `lib/supabase/` — clients
- `supabase/schema.sql` — tabela `censo_respostas` + RLS
- `app/globals.css` — design tokens da identidade Malu

## Identidade visual

Paleta do brand book oficial: Bordô `#6B1F2B`, Vinho `#7A2E2E`, Caramelo `#A45A2A`, Dourado `#C6862B`, Musgo `#3C4A35`, Bege `#D7C2A4`, Preto amarronzado `#2B1F1A`.

Tipografia: **Fraunces** (serif, voice "guerreira") + **Inter** (sans, voice "gente como a gente").

## Deploy

Vercel recomendado. Configure `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` nas envs do projeto.

## Exportar respostas

Via Supabase SQL Editor:
```sql
select * from public.censo_respostas order by created_at desc;
```
