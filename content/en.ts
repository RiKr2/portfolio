import type { Content } from "./types";

export const en: Content = {
  meta: {
    title: "Ricardo Fundora — Senior Software Engineer",
    description:
      "Senior Software Engineer specialized in backend (Python / .NET) and full-stack development. 5+ years remote for international companies.",
  },
  nav: {
    langLabel: "ES",
    themeLabel: "theme",
    langSwitch: "Switch to Spanish",
    themeSwitch: "Toggle theme",
  },
  hero: {
    name: "Ricardo Fundora Hernández",
    role: "Senior Software Engineer · Backend (Python / .NET) · Full-Stack · Remote",
    bootCommand: "whoami",
    tagline:
      "Software engineer since 2016. 5+ years building backends, REST APIs and automation remotely for international teams.",
    prompt: "ricardo@portfolio:~$",
    hint: "Type a command (try `help`) or tap one below",
  },
  commands: {
    help: "Available commands: about · experience · skills · education · publication · contact · theme · lang · clear",
    unknown: "command not found. Type `help` for the list.",
    cleared: "",
    sectionEcho: "opening",
  },
  sections: {
    about: {
      heading: "About",
      body: [
        "Software engineer with experience since 2016 and 5+ years working remotely for international companies.",
        "Specialized in backend development with Python and .NET — building REST APIs, automating processes, and going full-stack when the project needs it.",
      ],
    },
    experience: {
      heading: "Experience",
      items: [
        {
          company: "Selector",
          role: "Full-Stack Developer",
          period: "Jan 2026 – Present",
          remote: true,
          stack: ["AI", "AWS", "TypeScript", "Python"],
        },
        {
          company: "GSI – General Software Inc",
          role: "Backend Developer (Full-time)",
          period: "Jul 2022 – Present",
          stack: ["C#", "Docker", "PHP", "Python", "YAML", "Postman"],
        },
        {
          company: "AlayaCare",
          role: "Backend Developer",
          period: "Dec 2022 – Aug 2025",
          description:
            "Cloud platform for home-care agencies. Built billing solutions (general and custom) and optimized data retrieval and backend processes.",
          stack: ["PHP", "JavaScript", "Vue.js", "Python", "Docker", "AWS"],
        },
        {
          company: "Wisegar",
          role: "Software Developer (Part-time)",
          period: "Mar 2020 – Jul 2022",
          stack: ["C#"],
        },
      ],
    },
    skills: {
      heading: "Skills",
      groups: [
        {
          label: "Languages",
          items: ["Python", "C#", "PHP", "JavaScript", "TypeScript", "C++", "Dart", "Solidity"],
        },
        {
          label: "Frameworks / Libraries",
          items: ["Django", "ASP.NET Core", "ASP.NET Razor", "Vue.js", "React.js", "Node.js", "Flutter", "Bootstrap"],
        },
        { label: "Databases", items: ["PostgreSQL", "MongoDB", "NoSQL"] },
        {
          label: "DevOps / Tools",
          items: ["Docker", "Git", "AWS", "YAML", "Postman", "Odoo", "WordPress", "Unity3D"],
        },
        {
          label: "Concepts",
          items: ["OOP", "Algorithms", "Data Structures", "Web Dev", "Game Dev", "Blockchain", "Virtualization", "Mobile Game Dev"],
        },
      ],
    },
    education: {
      heading: "Education & Certifications",
      items: [
        { title: "B.Sc. Computer Science", org: "Universidad de La Habana", period: "2011 – 2016" },
        {
          title: "Foundational C# with Microsoft",
          org: "freeCodeCamp",
          period: "May 2024",
          credentialId: "rikr2-fcswm",
        },
      ],
    },
    publication: {
      heading: "Publication",
      title: "Conjunto de herramientas citogenéticas para el trabajo con cromosomas",
      venue: "ResearchGate · Universidad de La Habana (graduation project)",
      date: "Jun 2016",
      summary:
        "Semi-automatic karyotype construction system reaching ~54% accuracy in chromosome classification.",
      link: "https://www.researchgate.net/",
      linkLabel: "view on ResearchGate",
    },
    contact: {
      heading: "Contact",
      intro: "Open to remote opportunities. Reach me at:",
      emailLabel: "email",
      githubLabel: "github",
      linkedinLabel: "linkedin",
    },
  },
  footer: { builtWith: "Built with Next.js, deployed on Vercel.", viewSource: "view source" },
};
