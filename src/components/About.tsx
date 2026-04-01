import { useState } from "react";
import { Reveal } from "./Reveal";
import styles from "./About.module.css";

export function About(props: {
  about: {
    paragraphs: string[];
    values: { title: string; body: string }[];
    toolset: string[];
  };
  name: string;
  portraitUrl?: string;
}) {
  const [portraitOk, setPortraitOk] = useState(true);
  const initials = props.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <section className={styles.section} id="about" aria-label="About">
      <Reveal>
        <div className={styles.head}>
          <h2 className={styles.title}>About</h2>
          <p className={styles.sub}>Full-stack web work shaped by product thinking, clean structure, and visual clarity.</p>
        </div>
      </Reveal>

      <div className={styles.grid}>
        <Reveal>
          <div className={styles.bioCard}>
            {props.about.paragraphs.map((p) => (
              <p key={p} className={styles.p}>
                {p}
              </p>
            ))}
            <div className={styles.toolset} aria-label="Toolset">
              {props.about.toolset.map((t) => (
                <span key={t} className={styles.tool}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className={styles.photoCard}>
            <figure className={styles.figure}>
              {portraitOk ? (
                <img
                  className={styles.portrait}
                  src={props.portraitUrl ?? "/portrait.jpg"}
                  alt={`Portrait of ${props.name}`}
                  loading="lazy"
                  onError={() => setPortraitOk(false)}
                />
              ) : (
                <div className={styles.avatar} role="img" aria-label="Portrait">
                  <span className={styles.initials} aria-hidden="true">
                    {initials || "SS"}
                  </span>
                </div>
              )}
              <figcaption className={styles.caption}>{props.name}</figcaption>
            </figure>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className={styles.values}>
          <h3 className={styles.valuesTitle}>Values</h3>
          <div className={styles.valuesGrid}>
            {props.about.values.map((v) => (
              <div key={v.title} className={styles.value}>
                <div className={styles.valueTop}>
                  <span className={styles.valueMark} aria-hidden="true" />
                  <h4 className={styles.valueTitle}>{v.title}</h4>
                </div>
                <p className={styles.valueBody}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
