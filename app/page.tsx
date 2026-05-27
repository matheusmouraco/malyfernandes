"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, MessageCircle, MapPin } from "lucide-react";
import CensoForm from "./components/CensoForm";

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  function scrollToForm() {
    setScrolled(true);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="flex-1">
      {/* HERO */}
      <section className="grain relative overflow-hidden bg-[#F7EFE2]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(60% 50% at 80% 20%, rgba(198,134,43,0.25) 0%, transparent 60%), radial-gradient(50% 50% at 10% 90%, rgba(107,31,43,0.18) 0%, transparent 60%)",
          }}
        />

        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 pt-8 md:pt-10">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-[var(--color-bordo)] flex items-center justify-center text-[#F7EFE2] font-serif text-lg">
              M
            </div>
            <div className="leading-tight">
              <div className="font-serif text-lg text-[var(--color-bordo)]">
                Malu Fernandes
              </div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-marrom)]/70">
                Mandato em Movimento
              </div>
            </div>
          </div>
          <a
            href="#censo"
            onClick={(e) => {
              e.preventDefault();
              scrollToForm();
            }}
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-[var(--color-marrom)] hover:text-[var(--color-bordo)] transition"
          >
            Responder o Censo
            <ArrowRight className="h-4 w-4" />
          </a>
        </header>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 pt-14 pb-20 md:grid-cols-2 md:gap-16 md:pt-20 md:pb-28">
          <div className="fade-up flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-bordo)]/25 bg-white/50 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-[var(--color-bordo)] font-medium mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-bordo)] animate-pulse" />
              Censo da Mulher — 2026
            </span>

            <h1 className="font-serif text-[44px] leading-[1.02] text-[var(--color-bordo)] md:text-[68px] md:leading-[0.98]">
              Sua voz constrói
              <br />
              a saúde da
              <br />
              <span className="font-display-italic text-[var(--color-caramelo)]">mulher.</span>
            </h1>

            <p className="mt-7 max-w-lg text-lg leading-relaxed text-[var(--color-marrom)]/85 md:text-xl">
              Saúde não pode depender de sorte. Nem de insistência. Responda o
              Censo da Mulher e ajude a transformar a rede pública do Alto Tietê
              e do Vale do Paraíba em prioridade real.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                onClick={scrollToForm}
                className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-bordo)] px-7 py-4 text-base font-semibold text-[#F7EFE2] shadow-[0_18px_40px_-18px_rgba(107,31,43,0.7)] transition-all hover:bg-[#8A2F3D] hover:translate-y-[-1px]"
              >
                Quero responder
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <span className="text-sm text-[var(--color-marrom)]/70">
                Leva 2 minutos. Anônimo se você quiser.
              </span>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              <Stat n="11" label="Perguntas" />
              <Stat n="100%" label="Confidencial" />
              <Stat n="2min" label="Pra responder" />
            </div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-[var(--color-caramelo)] shadow-[0_40px_80px_-30px_rgba(74,44,25,0.5)]"
            >
              <Image
                src="/malu.png"
                alt="Malu Fernandes"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover object-center"
              />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 50%, rgba(43,31,26,0.65) 100%)",
                }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-7 text-[#F7EFE2]">
                <span className="text-[11px] uppercase tracking-[0.22em] opacity-90 font-medium">
                  Malu Fernandes
                </span>
                <p className="font-serif text-xl md:text-2xl leading-[1.15] mt-2 max-w-[280px]">
                  &ldquo;Eu não vim da política.
                  <br />
                  Eu vim da vida real.&rdquo;
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-6 -left-4 md:-left-10 w-[220px] rounded-2xl bg-white/95 backdrop-blur p-4 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)]"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[var(--color-musgo)] flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-[#F7EFE2]" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-[var(--color-marrom)]/60">
                    Compromisso
                  </div>
                  <div className="font-serif text-[var(--color-bordo)] text-base leading-tight">
                    Saúde como prioridade
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-[#EFE4D2] border-y border-[var(--color-areia)]/40">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-3">
            <ValueCard
              icon={<MapPin className="h-5 w-5" />}
              kicker="Território"
              title="Alto Tietê e Vale do Paraíba"
              body="Mogi, Suzano, Poá, Jacareí, São José, Taubaté — cada cidade tem sua realidade. O Censo mapeia bairro a bairro."
            />
            <ValueCard
              icon={<MessageCircle className="h-5 w-5" />}
              kicker="Escuta real"
              title="Sua resposta vira pauta"
              body="Cada relato alimenta as cobranças oficiais do mandato. Não é pesquisa de gaveta — é base pra cobrar resposta."
            />
            <ValueCard
              icon={<ShieldCheck className="h-5 w-5" />}
              kicker="Sigilo"
              title="100% confidencial"
              body="Seus dados são usados apenas para entender as dores da saúde da mulher. Sem repasses, sem comercialização."
            />
          </div>
        </div>
      </section>

      <section
        id="censo"
        ref={formRef}
        className="grain relative bg-[#F7EFE2] py-20 md:py-28"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(40% 30% at 50% 0%, rgba(198,134,43,0.18) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="text-center mb-10">
            <span className="inline-block text-xs uppercase tracking-[0.22em] text-[var(--color-caramelo)] font-semibold">
              Comece agora
            </span>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl text-[var(--color-bordo)] leading-[1.05]">
              O Censo da Mulher
            </h2>
            <p className="mt-4 text-[var(--color-marrom)]/80 max-w-xl mx-auto">
              11 perguntas. 2 minutos. Sua resposta entra direto no mapa de
              prioridades do mandato.
            </p>
          </div>

          <div className="rounded-[28px] border border-[var(--color-areia)]/50 bg-white/70 backdrop-blur px-6 py-10 md:px-10 md:py-12 shadow-[0_30px_60px_-30px_rgba(74,44,25,0.25)]">
            <CensoForm onStart={() => setScrolled(true)} />
          </div>

          <p className="text-center mt-8 text-xs text-[var(--color-marrom)]/60">
            Ao enviar, você concorda em ser contatada pelo mandato de Malu
            Fernandes sobre temas da saúde da mulher.
          </p>
        </div>
      </section>

      <footer className="bg-[var(--color-preto)] text-[#F7EFE2]/80">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="font-serif text-2xl text-[#F7EFE2]">
              Malu Fernandes
            </div>
            <p className="text-sm opacity-70 mt-1">
              Mandato em Movimento — Alto Tietê &amp; Vale do Paraíba
            </p>
          </div>
          <p className="text-xs opacity-60 max-w-sm">
            {scrolled ? "Obrigada por participar." : "Sua voz constrói a saúde da mulher."}
            <br />© {new Date().getFullYear()} Mandato Malu Fernandes.
          </p>
        </div>
      </footer>
    </main>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-serif text-3xl text-[var(--color-bordo)] leading-none">
        {n}
      </div>
      <div className="text-xs uppercase tracking-[0.14em] text-[var(--color-marrom)]/70 mt-1.5">
        {label}
      </div>
    </div>
  );
}

function ValueCard({
  icon,
  kicker,
  title,
  body,
}: {
  icon: React.ReactNode;
  kicker: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl bg-white/60 border border-[var(--color-areia)]/40 p-7">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-bordo)] text-[#F7EFE2] mb-5">
        {icon}
      </div>
      <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-caramelo)] font-semibold mb-2">
        {kicker}
      </div>
      <h3 className="font-serif text-2xl text-[var(--color-bordo)] leading-tight mb-3">
        {title}
      </h3>
      <p className="text-[var(--color-marrom)]/80 text-[15px] leading-relaxed">
        {body}
      </p>
    </div>
  );
}
