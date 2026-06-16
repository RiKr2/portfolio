import type { Content } from "./types";

export const es: Content = {
  meta: {
    title: "Ricardo Fundora — Senior Software Engineer",
    description:
      "Senior Software Engineer especializado en backend (Python / .NET) y desarrollo full-stack. +5 años en remoto para empresas internacionales.",
  },
  nav: {
    langLabel: "EN",
    themeLabel: "tema",
    langSwitch: "Cambiar a inglés",
    themeSwitch: "Cambiar tema",
  },
  hero: {
    name: "Ricardo Fundora Hernández",
    role: "Senior Software Engineer · Backend (Python / .NET) · Full-Stack · Remoto",
    bootCommand: "whoami",
    tagline:
      "Ingeniero de software desde 2016. +5 años construyendo backends, APIs REST y automatización en remoto para equipos internacionales.",
    prompt: "ricardo@portfolio:~$",
    hint: "Escribe un comando (prueba `help`) o toca uno abajo",
  },
  commands: {
    help: "Comandos disponibles: about · experience · skills · education · publication · contact · theme · lang · clear",
    unknown: "comando no encontrado. Escribe `help` para ver la lista.",
    cleared: "",
    sectionEcho: "abriendo",
  },
  sections: {
    about: {
      heading: "Sobre mí",
      body: [
        "Ingeniero de software con experiencia desde 2016 y +5 años trabajando en remoto para empresas internacionales.",
        "Especializado en desarrollo backend con Python y .NET — construcción de APIs REST, automatización de procesos y full-stack según las necesidades del proyecto.",
      ],
    },
    experience: {
      heading: "Experiencia",
      items: [
        {
          company: "Selector",
          role: "Full-Stack Developer",
          period: "Ene 2026 – Presente",
          remote: true,
          stack: ["AI", "AWS", "TypeScript", "Python"],
        },
        {
          company: "GSI – General Software Inc",
          role: "Backend Developer (Tiempo completo)",
          period: "Jul 2022 – Presente",
          stack: ["C#", "Docker", "PHP", "Python", "YAML", "Postman"],
        },
        {
          company: "AlayaCare",
          role: "Backend Developer",
          period: "Dic 2022 – Ago 2025",
          description:
            "Plataforma cloud para agencias de cuidado domiciliario. Desarrolló soluciones de facturación (general y personalizada) y optimizó la recuperación de datos y procesos backend.",
          stack: ["PHP", "JavaScript", "Vue.js", "Python", "Docker", "AWS"],
        },
        {
          company: "Wisegar",
          role: "Software Developer (Medio tiempo)",
          period: "Mar 2020 – Jul 2022",
          stack: ["C#"],
        },
      ],
    },
    skills: {
      heading: "Skills",
      groups: [
        {
          label: "Lenguajes",
          items: ["Python", "C#", "PHP", "JavaScript", "TypeScript", "C++", "Dart", "Solidity"],
        },
        {
          label: "Frameworks / Librerías",
          items: ["Django", "ASP.NET Core", "ASP.NET Razor", "Vue.js", "React.js", "Node.js", "Flutter", "Bootstrap"],
        },
        { label: "Bases de datos", items: ["PostgreSQL", "MongoDB", "NoSQL"] },
        {
          label: "DevOps / Herramientas",
          items: ["Docker", "Git", "AWS", "YAML", "Postman", "Odoo", "WordPress", "Unity3D"],
        },
        {
          label: "Conceptos",
          items: ["OOP", "Algoritmos", "Estructuras de datos", "Desarrollo Web", "Game Dev", "Blockchain", "Virtualización", "Mobile Game Dev"],
        },
      ],
    },
    education: {
      heading: "Formación y certificaciones",
      items: [
        { title: "Lic. en Ciencias de la Computación", org: "Universidad de La Habana", period: "2011 – 2016" },
        {
          title: "Foundational C# with Microsoft",
          org: "freeCodeCamp",
          period: "Mayo 2024",
          credentialId: "rikr2-fcswm",
        },
      ],
    },
    publication: {
      heading: "Publicación",
      title: "Conjunto de herramientas citogenéticas para el trabajo con cromosomas",
      venue: "ResearchGate · Universidad de La Habana (proyecto de graduación)",
      date: "Jun 2016",
      summary:
        "Sistema de construcción semi-automática de cariotipos con ~54% de precisión en la clasificación de cromosomas.",
      link: "https://www.researchgate.net/",
      linkLabel: "ver en ResearchGate",
    },
    contact: {
      heading: "Contacto",
      intro: "Abierto a oportunidades remotas. Escríbeme a:",
      emailLabel: "email",
      githubLabel: "github",
      linkedinLabel: "linkedin",
    },
  },
  footer: { builtWith: "Hecho con Next.js, desplegado en Vercel.", viewSource: "ver código" },
};
