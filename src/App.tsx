import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import {
  experience,
  posts,
  projects,
  siteProfile,
  skills,
  type SiteProfile,
} from "./content";
import { Background } from "./components/Background";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Resume } from "./components/Resume";
import { Writing } from "./components/Writing";
import { Contact } from "./components/Contact";
import { CaseStudyModal } from "./components/CaseStudyModal";
import { AdminPage } from "./pages/AdminPage";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import styles from "./styles/App.module.css";

function scrollToId(id: string, reducedMotion: boolean) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
}

export function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  const prefersReducedMotion = usePrefersReducedMotion();
  const [motionSetting, setMotionSetting] = useLocalStorageState<"system" | "reduced" | "full">(
    "motion",
    "full",
  );
  const reducedMotion = motionSetting === "system" ? prefersReducedMotion : motionSetting === "reduced";
  const [theme, setTheme] = useLocalStorageState<"light" | "dark">("theme", "light");

  const [profileContent, setProfileContent] = useState<SiteProfile>(siteProfile);
  const [projectList, setProjectList] = useState(projects);
  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(null);
  const activeProject = useMemo(
    () => projectList.find((p) => p.slug === activeProjectSlug) ?? null,
    [activeProjectSlug, projectList],
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.motion = reducedMotion ? "reduced" : "full";
  }, [reducedMotion]);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/site/profile")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data || cancelled) return;
        if (data.profile && typeof data.profile === "object") {
          const next = data.profile as Partial<SiteProfile>;
          if (next.person && next.socials && next.about) {
            setProfileContent({
              person: {
                ...siteProfile.person,
                ...next.person,
                stats: next.person.stats ?? siteProfile.person.stats,
              },
              socials: {
                ...siteProfile.socials,
                ...next.socials,
              },
              about: {
                ...siteProfile.about,
                ...next.about,
                paragraphs: next.about.paragraphs ?? siteProfile.about.paragraphs,
                values: next.about.values ?? siteProfile.about.values,
                toolset: next.about.toolset ?? siteProfile.about.toolset,
              },
            });
          }
        }
      })
      .catch(() => {
        // ignore; fallback to static profile
      });

    fetch("/api/site/projects")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data || cancelled) return;
        if (Array.isArray(data.projects)) setProjectList(data.projects);
      })
      .catch(() => {
        // ignore; fallback to static projects
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const home = (
    <div className={styles.app}>
      <a className={styles.skipLink} href="#work">
        Skip to work
      </a>
      <Background reducedMotion={reducedMotion} />
      <Header
        name={profileContent.person.name}
        onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
        theme={theme}
        reducedMotion={reducedMotion}
      />

      <main className={styles.main} id="top">
        <Hero
          person={profileContent.person}
          onViewWork={() => scrollToId("work", reducedMotion)}
          onContact={() => scrollToId("contact", reducedMotion)}
        />
        <Projects projects={projectList} onOpenCaseStudy={(slug) => setActiveProjectSlug(slug)} />
        <About about={profileContent.about} name={profileContent.person.name} portraitUrl={profileContent.person.portraitUrl} />
        <Experience items={experience} />
        <Skills groups={skills} />
        <Resume />
        <Writing posts={posts} />
        <Contact socials={profileContent.socials} />
        <footer className={styles.footer}>
          <div className={styles.footerGrid}>
            <div className={styles.footerMark}>
              <span className={styles.footerName}>{profileContent.person.name}</span>
              <span className={styles.footerMeta}>Built with React + Vite - Portfolio customized for full-stack web work</span>
            </div>
            <div className={styles.footerLinks}>
              <a href={profileContent.socials.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              {profileContent.socials.linkedin ? (
                <a href={profileContent.socials.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              ) : null}
              {profileContent.socials.email ? <a href={`mailto:${profileContent.socials.email}`}>Email</a> : null}
            </div>
          </div>
        </footer>
      </main>

      <CaseStudyModal project={activeProject} onClose={() => setActiveProjectSlug(null)} />
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={home} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
