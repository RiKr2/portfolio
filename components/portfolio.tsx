"use client";

import Image from "next/image";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  CheckCircle2,
  ChevronRight,
  Code2,
  Database,
  Github,
  Languages,
  Linkedin,
  Mail,
  Menu,
  Moon,
  PackageCheck,
  PanelsTopLeft,
  Scale,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Sun,
  Users,
  WifiOff,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  contactLinks,
  dictionaries,
  type Locale,
  type ProjectContent,
  type ProjectId,
} from "@/content/portfolio";

function ArrowLink({
  href,
  children,
  external = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      className={`arrow-link ${className}`}
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <span>{children}</span>
      {external ? <ArrowUpRight aria-hidden="true" /> : <ArrowDownRight aria-hidden="true" />}
    </a>
  );
}

function ProductShowcase({ label, caption }: { label: string; caption: string }) {
  return (
    <div className="hero-showcase" aria-label={label}>
      <div className="portrait-card">
        <Image
          src="/ricardo-fundora.webp"
          alt="Ricardo Fundora"
          width={1122}
          height={1402}
          priority
          sizes="(max-width: 900px) 72vw, 420px"
        />
        <div className="portrait-caption">
          <span>Ricardo Fundora</span>
          <small>{caption}</small>
        </div>
      </div>
      <a className="showcase-product showcase-modavyr" href="#modavyr">
        <span className="showcase-icon"><PanelsTopLeft aria-hidden="true" /></span>
        <span><strong>MODAVYR</strong><small>SaaS · Telegram</small></span>
      </a>
      <a className="showcase-product showcase-kontado" href="#kontado">
        <Image src="/projects/kontado-icon.png" alt="" width={36} height={36} />
        <span><strong>Kontado</strong><small>Operations · Offline</small></span>
      </a>
      <a className="showcase-product showcase-nerd" href="#nerd-vault">
        <Image src="/projects/nerd-vault-icon.png" alt="" width={36} height={36} />
        <span><strong>Nerd Vault</strong><small>Marketplace</small></span>
      </a>
      <a className="showcase-product showcase-numb3rs" href="#numb3rs">
        <Image src="/projects/numb3rs-icon.png" alt="" width={36} height={36} />
        <span><strong>Numb3rs</strong><small>Data · Algorithms</small></span>
      </a>
    </div>
  );
}

function ModavyrVisual() {
  return (
    <div className="modavyr-window" aria-label="Vista conceptual del panel modular de MODAVYR">
      <div className="modavyr-topbar">
        <div className="modavyr-brand"><span>M</span><strong>MODAVYR</strong></div>
        <div className="modavyr-live"><i aria-hidden="true" />Platform online</div>
      </div>
      <div className="modavyr-shell">
        <aside className="modavyr-rail" aria-hidden="true">
          <PanelsTopLeft /><Bot /><Users /><BarChart3 />
        </aside>
        <div className="modavyr-main">
          <div className="modavyr-heading">
            <span><small>WORKSPACE</small>Applications</span>
            <b>+ New app</b>
          </div>
          <div className="vertical-grid">
            {[
              ["Commerce", "6 modules", "#7c5cff"],
              ["Membership", "4 modules", "#19a974"],
              ["Loyalty", "4 modules", "#f0a43c"],
              ["RPG", "8 systems", "#e95d78"],
            ].map(([name, modules, color]) => (
              <div className="vertical-card" key={name}>
                <i style={{ background: color }} aria-hidden="true" />
                <strong>{name}</strong><small>{modules}</small>
                <span>Active</span>
              </div>
            ))}
          </div>
          <div className="platform-flow" aria-hidden="true">
            <span><Bot />Telegram Bot</span><b>+</b><span><PanelsTopLeft />Mini App</span>
            <i />
            <strong>APP CORE</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

function KontadoVisual() {
  const products = [
    ["Café Serrano", "42", "$ 680"],
    ["Jugo natural", "18", "$ 250"],
    ["Pan artesanal", "31", "$ 180"],
  ];

  return (
    <div className="product-window kontado-window" aria-label="Vista conceptual de la interfaz de Kontado">
      <div className="window-topbar">
        <div className="window-brand">
          <Image src="/projects/kontado-icon.png" width={28} height={28} alt="" />
          <span>Kontado</span>
        </div>
        <span className="sync-state"><WifiOff size={13} /> Offline</span>
      </div>
      <div className="kontado-shell">
        <aside className="kontado-rail" aria-hidden="true">
          <ShoppingCart />
          <PackageCheck />
          <BarChart3 />
          <ShieldCheck />
        </aside>
        <div className="kontado-main">
          <div className="kontado-heading">
            <span>Resumen de hoy</span>
            <small>Negocio principal · CUP</small>
          </div>
          <div className="metric-row">
            <div><small>VENTAS</small><strong>$ 28,450</strong><span>+12.4%</span></div>
            <div><small>ÓRDENES</small><strong>64</strong><span>18 abiertas</span></div>
            <div><small>CAJA</small><strong>Abierta</strong><span>08:32</span></div>
          </div>
          <div className="kontado-content">
            <div className="sales-chart">
              <div className="chart-label"><span>Ventas por hora</span><small>HOY</small></div>
              <div className="bars" aria-hidden="true">
                {[32, 46, 38, 70, 56, 86, 64, 92, 72].map((height, index) => (
                  <i key={index} style={{ height: `${height}%` }} />
                ))}
              </div>
            </div>
            <div className="product-table">
              <div className="table-title"><span>Inventario</span><small>STOCK</small></div>
              {products.map(([name, stock, price]) => (
                <div className="table-row" key={name}>
                  <span>{name}</span><small>{stock}</small><strong>{price}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NerdVaultVisual() {
  return (
    <div className="nerd-visual" aria-label="Pantallas de Nerd Vault">
      <div className="phone-frame phone-back">
        <Image src="/projects/nerd-store.svg" alt="Perfil de vendedor en Nerd Vault" width={390} height={844} />
      </div>
      <div className="phone-frame phone-front">
        <Image src="/projects/nerd-home.svg" alt="Inicio de la aplicación Nerd Vault" width={390} height={844} />
      </div>
      <div className="integration-orbit" aria-hidden="true">
        <span>TMDB</span><span>RAWG</span><span>LastFM</span>
      </div>
    </div>
  );
}

function Numb3rsVisual() {
  const bars = [48, 72, 36, 88, 58, 78, 43, 66];

  return (
    <div className="numb3rs-visual" aria-label="Vista conceptual del análisis de Numb3rs">
      <div className="numbers-panel">
        <div className="numbers-header">
          <div className="window-brand">
            <Image src="/projects/numb3rs-icon.png" width={30} height={30} alt="" />
            <span>NUMB3RS</span>
          </div>
          <small>BACKTEST / 30 DÍAS</small>
        </div>
        <div className="number-result">
          <span className="result-label">RESULTADO ACTUAL</span>
          <div className="number-balls"><strong>24</strong><strong>07</strong><strong>81</strong></div>
          <span className="result-meta">Mediodía · actualizado</span>
        </div>
        <div className="strategy-strip">
          <span><small>ESTRATEGIA</small>Frecuencia</span>
          <span><small>EFICIENCIA</small>68.4%</span>
          <span><small>ACERTADAS</small>13 / 19</span>
        </div>
        <div className="frequency-chart">
          <div className="chart-label"><span>Frecuencia comparada</span><small>01—99</small></div>
          <div className="number-bars" aria-hidden="true">
            {bars.map((height, index) => (
              <span key={index}><i style={{ height: `${height}%` }} /><small>{[7, 18, 24, 33, 48, 61, 74, 81][index]}</small></span>
            ))}
          </div>
        </div>
      </div>
      <div className="data-stamp" aria-hidden="true">
        <Database />
        <span>HISTORY<br />ANALYZED</span>
      </div>
    </div>
  );
}

function ProjectVisual({ id }: { id: ProjectId }) {
  if (id === "modavyr") return <ModavyrVisual />;
  if (id === "kontado") return <KontadoVisual />;
  if (id === "nerd-vault") return <NerdVaultVisual />;
  return <Numb3rsVisual />;
}

function BuildingVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="community-preview" aria-hidden="true">
        <div className="community-head"><Users /><span>Proyecto comunitario</span><small>EN VOTACIÓN</small></div>
        <div className="community-project">
          <span>Reparación del área común</span>
          <strong>$8,420 <small>de $10,000</small></strong>
          <i><b /></i>
        </div>
        <div className="community-flow">
          <span><CheckCircle2 />Aprobación</span><span><Scale />Propuestas</span><span><ShieldCheck />Contrato</span>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-preview" aria-hidden="true">
      <div className="quiz-score"><Sparkles /><span>Racha actual</span><strong>12 días</strong></div>
      <div className="quiz-question"><small>PREGUNTA 04 / 10</small><strong>¿Qué planeta tiene más lunas?</strong></div>
      <div className="quiz-options"><span>Júpiter</span><span className="is-selected">Saturno</span></div>
    </div>
  );
}

function CaseDialog({
  project,
  labels,
  onClose,
}: {
  project: ProjectContent | null;
  labels: {
    architecture: string;
    challenge: string;
    decision: string;
    evidence: string;
    closeCase: string;
  };
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!project || !dialog) return;
    if (!dialog.open) dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, [project]);

  if (!project) return null;

  return (
    <dialog className={`case-dialog case-${project.id}`} ref={dialogRef} onClose={onClose}>
      <button className="icon-button dialog-close" type="button" onClick={onClose} aria-label={labels.closeCase} autoFocus>
        <X aria-hidden="true" />
      </button>
      <div className="dialog-head">
        <span>{project.index} / {project.discipline}</span>
        <h2>{project.name}</h2>
        <p>{project.thesis}</p>
      </div>
      <div className="dialog-grid">
        <section>
          <small>{labels.challenge}</small>
          <p>{project.challenge}</p>
        </section>
        <section>
          <small>{labels.decision}</small>
          <p>{project.approach}</p>
        </section>
      </div>
      <div className="dialog-evidence">
        <small>{labels.evidence}</small>
        <ul>
          {project.evidence.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
      <div className="dialog-stack">
        <small>{labels.architecture}</small>
        <div>{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
      </div>
    </dialog>
  );
}

export function Portfolio() {
  const [locale, setLocale] = useState<Locale>("es");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCase, setActiveCase] = useState<ProjectId | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const content = dictionaries[locale];

  const selectedProject = useMemo(
    () => content.projects.find((project) => project.id === activeCase) ?? null,
    [activeCase, content.projects],
  );

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const savedLocale = window.localStorage.getItem("rf-locale") as Locale | null;
      const savedTheme = window.localStorage.getItem("rf-theme") as "light" | "dark" | null;
      if (savedLocale === "es" || savedLocale === "en") setLocale(savedLocale);
      if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme);
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark");
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem("rf-locale", locale);
  }, [locale]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("rf-theme", theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(available > 0 ? window.scrollY / available : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLocale = (nextLocale: Locale) => {
    setLocale(nextLocale);
    setMenuOpen(false);
  };

  const navigation = [
    [content.nav.projects, "work"],
    [content.nav.solutions, "solutions"],
    [content.nav.process, "process"],
  ];

  const contactHref = `${contactLinks.email}?subject=${encodeURIComponent(
    locale === "es" ? "Tengo una idea para una aplicación" : "I have an application idea",
  )}`;

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Ricardo Fundora">
          <span className="brand-mark">RF</span>
          <span className="brand-copy">Ricardo Fundora<small>Product Engineer</small></span>
        </a>

        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          {navigation.map(([label, id]) => (
            <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a href="#contact" className="nav-contact" onClick={() => setMenuOpen(false)}>{content.nav.contact}</a>
        </nav>

        <div className="header-tools">
          <div className="language-switch" aria-label="Language">
            <Languages aria-hidden="true" />
            {(["es", "en"] as Locale[]).map((language) => (
              <button
                className={locale === language ? "is-active" : ""}
                key={language}
                type="button"
                onClick={() => toggleLocale(language)}
                aria-pressed={locale === language}
              >
                {language.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            className="icon-button"
            type="button"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label={content.nav.theme}
            title={content.nav.theme}
          >
            {theme === "light" ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
          </button>
          <button
            className="icon-button menu-button"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? content.nav.close : content.nav.menu}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-layout wrap">
            <div className="hero-content">
              <p className="eyebrow">{content.hero.eyebrow}</p>
              <h1>{content.hero.headline}</h1>
              <p className="hero-intro">{content.hero.intro}</p>
              <div className="hero-actions">
                <ArrowLink href="#work" className="button-primary">{content.hero.workCta}</ArrowLink>
                <ArrowLink href="#contact">{content.hero.contactCta}</ArrowLink>
              </div>
              <div className="availability"><i aria-hidden="true" />{content.hero.status}</div>
            </div>
            <ProductShowcase label={content.hero.showcaseLabel} caption={content.hero.showcaseCaption} />
          </div>
          <a className="hero-scroll" href="#signals" aria-label={content.hero.workCta}>
            <ArrowDown aria-hidden="true" />
          </a>
        </section>

        <section className="signals" id="signals" aria-label="Product capabilities">
          <div className="wrap signal-grid">
            {content.signals.map((signal) => (
              <div className="signal" key={signal.label}>
                <strong>{signal.value}</strong>
                <span>{signal.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="work-intro" id="work">
          <div className="wrap section-heading">
            <p className="eyebrow">{content.work.eyebrow}</p>
            <div>
              <h2>{content.work.title}</h2>
              <p>{content.work.intro}</p>
            </div>
          </div>
        </section>

        <section className="project-list" aria-label={content.work.eyebrow}>
          {content.projects.map((project, index) => (
            <article className={`project project-${project.id}`} id={project.id} key={project.id}>
              <div className={`wrap project-layout ${index % 2 === 1 ? "is-reverse" : ""}`}>
                <div className="project-media">
                  <ProjectVisual id={project.id} />
                </div>
                <div className="project-copy">
                  <div className="project-meta">
                    <span>{project.index}</span>
                    <span>{project.discipline}</span>
                  </div>
                  <h3>{project.name}</h3>
                  <p className="project-thesis">{project.thesis}</p>
                  <p className="project-summary">{project.summary}</p>
                  <ul className="project-facts">
                    {project.evidence.slice(0, 3).map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <div className="project-footer">
                    <button className="case-button" type="button" onClick={() => setActiveCase(project.id)}>
                      <span>{content.work.openCase}</span><ChevronRight aria-hidden="true" />
                    </button>
                    <span className="project-stage"><i aria-hidden="true" />{project.stage}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="solutions-section" id="solutions">
          <div className="wrap">
            <div className="solutions-heading">
              <p className="eyebrow">{content.solutions.eyebrow}</p>
              <div>
                <h2>{content.solutions.title}</h2>
                <p>{content.solutions.intro}</p>
              </div>
            </div>
            <div className="solutions-grid">
              {content.solutions.items.map((item) => (
                <article className="solution-card" key={item.index}>
                  <span className="solution-index">{item.index}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <a href={`#${item.projectId}`}>
                    <small>{content.solutions.proofLabel}</small>
                    <strong>{item.proof}</strong>
                    <ArrowDownRight aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="building-section" id="building">
          <div className="wrap">
            <div className="building-heading">
              <p className="eyebrow">{content.building.eyebrow}</p>
              <h2>{content.building.title}</h2>
              <p>{content.building.intro}</p>
            </div>
            <div className="building-grid">
              {content.building.items.map((item, index) => (
                <article className={`building-card building-card-${index + 1}`} key={item.name}>
                  <div className="building-visual"><BuildingVisual index={index} /></div>
                  <div className="building-copy">
                    <span className="building-stage"><i aria-hidden="true" />{item.stage}</span>
                    <h3>{item.name}</h3>
                    <p className="building-thesis">{item.thesis}</p>
                    <p>{item.description}</p>
                    <div className="building-signal"><Code2 aria-hidden="true" /><span>{item.signal}</span></div>
                    <ul className="building-evidence">
                      {item.evidence.map((evidence) => <li key={evidence}>{evidence}</li>)}
                    </ul>
                    <ul className="building-stack">{item.stack.map((tech) => <li key={tech}>{tech}</li>)}</ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="process-section" id="process">
          <div className="wrap">
            <div className="process-heading">
              <p className="eyebrow">{content.process.eyebrow}</p>
              <div>
                <h2>{content.process.title}</h2>
                <p>{content.process.intro}</p>
              </div>
            </div>
            <div className="process-grid">
              {content.process.items.map((item) => (
                <article className="process-step" key={item.index}>
                  <span>{item.index}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <small><CheckCircle2 aria-hidden="true" />{item.outcome}</small>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="wrap contact-layout">
            <div>
              <p className="eyebrow">{content.contact.eyebrow}</p>
              <h2>{content.contact.title}</h2>
              <p>{content.contact.intro}</p>
              <span className="contact-note"><i aria-hidden="true" />{content.contact.note}</span>
            </div>
            <div className="contact-links">
              <a className="contact-primary" href={contactHref}><Mail aria-hidden="true" /><span>{content.contact.email}</span><ArrowUpRight aria-hidden="true" /></a>
              <a href={contactLinks.linkedin} target="_blank" rel="noreferrer"><Linkedin aria-hidden="true" /><span>{content.contact.linkedin}</span><ArrowUpRight aria-hidden="true" /></a>
              <a href={contactLinks.github} target="_blank" rel="noreferrer"><Github aria-hidden="true" /><span>{content.contact.github}</span><ArrowUpRight aria-hidden="true" /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap"><span>© {new Date().getFullYear()} Ricardo Fundora</span><span>{content.footer}</span></div>
      </footer>

      <CaseDialog
        project={selectedProject}
        labels={{
          architecture: content.work.architecture,
          challenge: content.work.challenge,
          decision: content.work.decision,
          evidence: content.work.evidence,
          closeCase: content.work.closeCase,
        }}
        onClose={() => setActiveCase(null)}
      />
    </>
  );
}
