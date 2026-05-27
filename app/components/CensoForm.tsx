"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Loader2 } from "lucide-react";
import { createSupabaseClient } from "@/lib/supabase/client";

type Resposta = {
  nome: string;
  telefone: string;
  cidade: string;
  usa_rede_publica: string;
  servico_mais_usado: string;
  maior_dificuldade: string;
  dificuldade_marcar: string[];
  tempo_espera: string;
  bem_atendida: string;
  problema_principal: string;
  prioridade_cidade: string;
  quer_grupo_whatsapp: string;
  prioridade_deputada: string;
};

const initial: Resposta = {
  nome: "",
  telefone: "",
  cidade: "",
  usa_rede_publica: "",
  servico_mais_usado: "",
  maior_dificuldade: "",
  dificuldade_marcar: [],
  tempo_espera: "",
  bem_atendida: "",
  problema_principal: "",
  prioridade_cidade: "",
  quer_grupo_whatsapp: "",
  prioridade_deputada: "",
};

const TOTAL_STEPS = 12;

function maskPhone(v: string) {
  const digits = v.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function CensoForm({ onStart }: { onStart?: () => void }) {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Resposta>(initial);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const progress = useMemo(() => (step / TOTAL_STEPS) * 100, [step]);

  function update<K extends keyof Resposta>(key: K, value: Resposta[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function toggleArray(key: "dificuldade_marcar", value: string) {
    setData((d) => {
      const arr = d[key];
      return {
        ...d,
        [key]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  }

  function canAdvance(): boolean {
    switch (step) {
      case 1:
        return (
          data.nome.trim().length >= 2 &&
          data.telefone.replace(/\D/g, "").length >= 10 &&
          data.cidade.trim().length >= 2
        );
      case 2:
        return !!data.usa_rede_publica;
      case 3:
        return data.servico_mais_usado.trim().length >= 2;
      case 4:
        return data.maior_dificuldade.trim().length >= 3;
      case 5:
        return data.dificuldade_marcar.length > 0;
      case 6:
        return !!data.tempo_espera;
      case 7:
        return !!data.bem_atendida;
      case 8:
        return !!data.problema_principal;
      case 9:
        return data.prioridade_cidade.trim().length >= 3;
      case 10:
        return !!data.quer_grupo_whatsapp;
      case 11:
        return data.prioridade_deputada.trim().length >= 3;
      default:
        return true;
    }
  }

  async function submit() {
    setLoading(true);
    setError(null);
    try {
      const supabase = createSupabaseClient();
      const url = new URL(window.location.href);
      const payload = {
        ...data,
        user_agent: navigator.userAgent,
        utm_source: url.searchParams.get("utm_source"),
        utm_medium: url.searchParams.get("utm_medium"),
        utm_campaign: url.searchParams.get("utm_campaign"),
      };
      const { error } = await supabase.from("censo_respostas").insert(payload);
      if (error) throw error;
      setDone(true);
      setStep(12);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erro ao enviar resposta.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  function next() {
    if (!canAdvance()) return;
    if (step === 11) {
      submit();
      return;
    }
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 1));
  }

  if (!started) {
    return (
      <button
        onClick={() => {
          setStarted(true);
          onStart?.();
        }}
        className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-bordo)] px-7 py-4 text-base font-semibold text-[#F7EFE2] shadow-[0_18px_40px_-18px_rgba(107,31,43,0.7)] transition-all hover:bg-[#8A2F3D] hover:translate-y-[-1px]"
      >
        Quero responder o Censo
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </button>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[var(--color-marrom)]/70 mb-3">
          <span>Censo da Mulher</span>
          <span>
            {Math.min(step, 11)} / 11
          </span>
        </div>
        <div className="h-1.5 w-full bg-[var(--color-bege)]/60 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--color-bordo)] via-[var(--color-caramelo)] to-[var(--color-dourado)]"
            initial={false}
            animate={{ width: `${Math.min(progress, (11 / TOTAL_STEPS) * 100)}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="min-h-[320px]"
        >
          {step === 1 && (
            <StepCard title="Primeiro, vamos te conhecer" subtitle="Suas respostas são confidenciais e usadas só para construir as prioridades da saúde da mulher.">
              <div className="space-y-4">
                <Field label="Seu nome">
                  <input
                    className="field-input"
                    placeholder="Como você prefere ser chamada"
                    value={data.nome}
                    onChange={(e) => update("nome", e.target.value)}
                    autoFocus
                  />
                </Field>
                <Field label="WhatsApp / Telefone">
                  <input
                    className="field-input"
                    placeholder="(11) 99999-9999"
                    inputMode="numeric"
                    value={data.telefone}
                    onChange={(e) => update("telefone", maskPhone(e.target.value))}
                  />
                </Field>
                <Field label="Em qual cidade você mora?">
                  <input
                    className="field-input"
                    placeholder="Ex: Mogi das Cruzes, Suzano, Jacareí..."
                    value={data.cidade}
                    onChange={(e) => update("cidade", e.target.value)}
                  />
                </Field>
              </div>
            </StepCard>
          )}

          {step === 2 && (
            <StepCard title="Você costuma usar a rede pública de saúde da sua cidade?">
              <Chips
                value={[data.usa_rede_publica]}
                options={[
                  { value: "sim", label: "Sim, frequentemente" },
                  { value: "as_vezes", label: "Às vezes" },
                  { value: "nao", label: "Não uso" },
                ]}
                onChange={(v) => update("usa_rede_publica", v)}
              />
            </StepCard>
          )}

          {step === 3 && (
            <StepCard title="Qual serviço você mais usa?" subtitle="UBS, posto, hospital, maternidade, AME ou outro — fique à vontade pra descrever.">
              <input
                className="field-input"
                placeholder="Ex: UBS do meu bairro, AME, hospital municipal..."
                value={data.servico_mais_usado}
                onChange={(e) => update("servico_mais_usado", e.target.value)}
                autoFocus
              />
            </StepCard>
          )}

          {step === 4 && (
            <StepCard title="Nos últimos 12 meses, qual foi sua maior dificuldade ao usar a rede pública de saúde?">
              <textarea
                className="field-input min-h-[140px] resize-none"
                placeholder="Conte com suas palavras. Esse relato vira pauta."
                value={data.maior_dificuldade}
                onChange={(e) => update("maior_dificuldade", e.target.value)}
                autoFocus
              />
            </StepCard>
          )}

          {step === 5 && (
            <StepCard title="Você já teve dificuldade para marcar algum destes atendimentos?" subtitle="Pode marcar mais de uma opção.">
              <Chips
                multi
                value={data.dificuldade_marcar}
                options={[
                  { value: "ginecologista", label: "Ginecologista" },
                  { value: "preventivo", label: "Preventivo" },
                  { value: "mamografia", label: "Mamografia" },
                  { value: "ultrassom", label: "Ultrassom" },
                  { value: "exames_hormonais", label: "Exames hormonais" },
                  { value: "pre_natal", label: "Pré-natal" },
                  { value: "nenhuma", label: "Nenhuma das opções" },
                ]}
                onChange={(v) => toggleArray("dificuldade_marcar", v)}
              />
            </StepCard>
          )}

          {step === 6 && (
            <StepCard title="Quanto tempo você costuma esperar por consulta ou exame?">
              <Chips
                value={[data.tempo_espera]}
                options={[
                  { value: "menos_1_semana", label: "Menos de 1 semana" },
                  { value: "1_4_semanas", label: "De 1 a 4 semanas" },
                  { value: "1_3_meses", label: "De 1 a 3 meses" },
                  { value: "mais_3_meses", label: "Mais de 3 meses" },
                  { value: "nunca_consegui", label: "Nunca consegui" },
                ]}
                onChange={(v) => update("tempo_espera", v)}
              />
            </StepCard>
          )}

          {step === 7 && (
            <StepCard title="Você sente que é bem atendida quando procura a rede pública?">
              <Chips
                value={[data.bem_atendida]}
                options={[
                  { value: "sim", label: "Sim, sempre" },
                  { value: "as_vezes", label: "Às vezes" },
                  { value: "nao", label: "Não" },
                ]}
                onChange={(v) => update("bem_atendida", v)}
              />
            </StepCard>
          )}

          {step === 8 && (
            <StepCard title="Qual problema mais afeta você hoje?">
              <Chips
                value={[data.problema_principal]}
                options={[
                  { value: "demora", label: "Demora" },
                  { value: "falta_medico", label: "Falta de médico" },
                  { value: "falta_exame", label: "Falta de exame" },
                  { value: "distancia", label: "Distância" },
                  { value: "mau_atendimento", label: "Mau atendimento" },
                  { value: "falta_remedio", label: "Falta de remédio" },
                  { value: "pre_natal", label: "Dificuldade no pré-natal" },
                  { value: "contracepcao", label: "Laqueadura / DIU / contracepção" },
                  { value: "outro", label: "Outro" },
                ]}
                onChange={(v) => update("problema_principal", v)}
              />
            </StepCard>
          )}

          {step === 9 && (
            <StepCard title="Na sua opinião, qual deveria ser a prioridade da saúde da mulher na sua cidade?">
              <textarea
                className="field-input min-h-[140px] resize-none"
                placeholder="O que você cobraria primeiro?"
                value={data.prioridade_cidade}
                onChange={(e) => update("prioridade_cidade", e.target.value)}
                autoFocus
              />
            </StepCard>
          )}

          {step === 10 && (
            <StepCard title="Quer entrar no grupo de WhatsApp para acompanhar esse tema na sua região?" subtitle="Sem spam — só atualizações reais sobre o que muda na sua cidade.">
              <Chips
                value={[data.quer_grupo_whatsapp]}
                options={[
                  { value: "sim", label: "Sim, quero participar" },
                  { value: "nao", label: "Agora não" },
                ]}
                onChange={(v) => update("quer_grupo_whatsapp", v)}
              />
            </StepCard>
          )}

          {step === 11 && (
            <StepCard
              title="Pensando em tudo que você disse até aqui..."
              subtitle="Qual deveria ser a prioridade de uma Deputada Estadual para ajudar a saúde da mulher no Alto Tietê e Vale do Paraíba?"
            >
              <textarea
                className="field-input min-h-[160px] resize-none"
                placeholder="Sua resposta vira diretriz de mandato."
                value={data.prioridade_deputada}
                onChange={(e) => update("prioridade_deputada", e.target.value)}
                autoFocus
              />
            </StepCard>
          )}

          {step === 12 && done && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-musgo)] text-[#F7EFE2] mb-6">
                <Check className="h-8 w-8" strokeWidth={2.4} />
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-bordo)] leading-tight mb-4">
                Obrigada, {data.nome.split(" ")[0]}.
              </h2>
              <p className="text-lg text-[var(--color-marrom)]/80 max-w-md mx-auto mb-8">
                Sua voz já está no mapa. Cada resposta como a sua vira pauta de cobrança e prioridade de mandato.
              </p>
              {data.quer_grupo_whatsapp === "sim" && (
                <a
                  href="https://chat.whatsapp.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--color-musgo)] px-6 py-3 text-sm font-semibold text-[#F7EFE2] hover:bg-[#4D5E45] transition"
                >
                  Entrar no grupo do WhatsApp
                  <ArrowRight className="h-4 w-4" />
                </a>
              )}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {error && (
        <div className="mt-4 rounded-xl border border-[var(--color-bordo)]/30 bg-[var(--color-bordo)]/5 px-4 py-3 text-sm text-[var(--color-bordo)]">
          {error}
        </div>
      )}

      {step < 12 && (
        <div className="mt-10 flex items-center justify-between">
          <button
            onClick={back}
            disabled={step === 1 || loading}
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-[var(--color-marrom)] hover:bg-[var(--color-bege)]/40 disabled:opacity-30 disabled:hover:bg-transparent transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>
          <button
            onClick={next}
            disabled={!canAdvance() || loading}
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-bordo)] px-7 py-3.5 text-sm font-semibold text-[#F7EFE2] shadow-[0_14px_30px_-14px_rgba(107,31,43,0.7)] hover:bg-[#8A2F3D] disabled:bg-[var(--color-areia)] disabled:shadow-none disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : step === 11 ? (
              <>
                Enviar resposta
                <Check className="h-4 w-4" />
              </>
            ) : (
              <>
                Continuar
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

function StepCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-serif text-[28px] md:text-[34px] leading-[1.15] text-[var(--color-bordo)] mb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[var(--color-marrom)]/75 text-base md:text-lg mb-6">
          {subtitle}
        </p>
      )}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.14em] text-[var(--color-marrom)]/70 mb-2 font-medium">
        {label}
      </span>
      {children}
    </label>
  );
}

function Chips({
  options,
  value,
  multi = false,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string[];
  multi?: boolean;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((opt) => {
        const selected = value.includes(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            className="chip"
            data-selected={selected}
            onClick={() => onChange(opt.value)}
          >
            {selected && <Check className="h-4 w-4" strokeWidth={2.5} />}
            {opt.label}
          </button>
        );
      })}
      {multi && (
        <p className="basis-full text-xs text-[var(--color-marrom)]/60 mt-2">
          Selecione quantas quiser.
        </p>
      )}
    </div>
  );
}
