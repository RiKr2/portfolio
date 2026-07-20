"use client";

import Image from "next/image";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Boxes,
  ChevronRight,
  Code2,
  Database,
  Gamepad2,
  Github,
  GraduationCap,
  Languages,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  Moon,
  PackageCheck,
  ServerCog,
  ShieldCheck,
  ShoppingCart,
  Sun,
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

const projectIcons: Record<ProjectId, string> = {
  kontado: "/projects/kontado-icon.png",
  "nerd-vault": "/projects/nerd-vault-icon.png",
  numb3rs: "/projects/numb3rs-icon.png",
};

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

function ProductMap({ projects, label }: { projects: ProjectContent[]; label: string }) {
  return (
    <div className="product-map" aria-label={label}>
      <svg className="map-lines" viewBox="0 0 760 470" aria-hidden="true">
        <path d="M86 248 C 195 248, 202 90, 338 90" />
        <path d="M86 248 C 215 248, 252 234, 402 234" />
        <path d="M86 248 C 202 248, 220 382, 350 382" />
        <path d="M476 90 C 592 90, 570 233, 680 233" />
        <path d="M540 234 C 610 234, 604 233, 680 233" />
        <path d="M488 382 C 590 382, 596 233, 680 233" />
      </svg>
      <div className="map-core">
        <span>RF</span>
        <small>system / product</small>
      </div>
      {projects.map((project) => (
        <a className={`map-node map-node-${project.id}`} href={`#${project.id}`} key={project.id}>
          <Image src={projectIcons[project.id]} alt="" width={42} height={42} />
          <span>
            <strong>{project.name}</strong>
            <small>{project.discipline.split(" / ")[0]}</small>
          </span>
        </a>
      ))}
      <div className="map-output">
        <span>VALUE</span>
        <small>useful / clear / resilient</small>
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
  if (id === "kontado") return <KontadoVisual />;
  if (id === "nerd-vault") return <NerdVaultVisual />;
  return <Numb3rsVisual />;
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
    [content.nav.work, "work"],
    [content.nav.lab, "lab"],
    [content.nav.experience, "experience"],
    [content.nav.about, "about"],
  ];

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
          <ProductMap projects={content.projects} label={content.hero.canvasLabel} />
          <div className="hero-content wrap">
            <p className="eyebrow">{content.hero.eyebrow}</p>
            <h1>{content.hero.name}</h1>
            <p className="hero-role">{content.hero.role}</p>
            <p className="hero-intro">{content.hero.intro}</p>
            <div className="hero-actions">
              <ArrowLink href="#work" className="button-primary">{content.hero.workCta}</ArrowLink>
              <ArrowLink href="#contact">{content.hero.contactCta}</ArrowLink>
            </div>
            <div className="availability"><i aria-hidden="true" />{content.hero.status}</div>
          </div>
          <a className="hero-scroll" href="#signals" aria-label={content.hero.workCta}>
            <ArrowDown aria-hidden="true" />
          </a>
        </section>

        <section className="signals" id="signals" aria-label="Profile overview">
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

        <section className="lab-section" id="lab">
          <div className="wrap">
            <div className="lab-heading">
              <p className="eyebrow">{content.lab.eyebrow}</p>
              <h2>{content.lab.title}</h2>
              <p>{content.lab.intro}</p>
            </div>
            <div className="lab-grid">
              {content.lab.items.map((item, index) => (
                <article className="lab-card" key={item.name}>
                  <div className="lab-card-head">
                    {index === 0 ? <Gamepad2 aria-hidden="true" /> : <GraduationCap aria-hidden="true" />}
                    <span>{item.stage}</span>
                  </div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="lab-signal"><Code2 aria-hidden="true" /><span>{item.signal}</span></div>
                  <ul>{item.stack.map((tech) => <li key={tech}>{tech}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="principles-section">
          <div className="wrap">
            <div className="principles-heading">
              <p className="eyebrow">{content.principles.eyebrow}</p>
              <h2>{content.principles.title}</h2>
            </div>
            <div className="principles-grid">
              {content.principles.items.map((item) => (
                <article key={item.index}>
                  <span>{item.index}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="experience-section" id="experience">
          <div className="wrap experience-layout">
            <div className="experience-heading">
              <p className="eyebrow">{content.experience.eyebrow}</p>
              <h2>{content.experience.title}</h2>
              <p>{content.experience.intro}</p>
            </div>
            <div className="experience-list">
              {content.experience.items.map((item) => (
                <article className="experience-row" key={`${item.company}-${item.period}`}>
                  <span className="experience-period">{item.period}</span>
                  <div>
                    <h3>{item.company}</h3>
                    <p className="experience-role">{item.role}</p>
                    {item.description ? <p className="experience-description">{item.description}</p> : null}
                  </div>
                  <ul>{item.stack.map((tech) => <li key={tech}>{tech}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="wrap about-layout">
            <div className="about-mark" aria-hidden="true">
              <div><span>RF</span><small>2016—2026</small></div>
              <div className="about-modules">
                <ServerCog /><Database /><Layers3 /><Boxes />
              </div>
            </div>
            <div className="about-copy">
              <p className="eyebrow">{content.about.eyebrow}</p>
              <h2>{content.about.title}</h2>
              {content.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <dl>
                <div><dt>{content.about.educationLabel}</dt><dd>{content.about.education}</dd></div>
                <div><dt>{content.about.publicationLabel}</dt><dd>{content.about.publication}</dd></div>
              </dl>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="wrap contact-layout">
            <div>
              <p className="eyebrow">{content.contact.eyebrow}</p>
              <h2>{content.contact.title}</h2>
              <p>{content.contact.intro}</p>
            </div>
            <div className="contact-links">
              <a href={contactLinks.email}><Mail aria-hidden="true" /><span>{content.contact.email}</span><ArrowUpRight aria-hidden="true" /></a>
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
