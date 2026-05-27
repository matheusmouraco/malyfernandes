import Image from "next/image";
import { ArrowRight, ShieldCheck, MessageCircle, MapPin } from "lucide-react";
import fs from "fs";
import path from "path";
import HeroPhoto from "./components/HeroPhoto";

// Verifica se o logo existe em /assets/logo.png (ou .svg)
function logoExists(ext: string) {
  try {
    return fs.existsSync(
      path.join(process.cwd(), "public", "assets", `logo.${ext}`)
    );
  } catch {
    return false;
  }
}

export default function Home() {
  const hasLogoPng = logoExists("png");
  const hasLogoSvg = logoExists("svg");
  const logoSrc = hasLogoPng
    ? "/assets/logo.png"
    : hasLogoSvg
    ? "/assets/logo.svg"
    : null;

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

        {/* HEADER */}
        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 pt-6 md:pt-10">
          {/* Logo slot */}
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt="Malu Fernandes"
              width={160}
              height={52}
              className="h-10 w-auto object-contain md:h-12"
              priority
            />
          ) : (
            <div className="flex items-center gap-3">
              {/* Placeholder até o logo chegar — substituir por <Image src="/assets/logo.png"> */}
              <div className="h-9 w-9 rounded-full bg-[var(--color-bordo)] flex items-center justify-center text-[#F7EFE2] font-bold text-base">
                M
              </div>
              <div className="leading-tight">
                <div className="font-bold text-base text-[var(--color-bordo)] tracking-tight">
                  Malu Fernandes
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-marrom)]/70">
                  Mandato em Movimento
                </div>
              </div>
            </div>
          )}

          <a
            href="#censo"
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-bordo)] border border-[var(--color-bordo)]/30 rounded-full px-5 py-2 hover:bg-[var(--color-bordo)] hover:text-[#F7EFE2] transition-all"
          >
            Responder o Censo
            <ArrowRight className="h-4 w-4" />
          </a>
        </header>

        {/* HERO GRID */}
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 pt-10 pb-16 md:grid-cols-2 md:gap-14 md:pt-16 md:pb-24">

          {/* LEFT — copy */}
          <div className="flex flex-col justify-center order-2 md:order-1">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-bordo)]/25 bg-white/50 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-[var(--color-bordo)] font-semibold mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-bordo)] animate-pulse" />
              Censo da Mulher — 2026
            </span>

            <h1 className="font-serif text-[42px] leading-[1.02] text-[var(--color-bordo)] md:text-[62px] md:leading-[0.97]">
              Sua voz constrói
              <br />
              a saúde da
              <br />
              <span className="font-display-italic text-[var(--color-caramelo)]">mulher.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-[var(--color-marrom)]/85 md:text-lg">
              Saúde não pode depender de sorte. Nem de insistência. Responda o
              Censo da Mulher e ajude a transformar a rede pública do Alto Tietê
              e do Vale do Paraíba em prioridade real.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="#censo"
                className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-bordo)] px-7 py-4 text-base font-semibold text-[#F7EFE2] shadow-[0_18px_40px_-18px_rgba(107,31,43,0.7)] transition-all hover:bg-[#8A2F3D] hover:-translate-y-px w-full sm:w-auto justify-center"
              >
                Quero responder
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <span className="text-sm text-[var(--color-marrom)]/70">
                Leva 2 minutos. Anônimo se você quiser.
              </span>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-xs md:max-w-sm">
              <Stat n="11" label="Perguntas" />
              <Stat n="100%" label="Confidencial" />
              <Stat n="2min" label="Pra responder" />
            </div>
          </div>

          {/* RIGHT — photo */}
          <div className="order-1 md:order-2">
            <HeroPhoto />
          </div>
        </div>
      </section>

      {/* VALUE CARDS */}
      <section className="bg-[#EFE4D2] border-y border-[var(--color-areia)]/40">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <div className="grid gap-6 md:grid-cols-3">
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

      {/* FORM SECTION */}
      <section
        id="censo"
        className="grain relative bg-[#F7EFE2] py-16 md:py-24"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(40% 30% at 50% 0%, rgba(198,134,43,0.16) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-5">
          <div className="text-center mb-8 md:mb-10">
            <span className="inline-block text-xs uppercase tracking-[0.22em] text-[var(--color-caramelo)] font-semibold">
              Comece agora
            </span>
            <h2 className="mt-3 font-serif text-3xl md:text-5xl text-[var(--color-bordo)] leading-[1.05]">
              O Censo da Mulher
            </h2>
            <p className="mt-4 text-[var(--color-marrom)]/80 max-w-xl mx-auto text-sm md:text-base">
              11 perguntas. 2 minutos. Sua resposta entra direto no mapa de
              prioridades do mandato.
            </p>
          </div>

          {/* ─────────────────────────────────────────────────────────
              SHORTCODE WORDPRESS
              Cole o shortcode do seu formulário aqui dentro.
              Exemplo: [gravityforms id="1"] ou [contact-form-7 id="123"]
          ───────────────────────────────────────────────────────── */}
          <div className="rounded-[24px] border border-[var(--color-areia)]/50 bg-white/75 backdrop-blur px-5 py-8 md:px-10 md:py-10 shadow-[0_24px_48px_-24px_rgba(74,44,25,0.22)]">
            {/* SUBSTITUA O CONTEÚDO ABAIXO PELO SEU SHORTCODE WORDPRESS */}
            <div
              className="min-h-[200px] flex flex-col items-center justify-center gap-3 text-center border-2 border-dashed border-[var(--color-areia)] rounded-2xl p-8"
            >
              <span className="text-2xl">📋</span>
              <p className="font-semibold text-[var(--color-bordo)]">
                Shortcode do formulário aqui
              </p>
              <p className="text-sm text-[var(--color-marrom)]/60 max-w-xs">
                Cole o shortcode do WordPress no lugar deste bloco.
                <br />
                Ex: <code className="bg-[var(--color-bege)] px-1 rounded text-xs">[seu-shortcode]</code>
              </p>
            </div>
          </div>

          <p className="text-center mt-6 text-xs text-[var(--color-marrom)]/60">
            Ao enviar, você concorda em ser contatada pelo mandato de Malu
            Fernandes sobre temas da saúde da mulher.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[var(--color-preto)] text-[#F7EFE2]/80">
        <div className="mx-auto max-w-7xl px-5 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

          {/* Logo slot */}
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt="Malu Fernandes"
              width={140}
              height={46}
              className="h-9 w-auto object-contain brightness-0 invert opacity-90"
            />
          ) : (
            <div>
              <div className="font-bold text-xl text-[#F7EFE2] tracking-tight">
                Malu Fernandes
              </div>
              <p className="text-sm opacity-60 mt-1">
                Mandato em Movimento — Alto Tietê &amp; Vale do Paraíba
              </p>
            </div>
          )}

          <p className="text-xs opacity-60 max-w-sm">
            Sua voz constrói a saúde da mulher.
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
      <div className="font-bold text-3xl text-[var(--color-bordo)] leading-none tracking-tight">
        {n}
      </div>
      <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-marrom)]/70 mt-1.5">
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
    <div className="rounded-2xl bg-white/60 border border-[var(--color-areia)]/40 p-6 md:p-7">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-bordo)] text-[#F7EFE2] mb-5">
        {icon}
      </div>
      <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-caramelo)] font-semibold mb-2">
        {kicker}
      </div>
      <h3 className="font-bold text-xl text-[var(--color-bordo)] leading-tight mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-[var(--color-marrom)]/80 text-sm leading-relaxed">
        {body}
      </p>
    </div>
  );
}
