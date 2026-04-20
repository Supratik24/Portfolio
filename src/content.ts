export type Accent = "acid" | "ember";

export type SocialLinks = {
  github: string;
  email?: string;
  linkedin?: string;
  x?: string;
  website?: string;
};

export type Project = {
  slug: string;
  title: string;
  impactMetric: string;
  oneLiner: string;
  role: string;
  tech: string[];
  links: { live?: string; github?: string };
  coverImage?: string;
  screenshots?: { src: string; caption?: string }[];
  caseStudy?: {
    problem: string;
    constraints: string[];
    approach: string[];
    results: string[];
  };
};

export type ExperienceItem = {
  company: string;
  role: string;
  dates: string;
  achievements: string[];
};

export type Post = {
  id?: string;
  title: string;
  date: string;
  excerpt: string;
  body?: string;
};

export type Person = {
  name: string;
  kicker: string;
  tagline: string;
  bioLine: string;
  location: string;
  portraitUrl?: string;
  portraitFit?: "cover" | "contain";
  portraitPosX?: number;
  portraitPosY?: number;
  stats: { label: string; value: string }[];
};

export type AboutContent = {
  paragraphs: string[];
  values: { title: string; body: string }[];
  toolset: string[];
};

export type SiteProfile = {
  person: Person;
  socials: SocialLinks;
  about: AboutContent;
};

export const person: Person = {
  name: "Supratik Sangram",
  kicker: "Full-Stack Web Developer",
  tagline: "I build modern web products with clean UI, practical backend systems, and thoughtful user flow.",
  bioLine:
    "Focused on web development with React, JavaScript, Node.js, Express, MongoDB, and product-minded interface design.",
  location: "React / Node / MongoDB",
  stats: [
    { label: "Repos", value: "5" },
    { label: "Focus", value: "Web Dev" },
    { label: "Stack", value: "MERN" },
  ],
};

export const socials: SocialLinks = {
  github: "https://github.com/Supratik24",
  email: "supratiksangram9@gmail.com",
  linkedin: "https://www.linkedin.com/in/supratik26",
};

export const about: AboutContent = {
  paragraphs: [
    "I like building web apps that feel polished on the surface and reliable underneath. Good UI is important to me, but so is the data flow behind it.",
    "Most of my recent work sits in the full-stack web space: responsive frontends, admin dashboards, REST APIs, MongoDB-backed features, and projects that are easier to extend over time.",
  ],
  values: [
    { title: "Clarity", body: "Interfaces should guide people quickly without making them think too hard." },
    { title: "Structure", body: "Clean components, predictable APIs, and sensible data models make projects easier to grow." },
    { title: "Speed", body: "Fast feedback, responsive layouts, and efficient flows make software feel better immediately." },
    { title: "Polish", body: "Small details like spacing, hierarchy, and micro-interactions change how a product is remembered." },
  ],
  toolset: [
    "React / Vite",
    "JavaScript / TypeScript",
    "Node.js / Express",
    "MongoDB / Mongoose",
    "Tailwind CSS",
    "REST APIs",
    "Responsive UI",
    "Git / GitHub",
  ],
};

export const siteProfile: SiteProfile = {
  person,
  socials,
  about,
};

export const resumeLinks = {
  html: "/resume.html",
  pdf: "/resume.pdf",
} as const;

export const resumeSnapshot = {
  lastUpdated: "Mar 26, 2026",
  contact: {
    email: "supratiksangram9@gmail.com",
    githubLabel: "github.com/Supratik24 (@Supratik24)",
    githubUrl: "https://github.com/Supratik24",
    linkedinLabel: "linkedin.com/in/supratik26",
    linkedinUrl: "https://www.linkedin.com/in/supratik26",
  },
  skillChips: ["React", "JavaScript", "TypeScript", "Node.js", "Express", "MongoDB", "Tailwind CSS", "REST APIs"],
  highlights: [
    "Built public full-stack projects across ecommerce, dashboard-style apps, and portfolio development.",
    "Worked with React frontends, Node and Express backends, and MongoDB-driven content and data flows.",
    "Interested in polished interfaces, admin systems, and scalable web architecture.",
    "Learning by shipping projects to GitHub and improving them through iteration.",
  ],
} as const;

export const projectsStatic: Project[] = [
  {
    slug: "luxeva",
    title: "Luxeva Commerce Platform",
    impactMetric: "React storefront + Node microservices + MongoDB + Redis",
    oneLiner:
      "A full-stack ecommerce platform with a premium storefront, a hidden role-protected admin portal, and service-based backend architecture.",
    role: "Full-stack Developer",
    tech: ["React", "Node.js", "Express", "MongoDB", "Redis", "Tailwind CSS", "JWT"],
    links: { github: "https://github.com/Supratik24/Luxeva" },
    caseStudy: {
      problem:
        "I wanted to build an ecommerce project that felt polished on the frontend while still showing real backend structure and admin capability.",
      constraints: [
        "Support a premium browsing experience with filters, wishlist, cart, checkout, and account flows.",
        "Keep admin features protected and role-aware instead of mixing them into the public storefront.",
        "Design the backend so catalog, orders, content, and notifications can evolve independently.",
      ],
      approach: [
        "Built the storefront in React with a strong focus on responsiveness, search, motion, and clean product presentation.",
        "Split backend responsibilities into gateway and dedicated services for auth, catalog, orders, content, and notifications.",
        "Used MongoDB for application data and Redis for cache, token invalidation, and event-style coordination.",
      ],
      results: [
        "Created a strong end-to-end web development showcase with both customer and admin experiences.",
        "Added seed data and local development support so the platform is easier to run and demo.",
        "Demonstrated practical work across UI, backend APIs, database design, and architecture decisions.",
      ],
    },
  },
  {
    slug: "adnode",
    title: "Adnode",
    impactMetric: "Dashboard-style product with MongoDB analytics and multi-role flows",
    oneLiner:
      "A web platform for decentralized advertising with dashboards for advertisers and hosts, backed by API logic, analytics, and payout workflows.",
    role: "Full-stack Developer",
    tech: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS", "REST APIs", "Solidity"],
    links: { github: "https://github.com/Supratik24/Adnode" },
    caseStudy: {
      problem:
        "I wanted to turn a complex idea into something users could navigate clearly through dashboards, role-based flows, and readable system feedback.",
      constraints: [
        "Different user roles needed different actions and different surfaces.",
        "Campaigns, placements, and analytics had to feel understandable rather than overly technical.",
        "The product had to connect frontend experience with backend logic and persistent data.",
      ],
      approach: [
        "Structured the app around advertiser, host, and viewer flows with dedicated pages and actions.",
        "Added MongoDB-backed data for users, campaigns, placements, and analytics-oriented features.",
        "Focused on UI polish, reusable feedback states, and a dashboard experience that still feels product-like.",
      ],
      results: [
        "Built a richer full-stack demo that combines backend workflows with a modern web UI.",
        "Showed practical experience with data modeling, route design, and multi-role product structure.",
        "Created a project that stands out visually while still demonstrating technical depth.",
      ],
    },
  },
  {
    slug: "portfolio",
    title: "Personal Portfolio",
    impactMetric: "Responsive single-page portfolio focused on presentation and first impression",
    oneLiner:
      "A personal portfolio project built to showcase projects, contact details, and a cleaner personal brand on the web.",
    role: "Frontend Developer",
    tech: ["JavaScript", "HTML", "CSS", "Responsive Design", "UI Design"],
    links: { github: "https://github.com/Supratik24/Portfolio" },
    caseStudy: {
      problem:
        "A plain GitHub profile does not always communicate design taste or product thinking, so I wanted a cleaner presentation layer for my work.",
      constraints: [
        "The site had to stay simple and lightweight.",
        "It still needed enough visual identity to feel like a real portfolio instead of a default template.",
        "Project and contact information had to be easy to scan quickly.",
      ],
      approach: [
        "Focused on layout, spacing, visual hierarchy, and responsive behavior.",
        "Kept the stack simple so iteration stayed fast while refining the look and feel.",
        "Treated the portfolio as both a showcase project and a branding exercise.",
      ],
      results: [
        "Created a stronger online first impression for projects and personal work.",
        "Improved how projects and contact information are presented to recruiters and collaborators.",
        "Used the project as a base for continued UI experimentation and portfolio upgrades.",
      ],
    },
  },
];

// Projects are fetched from `/api/site/projects` (MongoDB) and managed in `/admin`.
// Keep a strong fallback so the portfolio still looks complete without a database connection.
export const projects: Project[] = projectsStatic;

export const experience: ExperienceItem[] = [
  {
    company: "Independent Projects",
    role: "Full-stack Web Developer",
    dates: "2025 - Present",
    achievements: [
      "Built public web projects across ecommerce, portfolio development, and backend tooling.",
      "Worked across React and Next.js frontends, Express APIs, and MongoDB-backed application flows.",
      "Focused on readable UI, practical feature sets, and projects that can be extended over time.",
    ],
  },
  {
    company: "Frontend and UI Work",
    role: "UI-focused Builder",
    dates: "2026",
    achievements: [
      "Designed portfolio and product interfaces with stronger hierarchy, spacing, and responsive behavior.",
      "Used motion, component structure, and cleaner visual rhythm to improve user experience.",
      "Treated frontend work as product communication, not just page assembly.",
    ],
  },
  {
    company: "Backend and Data Layer",
    role: "Node.js / MongoDB Builder",
    dates: "2025 - Present",
    achievements: [
      "Built CRUD flows, protected admin features, and content-driven functionality backed by MongoDB.",
      "Worked with API routing, Mongoose models, auth flows, and practical project setup for local development.",
      "Explored modular backend architecture through service-based projects and reusable API patterns.",
    ],
  },
];

export const skillsStatic = {
  Frontend: ["React", "Vite", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Responsive Design"],
  Backend: ["Node.js", "Express", "REST APIs", "JWT Auth", "Role-based Access", "API Integration"],
  Database: ["MongoDB", "Mongoose", "CRUD Flows", "Content Models", "Admin Panels"],
  Tooling: ["Git", "GitHub", "npm", "Docker Basics", "Postman", "Local Dev Workflows"],
} as const;

// Skills are fetched from `/api/site/skills` (MongoDB) and managed in `/admin`.
// Keep a fallback so the section stays useful when MongoDB is not configured yet.
export const skills = skillsStatic;

export const posts: Post[] = [
  {
    title: "Why I like Mongo-backed admin flows",
    date: "Mar 26, 2026",
    excerpt:
      "Admin panels become much more useful when content is editable without touching the frontend code every time.",
    body:
      "One thing I enjoy about Mongo-backed projects is how quickly they let a site move from static to manageable.\n\nWhen project cards, skill groups, or homepage content can be edited from an admin flow, the portfolio becomes easier to maintain and far more realistic as a product.\n\nIt is a small shift, but it changes the project from a visual demo into something closer to a usable system.",
  },
  {
    title: "What makes a web UI feel cleaner",
    date: "Mar 18, 2026",
    excerpt:
      "Most of the difference between average UI and good UI comes from hierarchy, spacing, and knowing what to emphasize.",
    body:
      "A cleaner interface usually does not need more elements. It needs fewer competing priorities.\n\nI pay attention to heading rhythm, button weight, spacing consistency, and whether the important action is obvious at a glance. When those basics are handled well, the whole product feels more intentional.\n\nThat is the kind of frontend work I enjoy most: not flashy for the sake of it, but polished and readable.",
  },
  {
    title: "Building portfolio projects with real structure",
    date: "Mar 10, 2026",
    excerpt:
      "Even personal projects feel stronger when they include realistic data flows, admin features, and thoughtful backend decisions.",
    body:
      "A project becomes more convincing when it shows how the frontend connects to data, auth, content, and maintenance.\n\nThat is why I like projects that include dashboards, CRUD operations, protected routes, and database-backed content. They reveal more about how I think as a builder than a static landing page alone.\n\nI want portfolio projects to look good, but I also want them to show practical engineering choices.",
  },
];

export const sectionOrder = [
  { id: "top", label: "Top" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "resume", label: "Resume" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];
