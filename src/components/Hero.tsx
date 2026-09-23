import { Reveal } from "./Reveal";
import styles from "./Hero.module.css";

export function Hero(props: {
  person: {
    name: string;
    kicker?: string;
    tagline: string;
    bioLine: string;
    location: string;
    stats: { label: string; value: string }[];
  };
  onViewWork: () => void;
  onContact: () => void;
}) {
  return (
    <section className={styles.hero} aria-label="Intro">
      <Reveal>
        <div className={styles.grid}>
          <div className={styles.left}>
            <p className={styles.kicker}>{props.person.kicker ?? "Software Developer / Designer"}</p>
            <h1 className={styles.title}>
              {props.person.name}
              <span className={styles.dot} aria-hidden="true" />
            </h1>
            <p className={styles.tagline}>{props.person.tagline}</p>
            <p className={styles.bio}>{props.person.bioLine}</p>
            <div className={styles.ctas}>
              <button className={styles.primary} type="button" onClick={props.onViewWork}>
                View Work
              </button>
              <button className={styles.secondary} type="button" onClick={props.onContact}>
                Contact
              </button>
            </div>
          </div>

        </div>
      </Reveal>
    </section>
  );
}
