-- Censo da Mulher — Malu Fernandes
-- Schema para coleta de respostas

create extension if not exists "pgcrypto";

create table if not exists public.censo_respostas (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Identificação
  nome text not null,
  telefone text not null,
  cidade text not null,

  -- Perguntas fechadas
  usa_rede_publica text not null check (usa_rede_publica in ('sim','nao','as_vezes')),
  dificuldade_marcar text[] not null default '{}',
  tempo_espera text not null check (tempo_espera in ('menos_1_semana','1_4_semanas','1_3_meses','mais_3_meses','nunca_consegui')),
  bem_atendida text not null check (bem_atendida in ('sim','as_vezes','nao')),
  problema_principal text not null,
  quer_grupo_whatsapp text not null check (quer_grupo_whatsapp in ('sim','nao')),

  -- Perguntas abertas
  servico_mais_usado text,
  maior_dificuldade text,
  prioridade_cidade text,
  prioridade_deputada text,

  -- Metadados
  user_agent text,
  utm_source text,
  utm_medium text,
  utm_campaign text
);

create index if not exists censo_respostas_cidade_idx on public.censo_respostas (cidade);
create index if not exists censo_respostas_created_idx on public.censo_respostas (created_at desc);

alter table public.censo_respostas enable row level security;

-- Insert público (formulário aberto)
drop policy if exists "censo_public_insert" on public.censo_respostas;
create policy "censo_public_insert"
  on public.censo_respostas
  for insert
  to anon, authenticated
  with check (true);

-- Leitura apenas para service_role / autenticados do mandato
drop policy if exists "censo_admin_select" on public.censo_respostas;
create policy "censo_admin_select"
  on public.censo_respostas
  for select
  to authenticated
  using (auth.role() = 'service_role');
