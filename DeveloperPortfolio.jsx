import React, { useEffect, useRef, useState } from "react";

const LEGACY_NAME = "Aarav Sen";
const LEGACY_EMAIL = "hello@aaravsen.dev";
const LEGACY_RESUME_URL = "https://example.com/aarav-sen-resume.pdf";
const LEGACY_PROFILE_IMAGE =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80";

const DEFAULT_ABOUT = {
  name: "Supratik Sangram",
  title: "Senior Product Engineer",
  location: "Bengaluru, India",
  email: "hello@supratiksangram.dev",
  resumeUrl: "https://example.com/supratik-sangram-resume.pdf",
  profileImage: "",
  bio:
    "I build high-trust product experiences that feel fast, thoughtful, and unmistakably human. Over the last several years I've led frontend architecture, shipped AI-assisted workflows, and partnered closely with design and platform teams to turn ambiguous product bets into polished software people remember.",
  intro:
    "Shipping ambitious interfaces with design discipline, platform empathy, and a bias for measurable outcomes.",
  roles: [
    "Senior Product Engineer",
    "Frontend Architect",
    "AI Experience Builder",
    "Design Systems Lead",
  ],
  stats: [
    { label: "Years Building", value: 7, suffix: "+" },
    { label: "Projects Shipped", value: 28, suffix: "+" },
    { label: "Teams Partnered", value: 12, suffix: "" },
    { label: "Perf Improvement", value: 96, suffix: "%" },
  ],
  socials: [
    { label: "GitHub", icon: "fa-brands fa-github", url: "https://github.com/" },
    {
      label: "LinkedIn",
      icon: "fa-brands fa-linkedin-in",
      url: "https://www.linkedin.com/",
    },
    {
      label: "X",
      icon: "fa-brands fa-x-twitter",
      url: "https://x.com/",
    },
    {
      label: "Email",
      icon: "fa-regular fa-envelope",
      url: "mailto:hello@aaravsen.dev",
    },
  ],
};

const DEFAULT_PROJECTS = [
  {
    id: "proj-1",
    title: "Pulseboard Analytics",
    description:
      "A real-time product intelligence cockpit for GTM and leadership teams, combining anomaly detection, storytelling dashboards, and collaborative insight threads.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/",
    liveUrl: "https://example.com/",
    tags: ["React", "AI", "Analytics"],
  },
  {
    id: "proj-2",
    title: "Helix Commerce OS",
    description:
      "A composable storefront control plane with dynamic merchandising, experimentation, and fulfillment observability for distributed retail teams.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/",
    liveUrl: "https://example.com/",
    tags: ["Next.js", "Platform", "Design System"],
  },
  {
    id: "proj-3",
    title: "Northstar Deploy",
    description:
      "An internal developer platform focused on release confidence, environment health, and streamlined rollout automation with approval workflows.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/",
    liveUrl: "https://example.com/",
    tags: ["DevOps", "React", "Infrastructure"],
  },
  {
    id: "proj-4",
    title: "Lumen Health Intake",
    description:
      "A patient onboarding experience designed for clarity and accessibility, with adaptive forms, secure messaging, and care-team orchestration.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/",
    liveUrl: "https://example.com/",
    tags: ["Accessibility", "React", "Healthcare"],
  },
  {
    id: "proj-5",
    title: "Atlas Collaboration Lab",
    description:
      "A hybrid async workspace for engineering rituals, architecture notes, and AI-assisted meeting synthesis with rich collaborative editing.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/",
    liveUrl: "https://example.com/",
    tags: ["Collaboration", "AI", "TypeScript"],
  },
];

const DEFAULT_SKILLS = [
  { id: "skill-1", name: "React", category: "Frontend", level: "expert" },
  { id: "skill-2", name: "TypeScript", category: "Frontend", level: "expert" },
  { id: "skill-3", name: "Next.js", category: "Frontend", level: "expert" },
  { id: "skill-4", name: "Tailwind CSS", category: "Frontend", level: "intermediate" },
  { id: "skill-5", name: "Node.js", category: "Backend", level: "expert" },
  { id: "skill-6", name: "Express", category: "Backend", level: "expert" },
  { id: "skill-7", name: "PostgreSQL", category: "Backend", level: "intermediate" },
  { id: "skill-8", name: "GraphQL", category: "Backend", level: "intermediate" },
  { id: "skill-9", name: "AWS", category: "Cloud & DevOps", level: "intermediate" },
  { id: "skill-10", name: "Docker", category: "Cloud & DevOps", level: "expert" },
  { id: "skill-11", name: "CI/CD", category: "Cloud & DevOps", level: "expert" },
  { id: "skill-12", name: "Terraform", category: "Cloud & DevOps", level: "beginner" },
  { id: "skill-13", name: "Figma", category: "Product & Tools", level: "expert" },
  {
    id: "skill-14",
    name: "Testing Library",
    category: "Product & Tools",
    level: "expert",
  },
  {
    id: "skill-15",
    name: "GitHub Actions",
    category: "Product & Tools",
    level: "intermediate",
  },
  {
    id: "skill-16",
    name: "Prompt Design",
    category: "Product & Tools",
    level: "intermediate",
  },
];

const SKILL_CATEGORY_META = {
  Frontend: {
    icon: "fa-solid fa-cubes",
    blurb: "Interface architecture, motion systems, accessibility, and polished UI delivery.",
  },
  Backend: {
    icon: "fa-solid fa-database",
    blurb: "Services, APIs, and data layers designed to keep product teams moving quickly.",
  },
  "Cloud & DevOps": {
    icon: "fa-solid fa-cloud",
    blurb: "Release confidence, infrastructure clarity, and reliable delivery pipelines.",
  },
  "Product & Tools": {
    icon: "fa-solid fa-screwdriver-wrench",
    blurb: "The collaboration layer around software: design, testing, workflows, and craft.",
  },
};

const ACTIVITY_CELLS = [
  0, 1, 2, 0, 3, 1, 2,
  1, 2, 3, 0, 2, 1, 2,
  0, 3, 2, 1, 2, 3, 1,
  2, 1, 0, 2, 3, 2, 1,
  3, 2, 1, 0, 2, 1, 3,
  2, 3, 1, 2, 0, 2, 1,
  1, 2, 3, 2, 1, 0, 2,
  0, 1, 2, 3, 2, 1, 2,
];

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Syne:wght@500;700;800&display=swap');
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; background: #050816; font-family: 'DM Sans', sans-serif; }
  .portfolio-root {
    --text: #eef2ff;
    --heading: #ffffff;
    --muted: rgba(226, 232, 240, 0.78);
    --surface: rgba(10, 17, 31, 0.64);
    --surface-strong: rgba(8, 14, 26, 0.84);
    --surface-soft: rgba(12, 23, 40, 0.52);
    --border: rgba(114, 146, 210, 0.16);
    --line: rgba(148, 163, 184, 0.16);
    --accent: #5c7cff;
    --accent-2: #29b8ab;
    --accent-3: #9ec3ff;
    --shadow: 0 28px 90px rgba(0, 0, 0, 0.28);
    --button-text: #ffffff;
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
    color: var(--text);
    background: linear-gradient(-45deg, #07111d, #0d1d33, #102a35, #101a2d);
    background-size: 280% 280%;
    animation: gradientFlow 52s ease infinite;
    cursor: none;
    transition: color 240ms ease;
  }
  .portfolio-root.light {
    --text: #10203c;
    --heading: #081125;
    --muted: rgba(15, 23, 42, 0.72);
    --surface: rgba(255, 255, 255, 0.58);
    --surface-strong: rgba(255, 255, 255, 0.8);
    --surface-soft: rgba(240, 247, 255, 0.62);
    --border: rgba(71, 85, 105, 0.14);
    --line: rgba(71, 85, 105, 0.12);
    --accent: #5448ff;
    --accent-2: #149d90;
    --accent-3: #0066ff;
    --shadow: 0 28px 90px rgba(15, 23, 42, 0.14);
    --button-text: #ffffff;
    background: linear-gradient(-45deg, #f8fbff, #e9f0ff, #e7f7f4, #eef2ff);
    background-size: 280% 280%;
  }
  .portfolio-root, .portfolio-root * { cursor: none; }
  .portfolio-root a, .portfolio-root button, .portfolio-root input, .portfolio-root textarea, .portfolio-root select {
    color: inherit;
    font: inherit;
  }
  .portfolio-root ::selection { background: rgba(139, 124, 255, 0.28); color: #fff; }
  .portfolio-root.light ::selection { color: #081125; }
  .container { width: min(1180px, calc(100% - 32px)); margin: 0 auto; position: relative; z-index: 2; }
  .glass {
    background: var(--surface);
    border: 1px solid var(--border);
    box-shadow: var(--shadow), inset 0 1px 0 rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }
  .glass-soft {
    background: var(--surface-soft);
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
  }
  .app-noise {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    opacity: 0.12;
    background-image:
      radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.15), transparent 30%),
      radial-gradient(circle at 80% 0%, rgba(56, 217, 199, 0.16), transparent 18%),
      radial-gradient(circle at 50% 100%, rgba(139, 124, 255, 0.22), transparent 22%);
  }
  .orbs { position: fixed; inset: 0; pointer-events: none; overflow: hidden; z-index: 1; }
  .orb {
    position: absolute;
    border-radius: 999px;
    filter: blur(28px);
    opacity: 0.18;
    will-change: transform, opacity;
    animation: orbFloat 30s ease-in-out infinite;
  }
  .orb-1 { width: 240px; height: 240px; top: 10%; left: -6%; background: rgba(78, 152, 255, 0.22); }
  .orb-2 { width: 220px; height: 220px; top: 16%; right: -4%; background: rgba(92, 124, 255, 0.22); animation-delay: -6s; }
  .orb-3 { width: 260px; height: 260px; bottom: 14%; left: 8%; background: rgba(41, 184, 171, 0.18); animation-delay: -10s; }
  .orb-4 { width: 190px; height: 190px; bottom: 6%; right: 12%; background: rgba(125, 151, 255, 0.14); animation-delay: -12s; }
  .nav-shell { position: fixed; top: 14px; left: 0; width: 100%; z-index: 30; }
  .navbar { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 14px 18px; border-radius: 24px; }
  .brand { display: flex; align-items: center; gap: 12px; min-width: 0; }
  .brand-mark {
    width: 44px;
    height: 44px;
    display: grid;
    place-items: center;
    border-radius: 16px;
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    color: #fff;
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    box-shadow: 0 0 24px rgba(139, 124, 255, 0.35);
  }
  .brand-copy { min-width: 0; }
  .brand-copy strong { display: block; font-size: 0.98rem; color: var(--heading); }
  .brand-copy span {
    display: block;
    font-size: 0.82rem;
    color: var(--muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .nav-links, .hero-actions, .hero-meta, .filter-row, .tab-row, .social-row {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    align-items: center;
  }
  .nav-links { gap: 10px; justify-content: center; }
  .nav-link, .ghost-button, .primary-button, .chip-button, .icon-button, .filter-button, .tab-button {
    border: 0;
    outline: none;
    text-decoration: none;
    transition:
      transform 180ms ease,
      box-shadow 180ms ease,
      border-color 180ms ease,
      background-color 180ms ease,
      color 180ms ease,
      opacity 180ms ease;
  }
  .nav-link, .ghost-button, .icon-button, .filter-button, .tab-button { background: transparent; }
  .nav-link { padding: 10px 14px; color: var(--muted); border-radius: 999px; }
  .nav-link:hover, .filter-button:hover, .tab-button:hover, .ghost-button:hover { transform: translateY(-2px); color: var(--heading); }
  .primary-button, .ghost-button {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 18px;
    border-radius: 999px;
    font-weight: 700;
  }
  .primary-button {
    color: var(--button-text);
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    box-shadow: 0 14px 32px rgba(56, 217, 199, 0.22), 0 10px 28px rgba(139, 124, 255, 0.3);
  }
  .primary-button:hover { transform: translateY(-3px) scale(1.01); }
  .ghost-button { color: var(--heading); border: 1px solid var(--border); background: rgba(255, 255, 255, 0.02); }
  .chip-button, .filter-button, .tab-button, .skill-pill {
    padding: 10px 14px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: rgba(255, 255, 255, 0.04);
    color: var(--muted);
  }
  .chip-button.active, .filter-button.active, .tab-button.active {
    color: #fff;
    background: linear-gradient(135deg, rgba(139, 124, 255, 0.45), rgba(56, 217, 199, 0.35));
    border-color: rgba(255, 255, 255, 0.12);
    box-shadow: 0 12px 26px rgba(56, 217, 199, 0.14);
  }
  .icon-button {
    width: 44px;
    height: 44px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    border: 1px solid var(--border);
    color: var(--heading);
    background: rgba(255, 255, 255, 0.05);
  }
  .admin-lock { opacity: 0.2; }
  .admin-lock:hover { opacity: 1; }
  .section { padding: 104px 0; }
  .hero { min-height: 100vh; display: grid; align-items: center; padding-top: 108px; }
  .hero-grid, .about-grid, .contact-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 28px; align-items: center; }
  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: 999px;
    color: var(--heading);
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--border);
    font-size: 0.92rem;
  }
  .eyebrow::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    box-shadow: 0 0 16px rgba(56, 217, 199, 0.8);
  }
  .hero-copy h1, .section-title, .about-copy h2 {
    margin: 18px 0 12px;
    font-family: 'Syne', sans-serif;
    color: var(--heading);
    line-height: 0.96;
    letter-spacing: -0.05em;
  }
  .hero-copy h1 { font-size: clamp(3.4rem, 8vw, 6.8rem); max-width: 10ch; }
  .hero-copy p, .section-description, .about-copy p, .footer-copy, .muted-text { color: var(--muted); line-height: 1.72; }
  .typewriter {
    display: inline-flex;
    align-items: center;
    min-height: 1.2em;
    color: var(--accent-3);
    text-shadow: 0 0 22px rgba(139, 124, 255, 0.28);
  }
  .typewriter::after {
    content: "";
    width: 2px;
    height: 1em;
    margin-left: 8px;
    background: currentColor;
    animation: blink 1s steps(1) infinite;
  }
  .hero-actions { margin-top: 30px; }
  .hero-meta { margin-top: 26px; }
  .meta-card, .stat-card, .skill-card, .project-card, .contact-panel, .about-panel, .admin-panel, .form-panel, .login-card, .footer-panel { border-radius: 28px; }
  .meta-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
  .meta-card { padding: 18px; }
  .meta-card strong, .stat-value, .admin-stat-value { display: block; font-family: 'Syne', sans-serif; color: var(--heading); }
  .meta-card strong { font-size: 1.45rem; margin-bottom: 8px; }
  .section-head { max-width: 720px; margin-bottom: 28px; }
  .section-title { font-size: clamp(2.4rem, 4vw, 4rem); }
  .about-panel, .form-panel, .contact-panel { padding: 26px; }
  .about-photo { position: relative; min-height: 100%; overflow: hidden; }
  .about-photo img {
    width: 100%;
    height: 100%;
    min-height: 520px;
    object-fit: cover;
    display: block;
    border-radius: 28px;
  }
  .about-badge {
    position: absolute;
    left: 18px;
    right: 18px;
    bottom: 18px;
    padding: 18px;
    border-radius: 22px;
    background: rgba(5, 12, 24, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }
  .portfolio-root.light .about-badge { background: rgba(255, 255, 255, 0.54); }
  .stats-grid, .skills-grid, .projects-grid, .admin-stats-grid { display: grid; gap: 18px; }
  .stats-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: 24px; }
  .stat-card { padding: 22px; text-align: left; }
  .stat-value { font-size: 2.1rem; margin-bottom: 8px; }
  .skills-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .skill-card { padding: 22px; }
  .skill-card-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 18px; }
  .skill-card h3, .project-copy h3, .admin-panel h3, .login-card h3 { margin: 0; color: var(--heading); }
  .skill-list { display: flex; flex-direction: column; gap: 12px; }
  .skill-pill { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 14px; }
  .skill-pill strong { color: var(--heading); }
  .skill-bar {
    position: relative;
    width: 100%;
    height: 8px;
    margin-top: 10px;
    overflow: hidden;
    border-radius: 999px;
    background: rgba(148, 163, 184, 0.18);
  }
  .skill-fill {
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, var(--accent), var(--accent-2));
    position: relative;
    overflow: hidden;
    transition: width 600ms ease;
  }
  .skill-fill::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
    transform: translateX(-100%);
    animation: shimmer 2.6s linear infinite;
  }
  .projects-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); align-items: stretch; }
  .project-card { padding: 18px; transform-style: preserve-3d; will-change: transform; }
  .project-image-shell {
    position: relative;
    overflow: hidden;
    border-radius: 22px;
    margin-bottom: 18px;
    aspect-ratio: 16 / 10;
    background: rgba(255, 255, 255, 0.03);
  }
  .project-image-shell img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 360ms ease;
  }
  .project-card:hover .project-image-shell img { transform: scale(1.04); }
  .image-button { appearance: none; border: 0; background: transparent; padding: 0; width: 100%; height: 100%; }
  .project-copy { display: flex; flex-direction: column; gap: 14px; }
  .project-copy p { margin: 0; }
  .badge-row { display: flex; flex-wrap: wrap; gap: 10px; }
  .badge {
    padding: 8px 12px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: rgba(255, 255, 255, 0.05);
    color: var(--heading);
    font-size: 0.88rem;
  }
  .project-links { display: flex; gap: 12px; margin-top: 4px; flex-wrap: wrap; }
  .contact-grid { align-items: start; }
  .contact-panel, .form-panel { padding: 28px; }
  .field-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
  .field { position: relative; }
  .field input, .field textarea, .field select {
    width: 100%;
    border-radius: 18px;
    border: 1px solid var(--border);
    background: rgba(255, 255, 255, 0.03);
    color: var(--heading);
    padding: 18px 16px;
    outline: none;
    resize: vertical;
    transition: border-color 180ms ease, box-shadow 180ms ease, background-color 180ms ease;
  }
  .field textarea { min-height: 140px; }
  .field input:focus, .field textarea:focus, .field select:focus {
    border-color: rgba(139, 124, 255, 0.55);
    box-shadow: 0 0 0 4px rgba(139, 124, 255, 0.12);
    background: rgba(255, 255, 255, 0.05);
  }
  .field label {
    position: absolute;
    left: 16px;
    top: 18px;
    color: var(--muted);
    pointer-events: none;
    transition: transform 180ms ease, font-size 180ms ease, color 180ms ease, top 180ms ease;
  }
  .field input:focus + label,
  .field input:not(:placeholder-shown) + label,
  .field textarea:focus + label,
  .field textarea:not(:placeholder-shown) + label {
    top: 10px;
    transform: scale(0.88);
    transform-origin: top left;
    color: var(--accent-3);
  }
  .field select + label { top: 10px; transform: scale(0.88); transform-origin: top left; }
  .field .helper { display: block; margin-top: 8px; color: #fca5a5; font-size: 0.88rem; }
  .toast {
    position: fixed;
    right: 22px;
    bottom: 22px;
    z-index: 60;
    padding: 14px 18px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(8, 17, 34, 0.84);
    color: #fff;
    box-shadow: var(--shadow);
    animation: toastUp 240ms ease;
  }
  .portfolio-root.light .toast { background: rgba(15, 23, 42, 0.9); }
  .footer { padding: 0 0 44px; }
  .footer-panel {
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    flex-wrap: wrap;
  }
  .lightbox, .admin-overlay {
    position: fixed;
    inset: 0;
    z-index: 70;
    display: grid;
    place-items: center;
    padding: 20px;
    background: rgba(2, 6, 23, 0.72);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }
  .lightbox-card { width: min(1040px, 100%); padding: 18px; border-radius: 28px; }
  .lightbox-card img {
    width: 100%;
    display: block;
    object-fit: cover;
    border-radius: 22px;
    max-height: 72vh;
  }
  .lightbox-header, .admin-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 16px;
  }
  .lightbox-header h3 { margin: 0; color: var(--heading); }
  .login-card, .admin-shell {
    width: min(1200px, 100%);
    max-height: calc(100vh - 40px);
    overflow: auto;
    padding: 24px;
  }
  .login-card { max-width: 480px; }
  .admin-shell { border-radius: 30px; }
  .admin-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 20px; align-items: start; }
  .admin-panel { padding: 22px; }
  .admin-list { display: flex; flex-direction: column; gap: 12px; margin-top: 16px; }
  .admin-item {
    display: flex;
    justify-content: space-between;
    gap: 14px;
    align-items: flex-start;
    padding: 14px;
    border-radius: 18px;
    border: 1px solid var(--line);
    background: rgba(255, 255, 255, 0.03);
  }
  .admin-item strong { color: var(--heading); display: block; margin-bottom: 6px; }
  .admin-item p {
    margin: 0;
    color: var(--muted);
    line-height: 1.5;
    max-width: 60ch;
  }
  .admin-actions { display: flex; gap: 10px; flex-wrap: wrap; }
  .admin-stats-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: 18px; }
  .admin-stat-card { padding: 20px; border-radius: 22px; }
  .admin-stat-value { font-size: 2rem; margin-bottom: 8px; }
  .cursor-dot, .cursor-ring {
    position: fixed;
    top: 0;
    left: 0;
    border-radius: 999px;
    pointer-events: none;
    z-index: 120;
    mix-blend-mode: screen;
  }
  .cursor-dot {
    width: 10px;
    height: 10px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.95), rgba(56, 217, 199, 0.7));
    box-shadow: 0 0 22px rgba(56, 217, 199, 0.8);
    transform: translate3d(-50%, -50%, 0);
  }
  .cursor-ring {
    width: 36px;
    height: 36px;
    border: 1px solid rgba(139, 124, 255, 0.58);
    box-shadow: 0 0 24px rgba(139, 124, 255, 0.22);
    transform: translate3d(-50%, -50%, 0);
  }
  [data-reveal] {
    opacity: 0;
    transform: translate3d(0, 36px, 0);
    transition: opacity 760ms ease, transform 760ms cubic-bezier(0.2, 1, 0.22, 1);
  }
  [data-reveal].visible { opacity: 1; transform: translate3d(0, 0, 0); }
  ::-webkit-scrollbar { width: 11px; }
  ::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background: linear-gradient(180deg, rgba(139, 124, 255, 0.7), rgba(56, 217, 199, 0.6));
  }
  ::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); }
  @keyframes gradientFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes orbFloat {
    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
    50% { transform: translate3d(16px, -30px, 0) scale(1.08); }
  }
  @keyframes shimmer { 100% { transform: translateX(100%); } }
  @keyframes blink { 50% { opacity: 0; } }
  @keyframes toastUp {
    from { opacity: 0; transform: translate3d(0, 14px, 0); }
    to { opacity: 1; transform: translate3d(0, 0, 0); }
  }
  @media (max-width: 1100px) {
    .hero-grid, .about-grid, .contact-grid, .admin-grid, .skills-grid, .projects-grid, .stats-grid, .admin-stats-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 900px) {
    .nav-links { display: none; }
    .hero-grid, .about-grid, .contact-grid, .admin-grid, .stats-grid, .admin-stats-grid, .skills-grid, .projects-grid {
      grid-template-columns: 1fr;
    }
    .field-grid { grid-template-columns: 1fr; }
    .hero-copy h1 { max-width: none; }
    .about-photo img { min-height: 360px; }
  }
  @media (max-width: 720px) {
    .navbar, .footer-panel, .admin-topbar, .lightbox-header {
      align-items: flex-start;
      flex-direction: column;
    }
    .hero { padding-top: 120px; }
    .container { width: min(100% - 20px, 1180px); }
    .section { padding: 84px 0; }
    .cursor-dot, .cursor-ring { display: none; }
  }
  .portfolio-root::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background:
      radial-gradient(circle at 14% 18%, rgba(139, 124, 255, 0.18), transparent 26%),
      radial-gradient(circle at 78% 16%, rgba(56, 217, 199, 0.12), transparent 22%),
      radial-gradient(circle at 50% 70%, rgba(96, 165, 250, 0.08), transparent 26%);
  }
  .nav-shell { top: 18px; }
  .navbar {
    padding: 14px 16px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
    box-shadow: 0 22px 50px rgba(2, 6, 23, 0.24);
  }
  .portfolio-root.light .navbar {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0.58));
  }
  .nav-link { font-size: 0.92rem; letter-spacing: 0.01em; }
  .hero {
    min-height: 88vh;
    padding-top: 118px;
  }
  .hero-grid {
    grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
    gap: 28px;
    align-items: stretch;
  }
  .hero-copy {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px 0 4px;
  }
  .hero-copy h1 {
    font-size: clamp(3rem, 6vw, 5.3rem);
    max-width: 11ch;
    line-height: 0.93;
    margin-bottom: 10px;
  }
  .gradient-text {
    background: linear-gradient(135deg, #ffffff 8%, #a5b4fc 38%, #67e8f9 62%, #ffffff 94%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .hero-topline {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
    margin-top: 12px;
  }
  .hero-availability,
  .hero-location {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: rgba(255, 255, 255, 0.04);
    color: var(--muted);
    font-size: 0.88rem;
  }
  .hero-proof {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    margin-top: 22px;
  }
  .hero-proof-item {
    padding: 13px 14px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.035);
    border: 1px solid var(--border);
  }
  .hero-proof-item strong {
    display: block;
    font-family: 'Syne', sans-serif;
    font-size: 1.05rem;
    color: var(--heading);
    margin-bottom: 4px;
  }
  .hero-showcase {
    position: relative;
    display: grid;
    gap: 16px;
    align-self: center;
  }
  .hero-name {
    margin-top: 14px;
    color: var(--heading);
    font-size: 0.82rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
  .hero-subtitle {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 14px;
    color: var(--muted);
    font-size: 0.94rem;
  }
  .hero-clean-card {
    padding: 22px;
    border-radius: 24px;
  }
  .hero-clean-card h3 {
    margin: 0 0 10px;
    color: var(--heading);
    font-family: 'Syne', sans-serif;
    font-size: 1.4rem;
    line-height: 1.02;
  }
  .hero-summary-list {
    display: grid;
    gap: 12px;
    margin-top: 18px;
  }
  .hero-summary-item {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    padding-top: 12px;
    border-top: 1px solid var(--line);
  }
  .hero-summary-item:first-child {
    padding-top: 0;
    border-top: 0;
  }
  .hero-summary-item i {
    margin-top: 4px;
    color: var(--accent-2);
  }
  .hero-microproof {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 18px;
  }
  .hero-microproof span {
    padding: 8px 11px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: rgba(255, 255, 255, 0.04);
    color: var(--heading);
    font-size: 0.8rem;
  }
  .hero-panel {
    position: relative;
    overflow: hidden;
    padding: 20px;
    border-radius: 24px;
  }
  .hero-panel::before,
  .project-card::before,
  .skill-card::before,
  .contact-panel::before,
  .form-panel::before,
  .about-panel::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0), rgba(56, 217, 199, 0.14));
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
  .hero-panel-main {
    min-height: 270px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background:
      radial-gradient(circle at 76% 20%, rgba(96, 165, 250, 0.24), transparent 22%),
      radial-gradient(circle at 18% 18%, rgba(139, 124, 255, 0.28), transparent 24%),
      linear-gradient(180deg, rgba(11, 19, 37, 0.78), rgba(11, 19, 37, 0.46));
  }
  .portfolio-root.light .hero-panel-main {
    background:
      radial-gradient(circle at 76% 20%, rgba(96, 165, 250, 0.14), transparent 22%),
      radial-gradient(circle at 18% 18%, rgba(139, 124, 255, 0.18), transparent 24%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.88), rgba(240, 247, 255, 0.66));
  }
  .hero-panel-label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    width: fit-content;
    padding: 7px 11px;
    border-radius: 999px;
    margin-bottom: 12px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.06);
    color: var(--heading);
    font-size: 0.78rem;
  }
  .hero-panel-main h3 {
    margin: 0 0 12px;
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.45rem, 2.5vw, 2rem);
    line-height: 1;
    color: var(--heading);
    max-width: 13ch;
  }
  .hero-panel-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }
  .hero-mini-card {
    padding: 16px;
    border-radius: 18px;
  }
  .hero-mini-card strong {
    display: block;
    color: var(--heading);
    font-size: 0.96rem;
    margin-bottom: 6px;
  }
  .hero-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 12px;
  }
  .hero-stack span {
    padding: 7px 10px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: var(--heading);
    font-size: 0.78rem;
  }
  .section-head {
    max-width: 760px;
    margin-bottom: 28px;
  }
  .section-title {
    font-size: clamp(2rem, 4vw, 3.25rem);
    line-height: 1;
  }
  .about-grid {
    grid-template-columns: minmax(300px, 0.84fr) minmax(0, 1.16fr);
    align-items: stretch;
  }
  .about-panel,
  .contact-panel,
  .form-panel,
  .project-card,
  .skill-card {
    position: relative;
    overflow: hidden;
  }
  .about-panel,
  .contact-panel,
  .form-panel {
    padding: 24px;
  }
  .about-story-grid {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 14px;
    margin-top: 22px;
  }
  .about-note-card {
    padding: 16px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--border);
  }
  .about-note-card strong {
    display: block;
    color: var(--heading);
    margin-bottom: 10px;
  }
  .principle-list {
    display: grid;
    gap: 12px;
  }
  .principle-item {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    color: var(--muted);
  }
  .principle-item i {
    margin-top: 4px;
    color: var(--accent-2);
  }
  .profile-placeholder {
    width: 100%;
    min-height: 420px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 18px;
    padding: 28px;
    border-radius: 28px;
    background:
      radial-gradient(circle at 50% 30%, rgba(92, 124, 255, 0.16), transparent 24%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
    color: var(--muted);
    text-align: center;
  }
  .profile-placeholder-mark {
    width: 108px;
    height: 108px;
    display: grid;
    place-items: center;
    border-radius: 28px;
    font-family: 'Syne', sans-serif;
    font-size: 2rem;
    color: var(--heading);
    background: linear-gradient(135deg, rgba(92, 124, 255, 0.24), rgba(41, 184, 171, 0.18));
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 18px 40px rgba(8, 14, 26, 0.22);
  }
  .profile-placeholder strong {
    color: var(--heading);
    font-size: 1rem;
  }
  .activity-grid {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 8px;
    margin-top: 14px;
  }
  .activity-cell {
    aspect-ratio: 1;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    background: rgba(255, 255, 255, 0.04);
  }
  .activity-cell.level-1 { background: rgba(96, 165, 250, 0.2); }
  .activity-cell.level-2 { background: rgba(56, 217, 199, 0.26); }
  .activity-cell.level-3 { background: rgba(139, 124, 255, 0.38); }
  .stats-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 14px;
  }
  .stat-card {
    padding: 18px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
  }
  .skills-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
  }
  .skill-card {
    padding: 18px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.025));
  }
  .skill-card-header {
    align-items: flex-start;
    margin-bottom: 16px;
  }
  .skill-card-title {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .skill-card-icon {
    width: 42px;
    height: 42px;
    display: grid;
    place-items: center;
    border-radius: 14px;
    background: linear-gradient(135deg, rgba(139, 124, 255, 0.18), rgba(56, 217, 199, 0.14));
    color: var(--heading);
  }
  .skill-description {
    margin: 4px 0 0;
    color: var(--muted);
    line-height: 1.55;
    font-size: 0.94rem;
  }
  .skill-pill {
    align-items: flex-start;
    border-radius: 16px;
    padding: 12px;
    background: rgba(255, 255, 255, 0.03);
  }
  .skill-level-badge {
    padding: 7px 10px;
    border-radius: 999px;
    font-size: 0.76rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--heading);
    background: rgba(255, 255, 255, 0.06);
  }
  .projects-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
  }
  .projects-grid article:first-child {
    grid-column: span 2;
  }
  .projects-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    margin-bottom: 20px;
  }
  .projects-summary {
    color: var(--muted);
  }
  .project-card {
    padding: 16px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.03));
  }
  .project-image-shell {
    margin-bottom: 16px;
    min-height: 190px;
  }
  .project-image-overlay {
    position: absolute;
    inset: auto 14px 14px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 14px;
    border-radius: 16px;
    background: rgba(5, 12, 24, 0.58);
    border: 1px solid rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(14px);
  }
  .portfolio-root.light .project-image-overlay {
    background: rgba(255, 255, 255, 0.68);
  }
  .project-image-overlay strong,
  .project-topline strong {
    color: var(--heading);
  }
  .project-topline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .project-copy h3 {
    font-size: clamp(1.4rem, 2vw, 2rem);
    line-height: 1.02;
  }
  .contact-grid {
    grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
    gap: 18px;
  }
  .contact-points {
    display: grid;
    gap: 14px;
    margin-top: 22px;
  }
  .contact-point {
    padding: 14px 16px;
    border-radius: 16px;
    border: 1px solid var(--border);
    background: rgba(255, 255, 255, 0.03);
  }
  .contact-point strong {
    display: block;
    color: var(--heading);
    margin-bottom: 6px;
  }
  .form-header {
    margin-bottom: 18px;
  }
  .form-header h3 {
    margin: 10px 0 8px;
    color: var(--heading);
    font-family: 'Syne', sans-serif;
    font-size: 1.55rem;
    line-height: 1;
  }
  .footer-panel {
    padding: 20px;
    border-radius: 22px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.03));
  }
  @media (max-width: 1100px) {
    .hero-grid,
    .about-grid,
    .contact-grid,
    .admin-grid,
    .skills-grid,
    .projects-grid,
    .stats-grid,
    .admin-stats-grid,
    .about-story-grid {
      grid-template-columns: 1fr;
    }
    .projects-grid article:first-child {
      grid-column: span 1;
    }
    .hero-proof {
      grid-template-columns: 1fr;
    }
  }
  @media (max-width: 900px) {
    .hero-grid {
      grid-template-columns: 1fr;
    }
    .projects-toolbar {
      flex-direction: column;
      align-items: flex-start;
    }
    .hero-copy h1 {
      font-size: clamp(2.6rem, 13vw, 4rem);
    }
  }
  body {
    background: #05070b;
  }
  .portfolio-root {
    --surface: rgba(10, 14, 20, 0.7);
    --surface-strong: rgba(7, 11, 18, 0.88);
    --surface-soft: rgba(12, 18, 27, 0.58);
    --border: rgba(124, 199, 255, 0.12);
    --line: rgba(124, 199, 255, 0.1);
    --accent: #39d2c0;
    --accent-2: #7cc7ff;
    --accent-3: #cfe7ff;
    --shadow: 0 24px 72px rgba(0, 0, 0, 0.34);
    background:
      radial-gradient(circle at top, rgba(57, 210, 192, 0.08), transparent 24%),
      linear-gradient(135deg, #04070b 0%, #091017 32%, #07171a 66%, #05070b 100%);
    background-size: 180% 180%;
    animation: gradientFlow 34s ease-in-out infinite;
  }
  .portfolio-root.light {
    --surface: rgba(255, 255, 255, 0.65);
    --surface-strong: rgba(255, 255, 255, 0.86);
    --surface-soft: rgba(246, 250, 255, 0.78);
    --border: rgba(108, 134, 160, 0.14);
    --line: rgba(108, 134, 160, 0.12);
    --accent: #0aa89a;
    --accent-2: #4b8dff;
    --accent-3: #2451a6;
    background:
      radial-gradient(circle at top, rgba(75, 141, 255, 0.08), transparent 24%),
      linear-gradient(135deg, #fbfdff 0%, #f0f6ff 36%, #edf8f7 68%, #f9fbff 100%);
    background-size: 180% 180%;
  }
  .portfolio-root::before {
    background:
      radial-gradient(circle at 14% 18%, rgba(57, 210, 192, 0.1), transparent 24%),
      radial-gradient(circle at 78% 16%, rgba(124, 199, 255, 0.12), transparent 24%),
      radial-gradient(circle at 50% 70%, rgba(255, 255, 255, 0.03), transparent 28%);
    animation: orbFloat 40s ease-in-out infinite;
  }
  .portfolio-root::after {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    opacity: 0.22;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
    background-size: 72px 72px;
    mask-image: radial-gradient(circle at center, black 32%, transparent 78%);
  }
  .app-noise {
    opacity: 0.06;
  }
  .orb {
    opacity: 0.15;
    filter: blur(36px);
    animation-duration: 36s;
  }
  .glass,
  .glass-soft {
    background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.015));
    box-shadow:
      var(--shadow),
      inset 0 1px 0 rgba(255, 255, 255, 0.05),
      inset 0 -1px 0 rgba(255, 255, 255, 0.02);
  }
  .navbar {
    padding: 12px 15px;
    border: 1px solid rgba(124, 199, 255, 0.12);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.025)),
      rgba(6, 10, 16, 0.72);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    box-shadow: 0 18px 48px rgba(0, 0, 0, 0.24);
  }
  .brand-mark {
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    box-shadow: 0 0 24px rgba(57, 210, 192, 0.22);
  }
  .nav-link {
    position: relative;
    color: rgba(226, 232, 240, 0.72);
  }
  .nav-link:hover {
    background: rgba(255, 255, 255, 0.04);
  }
  .primary-button,
  .ghost-button,
  .filter-button,
  .tab-button,
  .chip-button,
  .icon-button {
    will-change: transform;
  }
  .primary-button {
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    box-shadow:
      0 16px 32px rgba(57, 210, 192, 0.18),
      inset 0 1px 0 rgba(255, 255, 255, 0.28);
  }
  .ghost-button,
  .filter-button,
  .tab-button,
  .chip-button,
  .icon-button {
    border-color: rgba(124, 199, 255, 0.12);
    background: rgba(255, 255, 255, 0.03);
  }
  .icon-button:hover,
  .chip-button:hover,
  .filter-button:hover,
  .tab-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16);
  }
  .eyebrow {
    background: rgba(255, 255, 255, 0.03);
    letter-spacing: 0.02em;
  }
  .eyebrow::before {
    box-shadow: 0 0 18px rgba(57, 210, 192, 0.5);
  }
  .gradient-text {
    background: linear-gradient(135deg, #ffffff 0%, #c8f7f1 28%, #8bcfff 58%, #ffffff 100%);
    background-size: 200% 200%;
    animation: auroraText 10s ease-in-out infinite;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .typewriter {
    color: #d7eefc;
    text-shadow: 0 0 22px rgba(124, 199, 255, 0.18);
  }
  .hero-clean-card,
  .about-note-card,
  .stat-card,
  .skill-card,
  .project-card,
  .contact-point,
  .admin-item {
    transition:
      transform 260ms cubic-bezier(0.22, 1, 0.36, 1),
      box-shadow 260ms ease,
      border-color 260ms ease,
      background-color 260ms ease;
  }
  .hero-clean-card:hover,
  .about-note-card:hover,
  .stat-card:hover,
  .skill-card:hover,
  .project-card:hover,
  .contact-point:hover {
    transform: translateY(-4px);
    border-color: rgba(124, 199, 255, 0.2);
    box-shadow: 0 18px 44px rgba(0, 0, 0, 0.24);
  }
  .hero-clean-card,
  .about-panel,
  .contact-panel,
  .form-panel,
  .project-card,
  .skill-card {
    background:
      radial-gradient(circle at top right, rgba(124, 199, 255, 0.08), transparent 28%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.02));
  }
  .hero-summary-item,
  .contact-point,
  .skill-pill {
    border-top-color: rgba(124, 199, 255, 0.08);
  }
  .skill-card-icon,
  .profile-placeholder-mark {
    background: linear-gradient(135deg, rgba(57, 210, 192, 0.18), rgba(124, 199, 255, 0.16));
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
  }
  .project-image-shell img {
    transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), filter 320ms ease;
  }
  .project-card:hover .project-image-shell img {
    transform: scale(1.05);
    filter: saturate(1.06) contrast(1.04);
  }
  .project-image-overlay {
    background: rgba(7, 12, 18, 0.68);
    border-color: rgba(124, 199, 255, 0.14);
    transition: transform 260ms ease, opacity 260ms ease;
  }
  .project-card:hover .project-image-overlay {
    transform: translateY(-2px);
  }
  .badge,
  .hero-microproof span,
  .hero-availability,
  .hero-location {
    border-color: rgba(124, 199, 255, 0.12);
    background: rgba(255, 255, 255, 0.035);
  }
  .field input,
  .field textarea,
  .field select {
    background: rgba(255, 255, 255, 0.025);
    border-color: rgba(124, 199, 255, 0.11);
  }
  .field input:focus,
  .field textarea:focus,
  .field select:focus {
    border-color: rgba(124, 199, 255, 0.34);
    box-shadow: 0 0 0 4px rgba(124, 199, 255, 0.1);
  }
  .cursor-dot {
    background: radial-gradient(circle, rgba(255, 255, 255, 0.95), rgba(57, 210, 192, 0.72));
    box-shadow: 0 0 22px rgba(57, 210, 192, 0.55);
  }
  .cursor-ring {
    border-color: rgba(124, 199, 255, 0.42);
    box-shadow: 0 0 20px rgba(124, 199, 255, 0.14);
  }
  [data-reveal] {
    transform: translate3d(0, 26px, 0) scale(0.985);
    transition:
      opacity 900ms cubic-bezier(0.16, 1, 0.3, 1),
      transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  [data-reveal].visible {
    transform: translate3d(0, 0, 0) scale(1);
  }
  .activity-cell.level-1 { background: rgba(124, 199, 255, 0.16); }
  .activity-cell.level-2 { background: rgba(57, 210, 192, 0.24); }
  .activity-cell.level-3 { background: rgba(124, 199, 255, 0.34); }
  @keyframes auroraText {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`;

const createId = (prefix) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const levelWidths = {
  beginner: 48,
  intermediate: 72,
  expert: 92,
};

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");

function useLocalStorage(key, initialValue) {
  const readValue = () => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Unable to read localStorage key "${key}"`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(readValue);

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Unable to write localStorage key "${key}"`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

function HeadEnhancements() {
  useEffect(() => {
    const existing = document.getElementById("portfolio-font-awesome");
    if (existing) {
      return undefined;
    }

    const link = document.createElement("link");
    link.id = "portfolio-font-awesome";
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css";
    link.crossOrigin = "anonymous";
    link.referrerPolicy = "no-referrer";
    document.head.appendChild(link);

    return undefined;
  }, []);

  return <style>{GLOBAL_STYLES}</style>;
}

function FloatingOrbs() {
  return (
    <>
      <div className="app-noise" />
      <div className="orbs" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>
    </>
  );
}

function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) {
      return undefined;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId = 0;

    const setPressed = (pressed) => {
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${pressed ? 0.82 : 1})`;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${pressed ? 1.4 : 1})`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      rafId = window.requestAnimationFrame(animate);
    };

    const handleMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const handleLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);

    rafId = window.requestAnimationFrame(animate);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);

  return (
    <>
      <div className="cursor-ring" ref={ringRef} />
      <div className="cursor-dot" ref={dotRef} />
    </>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-head" data-reveal>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title">{title}</h2>
      <p className="section-description">{description}</p>
    </div>
  );
}

function ProfileVisual({ about }) {
  if (about.profileImage && about.profileImage.trim()) {
    return <img src={about.profileImage} alt={about.name} />;
  }

  return (
    <div className="profile-placeholder">
      <div className="profile-placeholder-mark">{getInitials(about.name)}</div>
      <strong>No profile photo yet</strong>
      <span className="muted-text">
        You can add your image later anytime from the admin panel.
      </span>
    </div>
  );
}

function Navbar({ about, theme, onToggleTheme, onNavigate, onOpenAdmin }) {
  const navItems = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="nav-shell">
      <div className="container">
        <nav className="navbar glass">
          <div className="brand">
            <div className="brand-mark">{getInitials(about.name)}</div>
            <div className="brand-copy">
              <strong>{about.name}</strong>
              <span>{about.title}</span>
            </div>
          </div>

          <div className="nav-links">
            {navItems.map((item) => (
              <button
                key={item.id}
                className="nav-link"
                type="button"
                onClick={() => onNavigate(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hero-meta">
            <button
              className="icon-button"
              type="button"
              onClick={onToggleTheme}
              aria-label="Toggle theme"
            >
              <i className={theme === "dark" ? "fa-regular fa-sun" : "fa-regular fa-moon"} />
            </button>
            <button
              className="icon-button admin-lock"
              type="button"
              onClick={onOpenAdmin}
              aria-label="Open admin panel"
              title="Admin"
            >
              <i className="fa-solid fa-lock" />
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

function Hero({ about, onNavigate }) {
  const [typedText, setTypedText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const pauseRef = useRef(null);

  useEffect(() => {
    const roles = about.roles?.length ? about.roles : DEFAULT_ABOUT.roles;
    const currentRole = roles[roleIndex % roles.length];

    const interval = window.setInterval(() => {
      setTypedText((currentText) => {
        if (!isDeleting) {
          const nextText = currentRole.slice(0, currentText.length + 1);
          if (nextText === currentRole) {
            window.clearInterval(interval);
            pauseRef.current = window.setTimeout(() => {
              setIsDeleting(true);
            }, 1100);
          }
          return nextText;
        }

        const nextText = currentRole.slice(0, Math.max(0, currentText.length - 1));
        if (nextText.length === 0) {
          window.clearInterval(interval);
          setIsDeleting(false);
          setRoleIndex((current) => (current + 1) % roles.length);
        }
        return nextText;
      });
    }, isDeleting ? 46 : 92);

    return () => {
      window.clearInterval(interval);
      if (pauseRef.current) {
        window.clearTimeout(pauseRef.current);
      }
    };
  }, [about.roles, roleIndex, isDeleting]);

  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy" data-reveal>
            <span className="eyebrow">Available for selective product and platform work</span>
            <h1>
              Designing and engineering
              <br />
              interface systems that feel future-ready.
            </h1>
            <div className="typewriter">{typedText}</div>
            <p style={{ marginTop: 22, maxWidth: "64ch" }}>{about.intro}</p>
            <div className="hero-actions">
              <button className="primary-button" type="button" onClick={() => onNavigate("projects")}>
                View selected work <i className="fa-solid fa-arrow-right" />
              </button>
              <button className="ghost-button" type="button" onClick={() => onNavigate("contact")}>
                Let&apos;s build something
              </button>
            </div>
            <div className="hero-meta">
              <span className="chip-button active">React-first</span>
              <span className="chip-button">Design systems</span>
              <span className="chip-button">AI experiences</span>
              <span className="chip-button">Performance-led</span>
            </div>
          </div>

          <div className="meta-grid" data-reveal>
            <div className="meta-card glass">
              <strong>Product intuition</strong>
              <span className="muted-text">
                I like turning complex flows into calm, clear interfaces that feel faster than they should.
              </span>
            </div>
            <div className="meta-card glass">
              <strong>Architecture depth</strong>
              <span className="muted-text">
                Durable frontend systems, strong collaboration boundaries, and pragmatic platform thinking.
              </span>
            </div>
            <div className="meta-card glass">
              <strong>Design partnership</strong>
              <span className="muted-text">
                Tight visual craft, motion restraint, and components teams can reuse without losing personality.
              </span>
            </div>
            <div className="meta-card glass">
              <strong>Measured outcomes</strong>
              <span className="muted-text">
                Better conversion, higher confidence, smoother onboarding, and fewer production surprises.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CounterStat({ stat }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasStarted(true);
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) {
      return undefined;
    }

    let frame = 0;
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(stat.value * eased));
      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [hasStarted, stat.value]);

  return (
    <div className="stat-card glass" ref={cardRef}>
      <span className="stat-value">
        {count}
        {stat.suffix}
      </span>
      <span className="muted-text">{stat.label}</span>
    </div>
  );
}

function ActivityGrid() {
  return (
    <div className="about-note-card">
      <strong>Shipping rhythm</strong>
      <span className="muted-text">
        A contribution-style snapshot of how I like to work: small, steady, compounding progress.
      </span>
      <div className="activity-grid" aria-hidden="true">
        {ACTIVITY_CELLS.map((level, index) => (
          <div key={index} className={`activity-cell level-${level}`} />
        ))}
      </div>
    </div>
  );
}

function About({ about }) {
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHeading
          eyebrow="About"
          title="Product-minded engineering with taste, systems thinking, and velocity."
          description="I care about the details users feel but can’t always name: pacing, trust, clarity, and the quiet confidence that comes from software behaving exactly the way it should."
        />

        <div className="about-grid">
          <div className="about-photo glass-soft" data-reveal>
            <ProfileVisual about={about} />
            <div className="about-badge">
              <strong style={{ display: "block", marginBottom: 8, color: "var(--heading)" }}>
                {about.title}
              </strong>
              <span className="muted-text">
                Based in {about.location}. Open to senior IC, staff-level, and product-platform hybrid roles.
              </span>
            </div>
          </div>

          <div className="about-copy about-panel glass" data-reveal>
            <span className="eyebrow">Craft + Systems + Outcomes</span>
            <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 4.2rem)" }}>{about.name}</h2>
            <p>{about.bio}</p>

            <div className="hero-actions" style={{ marginTop: 26 }}>
              <a className="primary-button" href={about.resumeUrl} target="_blank" rel="noreferrer">
                Download Resume <i className="fa-solid fa-file-arrow-down" />
              </a>
              <a className="ghost-button" href={`mailto:${about.email}`}>
                {about.email}
              </a>
            </div>

            <div className="social-row" style={{ marginTop: 22 }}>
              {about.socials.map((social) => (
                <a
                  key={social.label}
                  className="icon-button"
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                >
                  <i className={social.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="stats-grid" data-reveal>
          {about.stats.map((stat) => (
            <CounterStat key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills({ skills }) {
  const grouped = skills.reduce((accumulator, skill) => {
    if (!accumulator[skill.category]) {
      accumulator[skill.category] = [];
    }
    accumulator[skill.category].push(skill);
    return accumulator;
  }, {});

  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHeading
          eyebrow="Skills"
          title="A toolkit shaped by frontend depth, platform empathy, and cross-functional shipping."
          description="Everything here is chosen for real-world leverage: faster product delivery, calmer operations, tighter quality loops, and more expressive interfaces."
        />

        <div className="skills-grid">
          {Object.entries(grouped).map(([category, categorySkills]) => (
            <div key={category} className="skill-card glass" data-reveal>
              <div className="skill-card-header">
                <h3>{category}</h3>
                <span className="chip-button">{categorySkills.length} skills</span>
              </div>

              <div className="skill-list">
                {categorySkills.map((skill) => (
                  <div key={skill.id} className="skill-pill">
                    <div style={{ width: "100%" }}>
                      <strong>{skill.name}</strong>
                      <div className="skill-bar">
                        <div
                          className="skill-fill"
                          style={{ width: `${levelWidths[skill.level] || 60}%` }}
                        />
                      </div>
                    </div>
                    <span className="muted-text" style={{ textTransform: "capitalize" }}>
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, onLightboxOpen }) {
  const [transformStyle, setTransformStyle] = useState(
    "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)"
  );
  const cardRef = useRef(null);

  const handleMouseMove = (event) => {
    const element = cardRef.current;
    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 16;
    const rotateX = (0.5 - y) * 14;
    setTransformStyle(
      `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`
    );
  };

  return (
    <article
      ref={cardRef}
      className="project-card glass"
      data-reveal
      style={{ transform: transformStyle }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() =>
        setTransformStyle("perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)")
      }
    >
      <div className="project-image-shell">
        <button className="image-button" type="button" onClick={() => onLightboxOpen(project)}>
          <img src={project.image} alt={project.title} />
        </button>
      </div>

      <div className="project-copy">
        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <div className="badge-row">
          {project.tags.map((tag) => (
            <span className="badge" key={`${project.id}-${tag}`}>
              {tag}
            </span>
          ))}
        </div>

        <div className="project-links">
          <a className="ghost-button" href={project.githubUrl} target="_blank" rel="noreferrer">
            <i className="fa-brands fa-github" /> GitHub
          </a>
          <a className="primary-button" href={project.liveUrl} target="_blank" rel="noreferrer">
            <i className="fa-solid fa-up-right-from-square" /> Live Demo
          </a>
        </div>
      </div>
    </article>
  );
}

function Projects({ projects, onLightboxOpen }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", ...new Set(projects.flatMap((project) => project.tags))];
  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.tags.includes(activeFilter));

  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work with product ambition, systems depth, and a bias for polish."
          description="A mix of public-facing experiences and internal tools, all designed to make complex work feel intuitive."
        />

        <div className="filter-row" style={{ marginBottom: 24 }} data-reveal>
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-button ${activeFilter === filter ? "active" : ""}`}
              type="button"
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onLightboxOpen={onLightboxOpen}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const nameRef = useRef(null);

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = "A valid email is required.";
    }

    if (!form.message.trim() || form.message.trim().length < 20) {
      nextErrors.message = "Please share a little more detail.";
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      if (nextErrors.name && nameRef.current) {
        nameRef.current.focus();
      }
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setToastMessage("Message queued. Thanks for reaching out.");
      setForm({ name: "", email: "", subject: "", message: "" });
      window.setTimeout(() => setToastMessage(""), 2800);
    }, 1000);
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <SectionHeading
          eyebrow="Contact"
          title="If you’re building something meaningful, I’d love to hear about it."
          description="Share the product, the team, or the challenge. I’m especially interested in thoughtful products with ambitious UX and real technical complexity."
        />

        <div className="contact-grid">
          <div className="contact-panel glass" data-reveal>
            <span className="eyebrow">Why teams call</span>
            <h3 style={{ color: "var(--heading)", fontSize: "2rem", marginBottom: 10 }}>
              Staff-level frontend leadership with product instincts.
            </h3>
            <p className="muted-text">
              I’m at my best in roles that blend interface architecture, collaboration, and decisive
              execution. If you need someone who can move from strategy to shipped UI without losing
              quality, this is the kind of work I love.
            </p>

            <div className="admin-list">
              <div className="admin-item">
                <div>
                  <strong>Product strategy to shipped interface</strong>
                  <p>Turning direction into components, flows, motion, and resilient implementation.</p>
                </div>
              </div>
              <div className="admin-item">
                <div>
                  <strong>Design system acceleration</strong>
                  <p>Reusable primitives that keep quality high while reducing delivery friction.</p>
                </div>
              </div>
              <div className="admin-item">
                <div>
                  <strong>Performance and confidence</strong>
                  <p>Faster UI, stronger testing discipline, and calmer releases for growing teams.</p>
                </div>
              </div>
            </div>
          </div>

          <form className="form-panel glass" onSubmit={handleSubmit} data-reveal>
            <div className="field-grid">
              <div className="field">
                <input
                  id="contact-name"
                  placeholder=" "
                  ref={nameRef}
                  value={form.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                />
                <label htmlFor="contact-name">Name</label>
                {errors.name ? <span className="helper">{errors.name}</span> : null}
              </div>

              <div className="field">
                <input
                  id="contact-email"
                  placeholder=" "
                  value={form.email}
                  onChange={(event) => handleChange("email", event.target.value)}
                />
                <label htmlFor="contact-email">Email</label>
                {errors.email ? <span className="helper">{errors.email}</span> : null}
              </div>
            </div>

            <div className="field" style={{ marginTop: 14 }}>
              <input
                id="contact-subject"
                placeholder=" "
                value={form.subject}
                onChange={(event) => handleChange("subject", event.target.value)}
              />
              <label htmlFor="contact-subject">Subject</label>
            </div>

            <div className="field" style={{ marginTop: 14 }}>
              <textarea
                id="contact-message"
                placeholder=" "
                value={form.message}
                onChange={(event) => handleChange("message", event.target.value)}
              />
              <label htmlFor="contact-message">Tell me about the project</label>
              {errors.message ? <span className="helper">{errors.message}</span> : null}
            </div>

            <div className="hero-actions" style={{ marginTop: 20 }}>
              <button className="primary-button" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send message"}
                <i className="fa-solid fa-paper-plane" />
              </button>
              <span className="muted-text">Response time: typically within 24 hours.</span>
            </div>
          </form>
        </div>
      </div>

      {toastMessage ? <div className="toast">{toastMessage}</div> : null}
    </section>
  );
}

function Footer({ about }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-panel glass">
          <div>
            <strong style={{ color: "var(--heading)", display: "block", marginBottom: 6 }}>
              {about.name}
            </strong>
            <span className="footer-copy">
              Crafted in React as a single-file portfolio experience.
            </span>
          </div>

          <div className="social-row">
            {about.socials.map((social) => (
              <a
                key={social.label}
                className="icon-button"
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
              >
                <i className={social.icon} />
              </a>
            ))}
          </div>

          <div className="footer-copy">
            © {new Date().getFullYear()} {about.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

function EnhancedHero({ about, onNavigate }) {
  const [typedText, setTypedText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const pauseRef = useRef(null);

  useEffect(() => {
    const roles = about.roles?.length ? about.roles : DEFAULT_ABOUT.roles;
    const currentRole = roles[roleIndex % roles.length];

    const interval = window.setInterval(() => {
      setTypedText((currentText) => {
        if (!isDeleting) {
          const nextText = currentRole.slice(0, currentText.length + 1);
          if (nextText === currentRole) {
            window.clearInterval(interval);
            pauseRef.current = window.setTimeout(() => setIsDeleting(true), 1100);
          }
          return nextText;
        }

        const nextText = currentRole.slice(0, Math.max(0, currentText.length - 1));
        if (nextText.length === 0) {
          window.clearInterval(interval);
          setIsDeleting(false);
          setRoleIndex((current) => (current + 1) % roles.length);
        }
        return nextText;
      });
    }, isDeleting ? 44 : 90);

    return () => {
      window.clearInterval(interval);
      if (pauseRef.current) {
        window.clearTimeout(pauseRef.current);
      }
    };
  }, [about.roles, roleIndex, isDeleting]);

  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy" data-reveal>
            <span className="eyebrow">Product engineering with clarity, speed, and restraint</span>
            <div className="hero-name">{about.name}</div>
            <div className="hero-topline">
              <span className="hero-availability">
                <i className="fa-solid fa-circle" style={{ fontSize: 8, color: "var(--accent-2)" }} />
                Open to high-impact roles
              </span>
              <span className="hero-location">
                <i className="fa-solid fa-location-dot" />
                {about.location}
              </span>
            </div>
            <h1>
              Designing and building <span className="gradient-text">clean, high-trust</span> product experiences.
            </h1>
            <div className="hero-subtitle">
              <i className="fa-solid fa-wand-magic-sparkles" />
              <span>{about.title}</span>
            </div>
            <div className="typewriter">{typedText}</div>
            <p style={{ marginTop: 18, maxWidth: "60ch" }}>
              {about.intro}
            </p>

            <div className="hero-actions">
              <button className="primary-button" type="button" onClick={() => onNavigate("projects")}>
                View projects <i className="fa-solid fa-arrow-right" />
              </button>
              <button className="ghost-button" type="button" onClick={() => onNavigate("contact")}>
                Contact me
              </button>
            </div>

            <div className="hero-proof">
              <div className="hero-proof-item">
                <strong>7+</strong>
                <span className="muted-text">Years shipping production interfaces</span>
              </div>
              <div className="hero-proof-item">
                <strong>28</strong>
                <span className="muted-text">Launches across product, platform, and growth</span>
              </div>
              <div className="hero-proof-item">
                <strong>96%</strong>
                <span className="muted-text">Peak Lighthouse and UX quality targets</span>
              </div>
            </div>
          </div>

          <div className="hero-showcase" data-reveal>
            <div className="hero-clean-card glass-soft">
              <h3>What I bring to a team</h3>
              <p className="muted-text" style={{ margin: 0 }}>
                Strong frontend execution, product taste, and the ability to turn fuzzy ideas into interfaces that feel focused and finished.
              </p>

              <div className="hero-summary-list">
                <div className="hero-summary-item">
                  <i className="fa-solid fa-cubes" />
                  <div>
                    <strong style={{ color: "var(--heading)" }}>Frontend systems</strong>
                    <div className="muted-text">React architecture, maintainable UI patterns, and quality-first delivery.</div>
                  </div>
                </div>
                <div className="hero-summary-item">
                  <i className="fa-solid fa-pen-ruler" />
                  <div>
                    <strong style={{ color: "var(--heading)" }}>Interface craft</strong>
                    <div className="muted-text">Visual clarity, better hierarchy, and interactions that feel polished without being noisy.</div>
                  </div>
                </div>
                <div className="hero-summary-item">
                  <i className="fa-solid fa-gauge-high" />
                  <div>
                    <strong style={{ color: "var(--heading)" }}>Execution speed</strong>
                    <div className="muted-text">A calm process from concept to shipped product, with performance and reliability in mind.</div>
                  </div>
                </div>
              </div>

              <div className="hero-microproof">
                <span>React</span>
                <span>TypeScript</span>
                <span>Design systems</span>
                <span>Performance</span>
                <span>AI UX</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EnhancedAbout({ about }) {
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHeading
          eyebrow="About"
          title="Design taste, frontend depth, and product judgment in the same seat."
          description="I like software that feels clear before it feels clever. The work I gravitate toward sits at the intersection of elegant interaction design, durable systems, and real business momentum."
        />

        <div className="about-grid">
          <div className="about-photo glass-soft" data-reveal>
            <img src={about.profileImage} alt={about.name} />
            <div className="about-badge">
              <strong style={{ display: "block", marginBottom: 8, color: "var(--heading)" }}>
                {about.title}
              </strong>
              <span className="muted-text">
                Based in {about.location}. Best in roles that blend interface architecture, product sense, and execution.
              </span>
            </div>
          </div>

          <div className="about-copy about-panel glass" data-reveal>
            <span className="eyebrow">Craft + Systems + Outcomes</span>
            <h2 style={{ fontSize: "clamp(2.3rem, 4vw, 4.4rem)" }}>{about.name}</h2>
            <p>{about.bio}</p>

            <div className="hero-actions" style={{ marginTop: 26 }}>
              <a className="primary-button" href={about.resumeUrl} target="_blank" rel="noreferrer">
                Download Resume <i className="fa-solid fa-file-arrow-down" />
              </a>
              <a className="ghost-button" href={`mailto:${about.email}`}>
                {about.email}
              </a>
            </div>

            <div className="social-row" style={{ marginTop: 22 }}>
              {about.socials.map((social) => (
                <a
                  key={social.label}
                  className="icon-button"
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                >
                  <i className={social.icon} />
                </a>
              ))}
            </div>

            <div className="about-story-grid">
              <div className="about-note-card">
                <strong>Operating principles</strong>
                <div className="principle-list">
                  <div className="principle-item">
                    <i className="fa-solid fa-sparkles" />
                    <span>Design intent should survive implementation and still feel premium in the browser.</span>
                  </div>
                  <div className="principle-item">
                    <i className="fa-solid fa-layer-group" />
                    <span>Good systems reduce friction for teams without sanding personality out of the product.</span>
                  </div>
                  <div className="principle-item">
                    <i className="fa-solid fa-gauge-high" />
                    <span>Performance, accessibility, and trust are features users feel immediately.</span>
                  </div>
                </div>
              </div>

              <ActivityGrid />
            </div>
          </div>
        </div>

        <div className="stats-grid" data-reveal>
          {about.stats.map((stat) => (
            <CounterStat key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EnhancedSkills({ skills }) {
  const grouped = skills.reduce((accumulator, skill) => {
    if (!accumulator[skill.category]) {
      accumulator[skill.category] = [];
    }
    accumulator[skill.category].push(skill);
    return accumulator;
  }, {});

  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHeading
          eyebrow="Skills"
          title="A toolkit built for expressive interfaces and dependable product delivery."
          description="The stack matters less than the leverage it creates. These are the capabilities I reach for when the work needs both taste and technical strength."
        />

        <div className="skills-grid">
          {Object.entries(grouped).map(([category, categorySkills]) => {
            const meta = SKILL_CATEGORY_META[category] || {};
            return (
              <div key={category} className="skill-card glass" data-reveal>
                <div className="skill-card-header">
                  <div>
                    <div className="skill-card-title">
                      <span className="skill-card-icon">
                        <i className={meta.icon || "fa-solid fa-star"} />
                      </span>
                      <h3>{category}</h3>
                    </div>
                    <p className="skill-description">{meta.blurb}</p>
                  </div>
                  <span className="chip-button">{categorySkills.length} skills</span>
                </div>

                <div className="skill-list">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="skill-pill">
                      <div style={{ width: "100%" }}>
                        <strong>{skill.name}</strong>
                        <div className="skill-bar">
                          <div
                            className="skill-fill"
                            style={{ width: `${levelWidths[skill.level] || 60}%` }}
                          />
                        </div>
                      </div>
                      <span className="skill-level-badge">{skill.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PortfolioProjectCard({ project, onLightboxOpen, featured = false }) {
  const [transformStyle, setTransformStyle] = useState(
    "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)"
  );
  const cardRef = useRef(null);

  const handleMouseMove = (event) => {
    const element = cardRef.current;
    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 12;
    const rotateX = (0.5 - y) * 10;
    setTransformStyle(
      `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`
    );
  };

  return (
    <article
      ref={cardRef}
      className="project-card glass"
      data-reveal
      style={{ transform: transformStyle }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() =>
        setTransformStyle("perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)")
      }
    >
      <div className="project-image-shell">
        <button className="image-button" type="button" onClick={() => onLightboxOpen(project)}>
          <img src={project.image} alt={project.title} />
          <div className="project-image-overlay">
            <strong>{featured ? "Featured build" : project.tags[0]}</strong>
            <span className="muted-text">Open preview</span>
          </div>
        </button>
      </div>

      <div className="project-copy">
        <div className="project-topline">
          <strong>{project.title}</strong>
          <span className="chip-button">{project.tags.length} tags</span>
        </div>
        <p>{project.description}</p>

        <div className="badge-row">
          {project.tags.map((tag) => (
            <span className="badge" key={`${project.id}-${tag}`}>
              {tag}
            </span>
          ))}
        </div>

        <div className="project-links">
          <a className="ghost-button" href={project.githubUrl} target="_blank" rel="noreferrer">
            <i className="fa-brands fa-github" /> GitHub
          </a>
          <a className="primary-button" href={project.liveUrl} target="_blank" rel="noreferrer">
            <i className="fa-solid fa-up-right-from-square" /> Live Demo
          </a>
        </div>
      </div>
    </article>
  );
}

function EnhancedProjects({ projects, onLightboxOpen }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", ...new Set(projects.flatMap((project) => project.tags))];
  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.tags.includes(activeFilter));

  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work that balances product ambition with implementation discipline."
          description="The goal is never just to ship features. It is to build interfaces that create trust, momentum, and clarity for the people using them."
        />

        <div className="projects-toolbar" data-reveal>
          <div className="projects-summary">
            Showing <strong style={{ color: "var(--heading)" }}>{filteredProjects.length}</strong> project{filteredProjects.length === 1 ? "" : "s"} from a curated portfolio.
          </div>
          <div className="filter-row">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`filter-button ${activeFilter === filter ? "active" : ""}`}
                type="button"
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <PortfolioProjectCard
              key={project.id}
              project={project}
              featured={index === 0}
              onLightboxOpen={onLightboxOpen}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function EnhancedContact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const nameRef = useRef(null);

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = "A valid email is required.";
    }
    if (!form.message.trim() || form.message.trim().length < 20) {
      nextErrors.message = "Please share a little more detail.";
    }
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      if (nextErrors.name && nameRef.current) {
        nameRef.current.focus();
      }
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setToastMessage("Message queued. Thanks for reaching out.");
      setForm({ name: "", email: "", subject: "", message: "" });
      window.setTimeout(() => setToastMessage(""), 2800);
    }, 1000);
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <SectionHeading
          eyebrow="Contact"
          title="If the product is ambitious and the standards are high, we will probably get along."
          description="I work best with teams that care about velocity and feel. If that sounds like your environment, send the context and I will be happy to take a look."
        />

        <div className="contact-grid">
          <div className="contact-panel glass" data-reveal>
            <span className="eyebrow">Best fit</span>
            <h3 style={{ color: "var(--heading)", fontSize: "2rem", margin: "16px 0 10px" }}>
              Staff-level frontend leadership for products that need taste and throughput.
            </h3>
            <p className="muted-text">
              I am especially useful when the team needs someone who can raise the visual bar, improve system quality, and still ship without drama.
            </p>

            <div className="contact-points">
              <div className="contact-point">
                <strong>Product surfaces</strong>
                <span className="muted-text">Complex workflows, premium dashboards, onboarding, AI-assisted UX.</span>
              </div>
              <div className="contact-point">
                <strong>Platform and systems</strong>
                <span className="muted-text">Design systems, interface architecture, frontend standards, release confidence.</span>
              </div>
              <div className="contact-point">
                <strong>Collaboration style</strong>
                <span className="muted-text">Fast feedback loops, close design partnership, ownership from strategy through polish.</span>
              </div>
            </div>
          </div>

          <form className="form-panel glass" onSubmit={handleSubmit} data-reveal>
            <div className="form-header">
              <span className="eyebrow">Start here</span>
              <h3>Tell me what you are building.</h3>
              <p className="muted-text">
                A little context goes a long way. Share the team, challenge, and what success should look like.
              </p>
            </div>

            <div className="field-grid">
              <div className="field">
                <input
                  id="contact-name-2"
                  placeholder=" "
                  ref={nameRef}
                  value={form.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                />
                <label htmlFor="contact-name-2">Name</label>
                {errors.name ? <span className="helper">{errors.name}</span> : null}
              </div>

              <div className="field">
                <input
                  id="contact-email-2"
                  placeholder=" "
                  value={form.email}
                  onChange={(event) => handleChange("email", event.target.value)}
                />
                <label htmlFor="contact-email-2">Email</label>
                {errors.email ? <span className="helper">{errors.email}</span> : null}
              </div>
            </div>

            <div className="field" style={{ marginTop: 14 }}>
              <input
                id="contact-subject-2"
                placeholder=" "
                value={form.subject}
                onChange={(event) => handleChange("subject", event.target.value)}
              />
              <label htmlFor="contact-subject-2">Subject</label>
            </div>

            <div className="field" style={{ marginTop: 14 }}>
              <textarea
                id="contact-message-2"
                placeholder=" "
                value={form.message}
                onChange={(event) => handleChange("message", event.target.value)}
              />
              <label htmlFor="contact-message-2">Project details</label>
              {errors.message ? <span className="helper">{errors.message}</span> : null}
            </div>

            <div className="hero-actions" style={{ marginTop: 20 }}>
              <button className="primary-button" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send message"}
                <i className="fa-solid fa-paper-plane" />
              </button>
              <span className="muted-text">Usually replies within 24 hours.</span>
            </div>
          </form>
        </div>
      </div>

      {toastMessage ? <div className="toast">{toastMessage}</div> : null}
    </section>
  );
}

function EnhancedFooter({ about }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-panel glass">
          <div>
            <strong style={{ color: "var(--heading)", display: "block", marginBottom: 8 }}>
              {about.name}
            </strong>
            <span className="footer-copy">
              Premium interface craft, modern frontend systems, and product-minded engineering.
            </span>
          </div>

          <div className="social-row">
            {about.socials.map((social) => (
              <a
                key={social.label}
                className="icon-button"
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
              >
                <i className={social.icon} />
              </a>
            ))}
          </div>

          <div className="footer-copy">
            © {new Date().getFullYear()} {about.name}. Built in React with a custom local admin CMS.
          </div>
        </div>
      </div>
    </footer>
  );
}

function Lightbox({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox-card glass" onClick={(event) => event.stopPropagation()}>
        <div className="lightbox-header">
          <div>
            <h3>{project.title}</h3>
            <span className="muted-text">{project.tags.join(" • ")}</span>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close lightbox">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <img src={project.image} alt={project.title} />
      </div>
    </div>
  );
}

function AdminLoginModal({ onClose, onLogin, error }) {
  const [password, setPassword] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(password);
  };

  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="login-card glass" onClick={(event) => event.stopPropagation()}>
        <div className="admin-topbar">
          <div>
            <span className="eyebrow">Admin Access</span>
            <h3 style={{ marginTop: 16 }}>Protected dashboard</h3>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close admin login">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <p className="muted-text">
          Enter the admin password to manage projects, skills, and profile content.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="field" style={{ marginTop: 18 }}>
            <input
              id="admin-password"
              ref={inputRef}
              type="password"
              placeholder=" "
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <label htmlFor="admin-password">Password</label>
          </div>

          {error ? (
            <div className="helper" style={{ marginTop: 10, color: "#fca5a5" }}>
              {error}
            </div>
          ) : null}

          <div className="hero-actions" style={{ marginTop: 22 }}>
            <button className="primary-button" type="submit">
              Unlock Dashboard
            </button>
            <span className="muted-text">Password demo: admin123</span>
          </div>
        </form>
      </div>
    </div>
  );
}

function AdminDashboard({
  projects,
  setProjects,
  skills,
  setSkills,
  about,
  setAbout,
  onClose,
  onLogout,
}) {
  const [activeTab, setActiveTab] = useState("projects");
  const [adminMessage, setAdminMessage] = useState("");
  const [projectDraft, setProjectDraft] = useState({
    id: "",
    title: "",
    description: "",
    image: "",
    githubUrl: "",
    liveUrl: "",
    tags: "",
  });
  const [skillDraft, setSkillDraft] = useState({
    name: "",
    category: "Frontend",
    level: "intermediate",
  });
  const [aboutDraft, setAboutDraft] = useState(about);
  const importRef = useRef(null);

  useEffect(() => {
    setAboutDraft(about);
  }, [about]);

  const showMessage = (message) => {
    setAdminMessage(message);
    window.setTimeout(() => setAdminMessage(""), 2600);
  };

  const startProjectEdit = (project) => {
    setProjectDraft({
      id: project.id,
      title: project.title,
      description: project.description,
      image: project.image,
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      tags: project.tags.join(", "),
    });
  };

  const resetProjectDraft = () => {
    setProjectDraft({
      id: "",
      title: "",
      description: "",
      image: "",
      githubUrl: "",
      liveUrl: "",
      tags: "",
    });
  };

  const handleProjectSave = (event) => {
    event.preventDefault();
    const normalizedProject = {
      id: projectDraft.id || createId("project"),
      title: projectDraft.title.trim(),
      description: projectDraft.description.trim(),
      image: projectDraft.image.trim(),
      githubUrl: projectDraft.githubUrl.trim(),
      liveUrl: projectDraft.liveUrl.trim(),
      tags: projectDraft.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    if (
      !normalizedProject.title ||
      !normalizedProject.description ||
      !normalizedProject.image ||
      normalizedProject.tags.length === 0
    ) {
      showMessage("Please complete all required project fields.");
      return;
    }

    setProjects((current) => {
      const exists = current.some((project) => project.id === normalizedProject.id);
      return exists
        ? current.map((project) =>
            project.id === normalizedProject.id ? normalizedProject : project
          )
        : [normalizedProject, ...current];
    });

    resetProjectDraft();
    showMessage("Project saved.");
  };

  const handleProjectDelete = (projectId) => {
    setProjects((current) => current.filter((project) => project.id !== projectId));
    if (projectDraft.id === projectId) {
      resetProjectDraft();
    }
    showMessage("Project deleted.");
  };

  const handleSkillAdd = (event) => {
    event.preventDefault();
    if (!skillDraft.name.trim()) {
      showMessage("Skill name is required.");
      return;
    }

    setSkills((current) => [
      ...current,
      {
        id: createId("skill"),
        name: skillDraft.name.trim(),
        category: skillDraft.category,
        level: skillDraft.level,
      },
    ]);

    setSkillDraft({
      name: "",
      category: skillDraft.category,
      level: "intermediate",
    });
    showMessage("Skill added.");
  };

  const handleSkillDelete = (skillId) => {
    setSkills((current) => current.filter((skill) => skill.id !== skillId));
    showMessage("Skill removed.");
  };

  const handleAboutSave = (event) => {
    event.preventDefault();
    setAbout(aboutDraft);
    showMessage("About section updated.");
  };

  const handleAboutStatChange = (index, field, value) => {
    setAboutDraft((current) => ({
      ...current,
      stats: current.stats.map((stat, statIndex) =>
        statIndex === index
          ? {
              ...stat,
              [field]: field === "value" ? Number(value) || 0 : value,
            }
          : stat
      ),
    }));
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify({ projects, skills, about }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "portfolio-admin-export.json";
    link.click();
    URL.revokeObjectURL(url);
    showMessage("Admin data exported.");
  };

  const handleImport = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || "{}"));
        if (Array.isArray(parsed.projects)) {
          setProjects(parsed.projects);
        }
        if (Array.isArray(parsed.skills)) {
          setSkills(parsed.skills);
        }
        if (parsed.about && typeof parsed.about === "object") {
          setAbout(parsed.about);
        }
        showMessage("Admin data imported.");
      } catch (error) {
        console.error(error);
        showMessage("Import failed. Please use a valid JSON export.");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  const livePreviewProject = {
    ...projectDraft,
    title: projectDraft.title || "Project title preview",
    description:
      projectDraft.description || "Project description preview will appear here as you type.",
    image:
      projectDraft.image ||
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    githubUrl: projectDraft.githubUrl || "https://github.com/",
    liveUrl: projectDraft.liveUrl || "https://example.com/",
    tags: projectDraft.tags
      ? projectDraft.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
      : ["React", "Preview"],
  };

  return (
    <>
      <div className="admin-overlay" onClick={onClose}>
        <div className="admin-shell glass" onClick={(event) => event.stopPropagation()}>
          <div className="admin-topbar">
            <div>
              <span className="eyebrow">Admin Dashboard</span>
              <h3 style={{ marginTop: 16 }}>Manage your portfolio content</h3>
            </div>

            <div className="hero-meta">
              <button className="ghost-button" type="button" onClick={onClose}>
                View Public Site
              </button>
              <button className="ghost-button" type="button" onClick={onLogout}>
                Logout
              </button>
            </div>
          </div>

          <div className="tab-row" style={{ marginBottom: 20 }}>
            {[
              { id: "projects", label: "Projects" },
              { id: "skills", label: "Skills" },
              { id: "about", label: "About" },
              { id: "stats", label: "Stats" },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
                type="button"
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "projects" ? (
            <div className="admin-grid">
              <div className="admin-panel glass-soft">
                <h3>{projectDraft.id ? "Edit project" : "Add project"}</h3>
                <p className="muted-text">
                  Update portfolio cards and preview the result before publishing it to localStorage.
                </p>

                <form onSubmit={handleProjectSave}>
                  <div className="field" style={{ marginTop: 14 }}>
                    <input
                      id="project-title"
                      placeholder=" "
                      value={projectDraft.title}
                      onChange={(event) =>
                        setProjectDraft((current) => ({ ...current, title: event.target.value }))
                      }
                    />
                    <label htmlFor="project-title">Title</label>
                  </div>

                  <div className="field" style={{ marginTop: 14 }}>
                    <textarea
                      id="project-description"
                      placeholder=" "
                      value={projectDraft.description}
                      onChange={(event) =>
                        setProjectDraft((current) => ({
                          ...current,
                          description: event.target.value,
                        }))
                      }
                    />
                    <label htmlFor="project-description">Description</label>
                  </div>

                  <div className="field-grid" style={{ marginTop: 14 }}>
                    <div className="field">
                      <input
                        id="project-image"
                        placeholder=" "
                        value={projectDraft.image}
                        onChange={(event) =>
                          setProjectDraft((current) => ({ ...current, image: event.target.value }))
                        }
                      />
                      <label htmlFor="project-image">Image URL</label>
                    </div>

                    <div className="field">
                      <input
                        id="project-tags"
                        placeholder=" "
                        value={projectDraft.tags}
                        onChange={(event) =>
                          setProjectDraft((current) => ({ ...current, tags: event.target.value }))
                        }
                      />
                      <label htmlFor="project-tags">Comma-separated tags</label>
                    </div>
                  </div>

                  <div className="field-grid" style={{ marginTop: 14 }}>
                    <div className="field">
                      <input
                        id="project-github"
                        placeholder=" "
                        value={projectDraft.githubUrl}
                        onChange={(event) =>
                          setProjectDraft((current) => ({
                            ...current,
                            githubUrl: event.target.value,
                          }))
                        }
                      />
                      <label htmlFor="project-github">GitHub URL</label>
                    </div>

                    <div className="field">
                      <input
                        id="project-live"
                        placeholder=" "
                        value={projectDraft.liveUrl}
                        onChange={(event) =>
                          setProjectDraft((current) => ({
                            ...current,
                            liveUrl: event.target.value,
                          }))
                        }
                      />
                      <label htmlFor="project-live">Live URL</label>
                    </div>
                  </div>

                  <div className="hero-actions" style={{ marginTop: 18 }}>
                    <button className="primary-button" type="submit">
                      {projectDraft.id ? "Save changes" : "Add project"}
                    </button>
                    <button className="ghost-button" type="button" onClick={resetProjectDraft}>
                      Reset
                    </button>
                  </div>
                </form>
              </div>

              <div className="admin-panel glass-soft">
                <h3>Live preview</h3>
                <div style={{ marginTop: 18 }}>
                  <ProjectCard project={livePreviewProject} onLightboxOpen={() => undefined} />
                </div>

                <div className="admin-list">
                  {projects.map((project) => (
                    <div className="admin-item" key={project.id}>
                      <div>
                        <strong>{project.title}</strong>
                        <p>{project.description}</p>
                      </div>
                      <div className="admin-actions">
                        <button
                          className="chip-button"
                          type="button"
                          onClick={() => startProjectEdit(project)}
                        >
                          Edit
                        </button>
                        <button
                          className="chip-button"
                          type="button"
                          onClick={() => handleProjectDelete(project.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {activeTab === "skills" ? (
            <div className="admin-grid">
              <div className="admin-panel glass-soft">
                <h3>Add skill</h3>
                <form onSubmit={handleSkillAdd}>
                  <div className="field-grid" style={{ marginTop: 14 }}>
                    <div className="field">
                      <input
                        id="skill-name"
                        placeholder=" "
                        value={skillDraft.name}
                        onChange={(event) =>
                          setSkillDraft((current) => ({ ...current, name: event.target.value }))
                        }
                      />
                      <label htmlFor="skill-name">Skill name</label>
                    </div>

                    <div className="field">
                      <select
                        id="skill-category"
                        value={skillDraft.category}
                        onChange={(event) =>
                          setSkillDraft((current) => ({
                            ...current,
                            category: event.target.value,
                          }))
                        }
                      >
                        <option>Frontend</option>
                        <option>Backend</option>
                        <option>Cloud & DevOps</option>
                        <option>Product & Tools</option>
                      </select>
                      <label htmlFor="skill-category">Category</label>
                    </div>
                  </div>

                  <div className="field" style={{ marginTop: 14 }}>
                    <select
                      id="skill-level"
                      value={skillDraft.level}
                      onChange={(event) =>
                        setSkillDraft((current) => ({ ...current, level: event.target.value }))
                      }
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="expert">Expert</option>
                    </select>
                    <label htmlFor="skill-level">Level</label>
                  </div>

                  <div className="hero-actions" style={{ marginTop: 18 }}>
                    <button className="primary-button" type="submit">
                      Add skill
                    </button>
                  </div>
                </form>
              </div>

              <div className="admin-panel glass-soft">
                <h3>Current skills</h3>
                <div className="admin-list">
                  {skills.map((skill) => (
                    <div className="admin-item" key={skill.id}>
                      <div>
                        <strong>{skill.name}</strong>
                        <p>
                          {skill.category} • {skill.level}
                        </p>
                      </div>
                      <button
                        className="chip-button"
                        type="button"
                        onClick={() => handleSkillDelete(skill.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {activeTab === "about" ? (
            <div className="admin-grid">
              <div className="admin-panel glass-soft">
                <h3>Edit about section</h3>
                <form onSubmit={handleAboutSave}>
                  <div className="field-grid" style={{ marginTop: 14 }}>
                    <div className="field">
                      <input
                        id="about-name"
                        placeholder=" "
                        value={aboutDraft.name}
                        onChange={(event) =>
                          setAboutDraft((current) => ({ ...current, name: event.target.value }))
                        }
                      />
                      <label htmlFor="about-name">Name</label>
                    </div>

                    <div className="field">
                      <input
                        id="about-title"
                        placeholder=" "
                        value={aboutDraft.title}
                        onChange={(event) =>
                          setAboutDraft((current) => ({ ...current, title: event.target.value }))
                        }
                      />
                      <label htmlFor="about-title">Title</label>
                    </div>
                  </div>

                  <div className="field-grid" style={{ marginTop: 14 }}>
                    <div className="field">
                      <input
                        id="about-image"
                        placeholder=" "
                        value={aboutDraft.profileImage}
                        onChange={(event) =>
                          setAboutDraft((current) => ({
                            ...current,
                            profileImage: event.target.value,
                          }))
                        }
                      />
                      <label htmlFor="about-image">Profile image URL</label>
                    </div>

                    <div className="field">
                      <input
                        id="about-resume"
                        placeholder=" "
                        value={aboutDraft.resumeUrl}
                        onChange={(event) =>
                          setAboutDraft((current) => ({
                            ...current,
                            resumeUrl: event.target.value,
                          }))
                        }
                      />
                      <label htmlFor="about-resume">Resume URL</label>
                    </div>
                  </div>

                  <div className="field" style={{ marginTop: 14 }}>
                    <textarea
                      id="about-bio"
                      placeholder=" "
                      value={aboutDraft.bio}
                      onChange={(event) =>
                        setAboutDraft((current) => ({ ...current, bio: event.target.value }))
                      }
                    />
                    <label htmlFor="about-bio">Bio</label>
                  </div>

                  <div className="field" style={{ marginTop: 14 }}>
                    <textarea
                      id="about-intro"
                      placeholder=" "
                      value={aboutDraft.intro}
                      onChange={(event) =>
                        setAboutDraft((current) => ({ ...current, intro: event.target.value }))
                      }
                    />
                    <label htmlFor="about-intro">Hero intro line</label>
                  </div>

                  <div className="admin-list">
                    {aboutDraft.stats.map((stat, index) => (
                      <div key={stat.label} className="admin-item">
                        <div style={{ width: "100%" }}>
                          <strong>{stat.label}</strong>
                          <div className="field-grid" style={{ marginTop: 10 }}>
                            <div className="field">
                              <input
                                id={`stat-label-${index}`}
                                placeholder=" "
                                value={stat.label}
                                onChange={(event) =>
                                  handleAboutStatChange(index, "label", event.target.value)
                                }
                              />
                              <label htmlFor={`stat-label-${index}`}>Label</label>
                            </div>

                            <div className="field">
                              <input
                                id={`stat-value-${index}`}
                                type="number"
                                placeholder=" "
                                value={stat.value}
                                onChange={(event) =>
                                  handleAboutStatChange(index, "value", event.target.value)
                                }
                              />
                              <label htmlFor={`stat-value-${index}`}>Value</label>
                            </div>
                          </div>

                          <div className="field" style={{ marginTop: 12 }}>
                            <input
                              id={`stat-suffix-${index}`}
                              placeholder=" "
                              value={stat.suffix}
                              onChange={(event) =>
                                handleAboutStatChange(index, "suffix", event.target.value)
                              }
                            />
                            <label htmlFor={`stat-suffix-${index}`}>Suffix</label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="hero-actions" style={{ marginTop: 18 }}>
                    <button className="primary-button" type="submit">
                      Save about content
                    </button>
                  </div>
                </form>
              </div>

              <div className="admin-panel glass-soft">
                <h3>About preview</h3>
                <div className="about-photo glass-soft" style={{ marginTop: 18 }}>
                  <ProfileVisual about={aboutDraft} />
                  <div className="about-badge">
                    <strong style={{ display: "block", marginBottom: 8, color: "var(--heading)" }}>
                      {aboutDraft.title}
                    </strong>
                    <span className="muted-text">{aboutDraft.bio}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {activeTab === "stats" ? (
            <div className="admin-panel glass-soft">
              <h3>Portfolio stats</h3>
              <p className="muted-text">Quick counts for the content currently stored in localStorage.</p>

              <div className="admin-stats-grid">
                <div className="admin-stat-card glass">
                  <span className="admin-stat-value">{projects.length}</span>
                  <span className="muted-text">Projects</span>
                </div>
                <div className="admin-stat-card glass">
                  <span className="admin-stat-value">{skills.length}</span>
                  <span className="muted-text">Skills</span>
                </div>
                <div className="admin-stat-card glass">
                  <span className="admin-stat-value">{about.stats.length}</span>
                  <span className="muted-text">About stats</span>
                </div>
                <div className="admin-stat-card glass">
                  <span className="admin-stat-value">
                    {projects.reduce((total, project) => total + project.tags.length, 0)}
                  </span>
                  <span className="muted-text">Tag references</span>
                </div>
              </div>

              <div className="hero-actions" style={{ marginTop: 24 }}>
                <button className="primary-button" type="button" onClick={exportData}>
                  Export JSON
                </button>
                <button
                  className="ghost-button"
                  type="button"
                  onClick={() => importRef.current?.click()}
                >
                  Import JSON
                </button>
                <input
                  ref={importRef}
                  type="file"
                  accept="application/json"
                  style={{ display: "none" }}
                  onChange={handleImport}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {adminMessage ? <div className="toast">{adminMessage}</div> : null}
    </>
  );
}

export default function DeveloperPortfolioApp() {
  const [theme, setTheme] = useLocalStorage("portfolio-theme", "dark");
  const [projects, setProjects] = useLocalStorage("portfolio-projects", DEFAULT_PROJECTS);
  const [skills, setSkills] = useLocalStorage("portfolio-skills", DEFAULT_SKILLS);
  const [about, setAbout] = useLocalStorage("portfolio-about", DEFAULT_ABOUT);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminError, setAdminError] = useState("");
  const [lightboxProject, setLightboxProject] = useState(null);

  useEffect(() => {
    setAbout((current) => {
      const next = { ...current };
      let changed = false;

      if (!current.name || current.name === LEGACY_NAME) {
        next.name = DEFAULT_ABOUT.name;
        changed = true;
      }

      if (!current.email || current.email === LEGACY_EMAIL) {
        next.email = DEFAULT_ABOUT.email;
        changed = true;
      }

      if (!current.resumeUrl || current.resumeUrl === LEGACY_RESUME_URL) {
        next.resumeUrl = DEFAULT_ABOUT.resumeUrl;
        changed = true;
      }

      if (current.profileImage === LEGACY_PROFILE_IMAGE) {
        next.profileImage = "";
        changed = true;
      }

      return changed ? next : current;
    });
  }, [setAbout]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.16 }
    );

    const elements = document.querySelectorAll("[data-reveal]");
    elements.forEach((element, index) => {
      element.style.transitionDelay = `${Math.min(index * 55, 260)}ms`;
      observer.observe(element);
    });

    return () => {
      elements.forEach((element) => {
        element.style.transitionDelay = "";
      });
      observer.disconnect();
    };
  }, [projects.length, skills.length, isAdminOpen]);

  useEffect(() => {
    const handleHashAdmin = () => {
      if (window.location.hash === "#admin") {
        setIsAdminOpen(true);
      }
    };

    handleHashAdmin();
    window.addEventListener("hashchange", handleHashAdmin);
    return () => window.removeEventListener("hashchange", handleHashAdmin);
  }, []);

  const navigateToSection = (sectionId) => {
    if (sectionId === "admin") {
      openAdmin();
      return;
    }

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const openAdmin = () => {
    setAdminError("");
    setIsAdminOpen(true);
    if (window.location.hash !== "#admin") {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}#admin`
      );
    }
  };

  const closeAdmin = () => {
    setAdminError("");
    setIsAdminOpen(false);
    if (window.location.hash === "#admin") {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }
  };

  const handleAdminLogin = (password) => {
    // Replace with real auth in production.
    if (password === "admin123") {
      setIsAdminLoggedIn(true);
      setAdminError("");
      return;
    }

    setAdminError("Incorrect password. Try admin123 for the demo.");
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    closeAdmin();
  };

  return (
    <div className={`portfolio-root ${theme}`}>
      <HeadEnhancements />
      <FloatingOrbs />
      <CustomCursor />

      <Navbar
        about={about}
        theme={theme}
        onToggleTheme={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
        onNavigate={navigateToSection}
        onOpenAdmin={openAdmin}
      />

      <main>
        <EnhancedHero about={about} onNavigate={navigateToSection} />
        <EnhancedAbout about={about} />
        <EnhancedSkills skills={skills} />
        <EnhancedProjects projects={projects} onLightboxOpen={setLightboxProject} />
        <EnhancedContact />
      </main>

      <EnhancedFooter about={about} />

      {lightboxProject ? (
        <Lightbox project={lightboxProject} onClose={() => setLightboxProject(null)} />
      ) : null}

      {isAdminOpen && !isAdminLoggedIn ? (
        <AdminLoginModal
          onClose={closeAdmin}
          onLogin={handleAdminLogin}
          error={adminError}
        />
      ) : null}

      {isAdminOpen && isAdminLoggedIn ? (
        <AdminDashboard
          projects={projects}
          setProjects={setProjects}
          skills={skills}
          setSkills={setSkills}
          about={about}
          setAbout={setAbout}
          onClose={closeAdmin}
          onLogout={handleLogout}
        />
      ) : null}
    </div>
  );
}
