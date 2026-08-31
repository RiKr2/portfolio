export type Locale = "es" | "en";
export type ProjectId = "modavyr" | "kontado" | "nerd-vault" | "numb3rs";

export interface ProjectContent {
  id: ProjectId;
  index: string;
  discipline: string;
  name: string;
  thesis: string;
  summary: string;
  challenge: string;
  approach: string;
  evidence: string[];
  stack: string[];
  stage: string;
}

interface SolutionContent {
  index: string;
  title: string;
  description: string;
  projectId: ProjectId;
  proof: string;
}

interface BuildingContent {
  name: string;
  stage: string;
  thesis: string;
  description: string;
  signal: string;
  evidence: string[];
  stack: string[];
}

export interface PortfolioContent {
  nav: {
    projects: string;
    solutions: string;
    process: string;
    contact: string;
    menu: string;
    close: string;
    theme: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    intro: string;
    workCta: string;
    contactCta: string;
    status: string;
    showcaseLabel: string;
    showcaseCaption: string;
  };
  signals: { value: string; label: string }[];
  work: {
    eyebrow: string;
    title: string;
    intro: string;
    openCase: string;
    architecture: string;
    challenge: string;
    decision: string;
    evidence: string;
    closeCase: string;
  };
  projects: ProjectContent[];
  solutions: {
    eyebrow: string;
    title: string;
    intro: string;
    proofLabel: string;
    items: SolutionContent[];
  };
  building: {
    eyebrow: string;
    title: string;
    intro: string;
    items: BuildingContent[];
  };
  process: {
    eyebrow: string;
    title: string;
    intro: string;
    items: { index: string; title: string; description: string; outcome: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    email: string;
    linkedin: string;
    github: string;
    note: string;
  };
  footer: string;
}

export const contactLinks = {
  email: "mailto:rikr2fun2ra@gmail.com",
  linkedin: "https://www.linkedin.com/in/rikr2/",
  github: "https://github.com/RiKr2",
} as const;

export const dictionaries: Record<Locale, PortfolioContent> = {
  es: {
    nav: {
      projects: "Proyectos",
      solutions: "Qué construyo",
      process: "Proceso",
      contact: "Hablemos",
      menu: "Abrir navegación",
      close: "Cerrar navegación",
      theme: "Cambiar tema",
    },
    hero: {
      eyebrow: "Diseño + ingeniería de producto",
      headline: "Convierto ideas complejas en aplicaciones listas para usarse.",
      intro:
        "Diseño y desarrollo productos digitales de principio a fin: aplicaciones móviles, plataformas SaaS, marketplaces y sistemas para operaciones reales.",
      workCta: "Ver proyectos",
      contactCta: "Cuéntame tu idea",
      status: "Disponible para nuevos proyectos",
      showcaseLabel: "Productos diseñados y construidos por Ricardo Fundora",
      showcaseCaption: "Del concepto al producto",
    },
    signals: [
      { value: "10 años", label: "construyendo software" },
      { value: "End-to-end", label: "producto, frontend y backend" },
      { value: "Mobile + Web", label: "una visión, múltiples superficies" },
      { value: "ES / EN", label: "colaboración internacional" },
    ],
    work: {
      eyebrow: "Proyectos seleccionados",
      title: "Productos reales para problemas que no caben en una plantilla.",
      intro:
        "Cada proyecto conecta estrategia, experiencia e ingeniería. No son ejercicios visuales: son sistemas diseñados alrededor de usuarios, reglas y restricciones reales.",
      openCase: "Explorar el caso",
      architecture: "Arquitectura y stack",
      challenge: "El problema",
      decision: "La solución",
      evidence: "Qué demuestra",
      closeCase: "Cerrar caso",
    },
    projects: [
      {
        id: "modavyr",
        index: "01",
        discipline: "SaaS modular / Telegram",
        name: "MODAVYR",
        thesis: "Una plataforma para lanzar aplicaciones completas dentro de Telegram.",
        summary:
          "Un núcleo multitenant que combina módulos reutilizables, personalización y desarrollo a medida para comercio, membresías, fidelización, comunidades y experiencias interactivas.",
        challenge:
          "Permitir que productos con reglas muy diferentes compartan identidad, organizaciones, facturación, analítica y canales sin convertir cada nueva aplicación en un bot aislado y difícil de mantener.",
        approach:
          "Separé la plataforma en Platform Core, App Core, módulos verticales y adaptadores de canal. Telegram Bot y Mini App traducen interacciones mientras las reglas de cada producto permanecen independientes del transporte.",
        evidence: [
          "RPG, Loyalty, Membership y Commerce sobre un mismo núcleo",
          "Telegram Bot y Mini App comparten usuarios, módulos y estado",
          "Organizaciones, permisos, billing, auditoría y analítica multitenant",
          "20 migraciones, 346 pruebas y hardening operativo documentado",
        ],
        stack: ["Next.js", "TypeScript", "tRPC", "PostgreSQL", "Prisma", "grammY", "Docker"],
        stage: "MVP privado funcional / en evolución",
      },
      {
        id: "kontado",
        index: "02",
        discipline: "Operaciones / Offline-first",
        name: "Kontado",
        thesis: "Un sistema operativo para negocios que no pueden depender de internet.",
        summary:
          "POS multinegocio para el contexto cubano. Reúne ventas, inventario, caja, gastos, restaurantes, servicios y producción en una aplicación que mantiene su núcleo operativo sin conexión.",
        challenge:
          "Modelar varios tipos de negocio, monedas, roles y flujos transaccionales sin asumir conectividad permanente ni una infraestructura central siempre disponible.",
        approach:
          "Una arquitectura local-first sobre Drift y SQLite, organizada por dominios. Cada negocio aísla datos y configuración, mientras permisos y migraciones mantienen el sistema gobernable a medida que crece.",
        evidence: [
          "15 versiones incrementales del esquema local",
          "35+ permisos y seis roles configurables",
          "Retail, restaurantes, servicios y operación mixta",
          "Pagos multimoneda, impresión térmica y respaldos",
        ],
        stack: ["Flutter", "Dart", "Riverpod", "Drift", "SQLite", "GoRouter"],
        stage: "Producto privado / completo",
      },
      {
        id: "nerd-vault",
        index: "03",
        discipline: "Marketplace / Integraciones",
        name: "Nerd Vault",
        thesis: "Descubrimiento multimedia conectado con vendedores locales.",
        summary:
          "Marketplace de dos lados donde las personas descubren películas, series, videojuegos y música, y encuentran vendedores cercanos capaces de entregarlos.",
        challenge:
          "Conectar catálogos globales con comercio local en un entorno de conectividad limitada, sin exponer credenciales externas ni agotar límites de API.",
        approach:
          "Supabase actúa como núcleo de datos y seguridad, Edge Functions como proxies con caché compartida, y Flutter mantiene una experiencia útil cuando la red desaparece.",
        evidence: [
          "Integración con TMDB, RAWG y LastFM",
          "PostgreSQL, Auth, Storage, Edge Functions y RLS",
          "Mapas, órdenes, reviews y panel para vendedores",
          "Caché offline y monetización adaptada a Apklis",
        ],
        stack: ["Flutter", "Supabase", "PostgreSQL", "Riverpod", "Hive", "Edge Functions"],
        stage: "Producto privado / completo",
      },
      {
        id: "numb3rs",
        index: "04",
        discipline: "Datos / Algoritmos",
        name: "Numb3rs",
        thesis: "Datos históricos convertidos en estrategias que se pueden comprobar.",
        summary:
          "Herramienta de estadísticas y probabilidades sobre la charada cubana, con exploración histórica, múltiples estrategias de predicción y evaluación mediante backtesting.",
        challenge:
          "Hacer legible un volumen amplio de resultados y separar intuición de evidencia sin presentar el análisis probabilístico como una garantía.",
        approach:
          "Estrategias desacopladas, métricas de frecuencia y atraso, comparación contra resultados históricos y una experiencia offline enfocada en exploración y transparencia.",
        evidence: [
          "Cinco estrategias de análisis implementadas",
          "Backtesting con eficiencia y aciertos por período",
          "Frecuencias, parejas, tríos y coapariciones",
          "Exportación de resultados a CSV y JSON",
        ],
        stack: ["Flutter", "Dart", "Riverpod", "Hive", "fl_chart", "get_it"],
        stage: "Producto privado / completo",
      },
    ],
    solutions: {
      eyebrow: "Qué podemos construir juntos",
      title: "Una idea clara. El sistema correcto para hacerla funcionar.",
      intro:
        "Trabajo desde el problema hasta el lanzamiento, escogiendo la arquitectura y la experiencia que necesita el producto, no las que impone una plantilla.",
      proofLabel: "Ver evidencia",
      items: [
        {
          index: "01",
          title: "Plataformas SaaS y productos modulares",
          description: "Organizaciones, roles, suscripciones, paneles, automatización y módulos capaces de crecer con el negocio.",
          projectId: "modavyr",
          proof: "MODAVYR",
        },
        {
          index: "02",
          title: "Aplicaciones para operaciones reales",
          description: "Ventas, inventario, administración, flujos internos y funcionamiento resiliente incluso con poca conectividad.",
          projectId: "kontado",
          proof: "Kontado",
        },
        {
          index: "03",
          title: "Marketplaces y productos para consumidores",
          description: "Catálogos, perfiles, órdenes, mapas, reputación e integraciones con servicios externos.",
          projectId: "nerd-vault",
          proof: "Nerd Vault",
        },
        {
          index: "04",
          title: "Productos basados en datos",
          description: "Dashboards, algoritmos, análisis histórico, reportes y herramientas que vuelven útil la información compleja.",
          projectId: "numb3rs",
          proof: "Numb3rs",
        },
      ],
    },
    building: {
      eyebrow: "En construcción",
      title: "Nuevos productos, nuevas preguntas difíciles.",
      intro:
        "Proyectos en desarrollo que muestran cómo exploro el dominio, valido la experiencia y construyo las reglas antes de acelerar.",
      items: [
        {
          name: "Plataforma Comunitaria",
          stage: "Prototipo + núcleo de dominio",
          thesis: "Infraestructura de confianza para que una comunidad pueda decidir, financiar y contratar con transparencia.",
          description:
            "Comunidades verificadas convierten necesidades en trabajos, recaudan fondos, comparan propuestas y liberan el pago cuando el resultado cumple un contrato verificable.",
          signal: "Gobernanza + financiación colectiva + marketplace + evidencia",
          evidence: [
            "Documento maestro de producto y 53 pantallas identificadas",
            "Prototipo interactivo mobile-first",
            "Estados paralelos de aprobación, ejecución y finanzas",
            "Ledger simulado de doble entrada y reglas de dominio probadas",
          ],
          stack: ["React", "TypeScript", "PostgreSQL", "Domain modeling", "Double-entry ledger"],
        },
        {
          name: "QuizThena",
          stage: "Prototipo técnico",
          thesis: "Aprendizaje convertido en progreso, competencia y descubrimiento.",
          description:
            "Exploración de una plataforma educativa basada en quizzes, progresión y competencia para niños y adolescentes.",
          signal: "Motor de quizzes + autenticación + paquetes desacoplados",
          evidence: [
            "Experiencia móvil orientada a sesiones cortas",
            "Progreso y competencia como bucle de participación",
          ],
          stack: ["Flutter", "BLoC", "Supabase", "Turborepo", "Apklis"],
        },
      ],
    },
    process: {
      eyebrow: "De idea a producto",
      title: "Un proceso claro para reducir incertidumbre sin frenar el avance.",
      intro:
        "Cada etapa deja una decisión o un entregable concreto. El objetivo es aprender temprano y construir sobre una base que permita seguir evolucionando.",
      items: [
        {
          index: "01",
          title: "Descubrir",
          description: "Aterrizamos el problema, las personas, el contexto y las restricciones que realmente definen el producto.",
          outcome: "Problema y oportunidad claros",
        },
        {
          index: "02",
          title: "Definir",
          description: "Diseñamos el alcance del MVP, los recorridos principales y las decisiones técnicas que evitan rehacer después.",
          outcome: "Alcance y dirección compartidos",
        },
        {
          index: "03",
          title: "Construir",
          description: "Conecto experiencia, frontend, backend, datos e integraciones en incrementos que se pueden probar.",
          outcome: "Producto funcional y verificable",
        },
        {
          index: "04",
          title: "Lanzar y evolucionar",
          description: "Preparamos el despliegue, observamos el uso y convertimos evidencia real en las siguientes mejoras.",
          outcome: "Una base preparada para crecer",
        },
      ],
    },
    contact: {
      eyebrow: "Tu próximo producto",
      title: "¿Tienes una aplicación en mente?",
      intro:
        "Cuéntame el problema, quién la utilizaría y en qué etapa se encuentra. Puedo ayudarte a definir el MVP, construirlo y preparar sus siguientes iteraciones.",
      email: "Cuéntame tu idea",
      linkedin: "Conectar en LinkedIn",
      github: "Explorar GitHub",
      note: "Normalmente respondo en 1–2 días laborables.",
    },
    footer: "Productos digitales diseñados y construidos con intención.",
  },
  en: {
    nav: {
      projects: "Projects",
      solutions: "What I build",
      process: "Process",
      contact: "Let's talk",
      menu: "Open navigation",
      close: "Close navigation",
      theme: "Change theme",
    },
    hero: {
      eyebrow: "Product design + engineering",
      headline: "I turn complex ideas into applications ready to be used.",
      intro:
        "I design and build digital products end to end: mobile applications, SaaS platforms, marketplaces, and systems for real-world operations.",
      workCta: "View projects",
      contactCta: "Tell me your idea",
      status: "Available for new projects",
      showcaseLabel: "Products designed and built by Ricardo Fundora",
      showcaseCaption: "From concept to product",
    },
    signals: [
      { value: "10 years", label: "building software" },
      { value: "End-to-end", label: "product, frontend, and backend" },
      { value: "Mobile + Web", label: "one vision, multiple surfaces" },
      { value: "ES / EN", label: "international collaboration" },
    ],
    work: {
      eyebrow: "Selected projects",
      title: "Real products for problems that do not fit a template.",
      intro:
        "Every project connects strategy, experience, and engineering. These are not visual exercises; they are systems designed around real users, rules, and constraints.",
      openCase: "Explore the case",
      architecture: "Architecture and stack",
      challenge: "The problem",
      decision: "The solution",
      evidence: "What it proves",
      closeCase: "Close case",
    },
    projects: [
      {
        id: "modavyr",
        index: "01",
        discipline: "Modular SaaS / Telegram",
        name: "MODAVYR",
        thesis: "A platform for launching complete applications inside Telegram.",
        summary:
          "A multi-tenant core combining reusable modules, customization, and bespoke development for commerce, memberships, loyalty, communities, and interactive experiences.",
        challenge:
          "Let products with very different rules share identity, organizations, billing, analytics, and channels without turning each new application into an isolated bot that is difficult to maintain.",
        approach:
          "I separated the platform into Platform Core, App Core, vertical modules, and channel adapters. Telegram Bot and Mini App translate interactions while each product's rules stay independent from transport.",
        evidence: [
          "RPG, Loyalty, Membership, and Commerce on one shared core",
          "Telegram Bot and Mini App share users, modules, and state",
          "Multi-tenant organizations, permissions, billing, audit, and analytics",
          "20 migrations, 346 tests, and documented operational hardening",
        ],
        stack: ["Next.js", "TypeScript", "tRPC", "PostgreSQL", "Prisma", "grammY", "Docker"],
        stage: "Functional private MVP / evolving",
      },
      {
        id: "kontado",
        index: "02",
        discipline: "Operations / Offline-first",
        name: "Kontado",
        thesis: "An operating system for businesses that cannot depend on the internet.",
        summary:
          "A multi-business POS for the Cuban context, bringing sales, inventory, cash, expenses, restaurants, services, and production into an application that keeps working offline.",
        challenge:
          "Model multiple business types, currencies, roles, and transactional flows without assuming permanent connectivity or always-available central infrastructure.",
        approach:
          "A local-first architecture on Drift and SQLite, organized by domain. Each business isolates its data and configuration while permissions and migrations keep the system governable as it grows.",
        evidence: [
          "15 incremental versions of the local schema",
          "35+ permissions and six configurable roles",
          "Retail, restaurants, services, and mixed operations",
          "Multi-currency payments, thermal printing, and backups",
        ],
        stack: ["Flutter", "Dart", "Riverpod", "Drift", "SQLite", "GoRouter"],
        stage: "Private product / complete",
      },
      {
        id: "nerd-vault",
        index: "03",
        discipline: "Marketplace / Integrations",
        name: "Nerd Vault",
        thesis: "Media discovery connected to local sellers.",
        summary:
          "A two-sided marketplace where people discover films, shows, games, and music, then find nearby sellers able to deliver them.",
        challenge:
          "Connect global catalogs to local commerce in a low-connectivity environment without exposing external credentials or exhausting API limits.",
        approach:
          "Supabase acts as the data and security core, Edge Functions as shared caching proxies, and Flutter keeps the experience useful when the network disappears.",
        evidence: [
          "TMDB, RAWG, and LastFM integrations",
          "PostgreSQL, Auth, Storage, Edge Functions, and RLS",
          "Maps, orders, reviews, and a seller dashboard",
          "Offline cache and Apklis-adapted monetization",
        ],
        stack: ["Flutter", "Supabase", "PostgreSQL", "Riverpod", "Hive", "Edge Functions"],
        stage: "Private product / complete",
      },
      {
        id: "numb3rs",
        index: "04",
        discipline: "Data / Algorithms",
        name: "Numb3rs",
        thesis: "Historical data turned into strategies that can be tested.",
        summary:
          "A statistics and probability tool for the Cuban charada, with historical exploration, multiple prediction strategies, and backtesting-based evaluation.",
        challenge:
          "Make a large set of results legible and separate intuition from evidence without presenting probabilistic analysis as a guarantee.",
        approach:
          "Decoupled strategies, frequency and delay metrics, comparison against historical results, and an offline experience focused on exploration and transparency.",
        evidence: [
          "Five implemented analysis strategies",
          "Backtesting with efficiency and hits by period",
          "Frequencies, pairs, trios, and co-occurrences",
          "CSV and JSON result exports",
        ],
        stack: ["Flutter", "Dart", "Riverpod", "Hive", "fl_chart", "get_it"],
        stage: "Private product / complete",
      },
    ],
    solutions: {
      eyebrow: "What we can build together",
      title: "A clear idea. The right system to make it work.",
      intro:
        "I work from the problem through launch, choosing the architecture and experience the product needs rather than those imposed by a template.",
      proofLabel: "View evidence",
      items: [
        { index: "01", title: "SaaS platforms and modular products", description: "Organizations, roles, subscriptions, dashboards, automation, and modules that can grow with the business.", projectId: "modavyr", proof: "MODAVYR" },
        { index: "02", title: "Applications for real-world operations", description: "Sales, inventory, administration, internal workflows, and resilient operation even with limited connectivity.", projectId: "kontado", proof: "Kontado" },
        { index: "03", title: "Marketplaces and consumer products", description: "Catalogs, profiles, orders, maps, reputation, and integrations with external services.", projectId: "nerd-vault", proof: "Nerd Vault" },
        { index: "04", title: "Data-driven products", description: "Dashboards, algorithms, historical analysis, reports, and tools that make complex information useful.", projectId: "numb3rs", proof: "Numb3rs" },
      ],
    },
    building: {
      eyebrow: "Now building",
      title: "New products, new difficult questions.",
      intro:
        "Work in progress showing how I explore a domain, validate the experience, and build the rules before accelerating.",
      items: [
        {
          name: "Community Platform",
          stage: "Prototype + domain core",
          thesis: "Trust infrastructure for communities to decide, fund, and hire transparently.",
          description:
            "Verified communities turn needs into work, collectively fund solutions, compare proposals, and release payment when the result fulfills a verifiable contract.",
          signal: "Governance + collective funding + marketplace + evidence",
          evidence: [
            "Product master document and 53 identified screens",
            "Interactive mobile-first prototype",
            "Parallel approval, execution, and financial states",
            "Simulated double-entry ledger and tested domain rules",
          ],
          stack: ["React", "TypeScript", "PostgreSQL", "Domain modeling", "Double-entry ledger"],
        },
        {
          name: "QuizThena",
          stage: "Technical prototype",
          thesis: "Learning turned into progress, competition, and discovery.",
          description:
            "An exploration of a quiz, progression, and competition-based learning platform for children and teenagers.",
          signal: "Quiz engine + authentication + decoupled packages",
          evidence: ["Mobile experience for short sessions", "Progress and competition as the engagement loop"],
          stack: ["Flutter", "BLoC", "Supabase", "Turborepo", "Apklis"],
        },
      ],
    },
    process: {
      eyebrow: "From idea to product",
      title: "A clear process to reduce uncertainty without slowing progress.",
      intro:
        "Every stage leaves a concrete decision or deliverable. The goal is to learn early and build on a foundation that can keep evolving.",
      items: [
        { index: "01", title: "Discover", description: "We ground the problem, people, context, and constraints that truly define the product.", outcome: "A clear problem and opportunity" },
        { index: "02", title: "Define", description: "We design the MVP scope, key journeys, and technical decisions that prevent expensive rework later.", outcome: "Shared scope and direction" },
        { index: "03", title: "Build", description: "I connect experience, frontend, backend, data, and integrations in increments that can be tested.", outcome: "A functional, verifiable product" },
        { index: "04", title: "Launch and evolve", description: "We prepare deployment, observe usage, and turn real evidence into the next improvements.", outcome: "A foundation ready to grow" },
      ],
    },
    contact: {
      eyebrow: "Your next product",
      title: "Do you have an application in mind?",
      intro:
        "Tell me about the problem, who would use it, and what stage it is in. I can help you define the MVP, build it, and prepare its next iterations.",
      email: "Tell me your idea",
      linkedin: "Connect on LinkedIn",
      github: "Explore GitHub",
      note: "I usually reply within 1–2 business days.",
    },
    footer: "Digital products designed and built with intention.",
  },
};
