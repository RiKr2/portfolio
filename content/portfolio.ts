export type Locale = "es" | "en";
export type ProjectId = "kontado" | "nerd-vault" | "numb3rs";

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

export interface PortfolioContent {
  nav: {
    work: string;
    lab: string;
    experience: string;
    about: string;
    contact: string;
    menu: string;
    close: string;
    theme: string;
  };
  hero: {
    eyebrow: string;
    name: string;
    role: string;
    intro: string;
    workCta: string;
    contactCta: string;
    status: string;
    canvasLabel: string;
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
  lab: {
    eyebrow: string;
    title: string;
    intro: string;
    items: {
      name: string;
      stage: string;
      description: string;
      stack: string[];
      signal: string;
    }[];
  };
  principles: {
    eyebrow: string;
    title: string;
    items: { index: string; title: string; description: string }[];
  };
  experience: {
    eyebrow: string;
    title: string;
    intro: string;
    items: {
      period: string;
      company: string;
      role: string;
      description?: string;
      stack: string[];
    }[];
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    educationLabel: string;
    education: string;
    publicationLabel: string;
    publication: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    email: string;
    linkedin: string;
    github: string;
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
      work: "Trabajo",
      lab: "Laboratorio",
      experience: "Experiencia",
      about: "Perfil",
      contact: "Hablemos",
      menu: "Abrir navegación",
      close: "Cerrar navegación",
      theme: "Cambiar tema",
    },
    hero: {
      eyebrow: "Ricardo Fundora / Product Engineer",
      name: "Ricardo Fundora",
      role: "Backend-minded product engineer.",
      intro:
        "Diseño y construyo productos completos para problemas que exigen reglas claras, sistemas sólidos y una ejecución cuidadosa.",
      workCta: "Explorar trabajo",
      contactCta: "Iniciar conversación",
      status: "Disponible para proyectos seleccionados",
      canvasLabel: "Mapa de productos",
    },
    signals: [
      { value: "2016", label: "Construyendo software desde" },
      { value: "5+ años", label: "Trabajo remoto internacional" },
      { value: "5 productos", label: "Diseñados y construidos en solitario" },
      { value: "ES / EN", label: "Colaboración sin fronteras" },
    ],
    work: {
      eyebrow: "Trabajo seleccionado",
      title: "Productos donde la complejidad tiene un propósito.",
      intro:
        "Cada caso parte de un dominio distinto. Los une la misma disciplina: comprender las reglas, diseñar el sistema y llevarlo hasta una experiencia usable.",
      openCase: "Abrir caso",
      architecture: "Arquitectura",
      challenge: "El reto",
      decision: "La decisión",
      evidence: "Evidencia construida",
      closeCase: "Cerrar caso",
    },
    projects: [
      {
        id: "kontado",
        index: "01",
        discipline: "Operaciones / Offline-first",
        name: "Kontado",
        thesis: "Un sistema operativo para negocios que no pueden depender de internet.",
        summary:
          "POS multinegocio para el contexto cubano. Reúne ventas, inventario, caja, gastos, restaurantes, servicios y producción en una aplicación que mantiene su núcleo operativo sin conexión.",
        challenge:
          "Modelar varios tipos de negocio, monedas, roles y flujos transaccionales sin asumir conectividad permanente ni una infraestructura central disponible.",
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
        index: "02",
        discipline: "Marketplace / Integraciones",
        name: "Nerd Vault",
        thesis: "Descubrimiento multimedia conectado con vendedores locales.",
        summary:
          "Marketplace de dos lados donde las personas descubren películas, series, videojuegos y música, y encuentran vendedores cercanos capaces de entregarlos.",
        challenge:
          "Conectar catálogos globales con comercio local en un entorno de conectividad limitada, sin exponer credenciales externas ni agotar límites de API.",
        approach:
          "Supabase como núcleo de datos y seguridad, Edge Functions como proxies con caché compartida, y una aplicación Flutter preparada para degradarse con datos locales cuando la red desaparece.",
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
        index: "03",
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
    lab: {
      eyebrow: "Product Lab",
      title: "La curiosidad también necesita un lugar para crecer.",
      intro:
        "Sistemas en construcción donde exploro motores de juego, experiencias educativas y nuevas formas de convertir reglas en interacción.",
      items: [
        {
          name: "SaaS RPG para Telegram",
          stage: "En construcción",
          description:
            "Plataforma visual para crear juegos de texto modulares sin código. Combina dashboard, motor de juego, bots multi-tenant, billing e integración con Telegram.",
          stack: ["Next.js", "TypeScript", "tRPC", "Prisma", "PostgreSQL", "grammY"],
          signal: "Motor modular + webhooks + estado versionado",
        },
        {
          name: "QuizThena",
          stage: "Prototipo técnico",
          description:
            "Exploración de una plataforma educativa basada en quizzes, progreso y competencia para niños y adolescentes.",
          stack: ["Flutter", "BLoC", "Supabase", "Turborepo", "Apklis"],
          signal: "Motor de quizzes + auth + paquetes desacoplados",
        },
      ],
    },
    principles: {
      eyebrow: "Cómo construyo",
      title: "Decisiones técnicas conectadas con el producto.",
      items: [
        {
          index: "A",
          title: "Modelar antes de acelerar",
          description: "Entender actores, estados y restricciones evita que la arquitectura persiga al producto más tarde.",
        },
        {
          index: "B",
          title: "Diseñar para el contexto",
          description: "Conectividad, pagos, dispositivos y hábitos reales son parte del sistema, no notas al margen.",
        },
        {
          index: "C",
          title: "Profundidad sin fricción",
          description: "La complejidad puede vivir debajo. La persona que usa el producto no tiene por qué cargar con ella.",
        },
        {
          index: "D",
          title: "Hacer visible el criterio",
          description: "Documentar decisiones, límites y próximos pasos vuelve al producto más fácil de mejorar y mantener.",
        },
      ],
    },
    experience: {
      eyebrow: "Trayectoria",
      title: "Backend primero. Producto siempre presente.",
      intro:
        "Experiencia remota construyendo APIs, automatizaciones y sistemas para equipos internacionales, junto a productos propios desarrollados de extremo a extremo.",
      items: [
        {
          period: "2026 — hoy",
          company: "Selector",
          role: "Full-Stack Developer",
          stack: ["AI", "AWS", "TypeScript", "Python"],
        },
        {
          period: "2022 — hoy",
          company: "General Software Inc.",
          role: "Backend Developer",
          stack: ["C#", "Python", "PHP", "Docker"],
        },
        {
          period: "2022 — 2025",
          company: "AlayaCare",
          role: "Backend Developer",
          description: "Soluciones de facturación y optimización de recuperación de datos para una plataforma cloud de cuidado domiciliario.",
          stack: ["PHP", "Python", "Vue", "AWS", "Docker"],
        },
        {
          period: "2020 — 2022",
          company: "Wisegar",
          role: "Software Developer",
          stack: ["C#", ".NET"],
        },
      ],
    },
    about: {
      eyebrow: "Perfil",
      title: "Ingeniería con curiosidad de constructor.",
      paragraphs: [
        "Soy ingeniero de software cubano, graduado de Ciencias de la Computación y desarrollador desde 2016. Mi especialidad es backend, pero trabajo de extremo a extremo cuando el producto lo necesita.",
        "Me atraen los dominios con reglas difíciles, los sistemas que deben funcionar bajo restricciones reales y el desarrollo de videojuegos como espacio para experimentar con interacción, progresión y mundos vivos.",
      ],
      educationLabel: "Formación",
      education: "Licenciatura en Ciencias de la Computación · Universidad de La Habana · 2011—2016",
      publicationLabel: "Investigación",
      publication: "Herramientas citogenéticas para la construcción semiautomática de cariotipos · 2016",
    },
    contact: {
      eyebrow: "Contacto",
      title: "¿Hay un producto difícil que merece existir?",
      intro: "Disponible para productos, colaboraciones técnicas y conversaciones donde el reto sea parte del atractivo.",
      email: "Escribir por email",
      linkedin: "Conectar en LinkedIn",
      github: "Explorar GitHub",
    },
    footer: "Diseñado y construido por Ricardo Fundora.",
  },
  en: {
    nav: {
      work: "Work",
      lab: "Lab",
      experience: "Experience",
      about: "Profile",
      contact: "Let's talk",
      menu: "Open navigation",
      close: "Close navigation",
      theme: "Change theme",
    },
    hero: {
      eyebrow: "Ricardo Fundora / Product Engineer",
      name: "Ricardo Fundora",
      role: "Backend-minded product engineer.",
      intro:
        "I design and build complete products for problems that demand clear rules, solid systems, and thoughtful execution.",
      workCta: "Explore work",
      contactCta: "Start a conversation",
      status: "Available for selected projects",
      canvasLabel: "Product map",
    },
    signals: [
      { value: "2016", label: "Building software since" },
      { value: "5+ years", label: "International remote work" },
      { value: "5 products", label: "Designed and built independently" },
      { value: "ES / EN", label: "Borderless collaboration" },
    ],
    work: {
      eyebrow: "Selected work",
      title: "Products where complexity serves a purpose.",
      intro:
        "Each case starts in a different domain. The discipline is the same: understand the rules, design the system, and carry it into a usable experience.",
      openCase: "Open case",
      architecture: "Architecture",
      challenge: "The challenge",
      decision: "The decision",
      evidence: "Evidence built",
      closeCase: "Close case",
    },
    projects: [
      {
        id: "kontado",
        index: "01",
        discipline: "Operations / Offline-first",
        name: "Kontado",
        thesis: "An operating system for businesses that cannot depend on the internet.",
        summary:
          "A multi-business POS built for the Cuban context. It brings sales, inventory, cash management, expenses, restaurants, services, and production into an application whose core remains operational offline.",
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
        index: "02",
        discipline: "Marketplace / Integrations",
        name: "Nerd Vault",
        thesis: "Media discovery connected to local sellers.",
        summary:
          "A two-sided marketplace where people discover movies, series, games, and music, then find nearby sellers able to deliver them.",
        challenge:
          "Connect global catalogs to local commerce in a low-connectivity environment without exposing external credentials or exhausting API limits.",
        approach:
          "Supabase as the data and security core, Edge Functions as shared caching proxies, and a Flutter application built to degrade to local data when the network disappears.",
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
        index: "03",
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
    lab: {
      eyebrow: "Product Lab",
      title: "Curiosity needs room to grow, too.",
      intro:
        "Systems in progress where I explore game engines, learning experiences, and new ways to turn rules into interaction.",
      items: [
        {
          name: "Telegram RPG SaaS",
          stage: "In progress",
          description:
            "A visual platform for building modular text games without code. It combines a dashboard, game engine, multi-tenant bots, billing, and Telegram integration.",
          stack: ["Next.js", "TypeScript", "tRPC", "Prisma", "PostgreSQL", "grammY"],
          signal: "Modular engine + webhooks + versioned state",
        },
        {
          name: "QuizThena",
          stage: "Technical prototype",
          description:
            "An exploration of a quiz, progression, and competition-based learning platform for children and teenagers.",
          stack: ["Flutter", "BLoC", "Supabase", "Turborepo", "Apklis"],
          signal: "Quiz engine + auth + decoupled packages",
        },
      ],
    },
    principles: {
      eyebrow: "How I build",
      title: "Technical decisions connected to the product.",
      items: [
        {
          index: "A",
          title: "Model before accelerating",
          description: "Understanding actors, states, and constraints keeps architecture from chasing the product later.",
        },
        {
          index: "B",
          title: "Design for context",
          description: "Connectivity, payments, devices, and real habits are part of the system, not side notes.",
        },
        {
          index: "C",
          title: "Depth without friction",
          description: "Complexity can live underneath. The person using the product should not have to carry it.",
        },
        {
          index: "D",
          title: "Make judgment visible",
          description: "Documenting decisions, limits, and next steps makes products easier to improve and maintain.",
        },
      ],
    },
    experience: {
      eyebrow: "Experience",
      title: "Backend first. Product always present.",
      intro:
        "Remote experience building APIs, automation, and systems for international teams, alongside independently designed end-to-end products.",
      items: [
        {
          period: "2026 — now",
          company: "Selector",
          role: "Full-Stack Developer",
          stack: ["AI", "AWS", "TypeScript", "Python"],
        },
        {
          period: "2022 — now",
          company: "General Software Inc.",
          role: "Backend Developer",
          stack: ["C#", "Python", "PHP", "Docker"],
        },
        {
          period: "2022 — 2025",
          company: "AlayaCare",
          role: "Backend Developer",
          description: "Billing solutions and data-retrieval optimization for a cloud home-care platform.",
          stack: ["PHP", "Python", "Vue", "AWS", "Docker"],
        },
        {
          period: "2020 — 2022",
          company: "Wisegar",
          role: "Software Developer",
          stack: ["C#", ".NET"],
        },
      ],
    },
    about: {
      eyebrow: "Profile",
      title: "Engineering with a builder's curiosity.",
      paragraphs: [
        "I am a Cuban software engineer, Computer Science graduate, and developer since 2016. Backend is my specialty, but I work end-to-end whenever the product needs it.",
        "I am drawn to domains with difficult rules, systems that must work under real constraints, and game development as a space to experiment with interaction, progression, and living worlds.",
      ],
      educationLabel: "Education",
      education: "BSc in Computer Science · University of Havana · 2011—2016",
      publicationLabel: "Research",
      publication: "Cytogenetic tools for semi-automatic karyotype construction · 2016",
    },
    contact: {
      eyebrow: "Contact",
      title: "Is there a difficult product worth building?",
      intro: "Available for products, technical collaborations, and conversations where the challenge is part of the appeal.",
      email: "Write an email",
      linkedin: "Connect on LinkedIn",
      github: "Explore GitHub",
    },
    footer: "Designed and built by Ricardo Fundora.",
  },
};
