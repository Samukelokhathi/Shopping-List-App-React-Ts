import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.logo}>Basket</span>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Smart Shopping Lists</h1>
          <p className={styles.subtitle}>
            Organize, track, and share your shopping lists with ease.
          </p>
          <button
            className={styles.ctaButton}
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
        </section>

        <section className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.icon}>📋</span>
            <h2 className={styles.featureTitle}>Create Lists</h2>
            <p className={styles.featureText}>
              Group items by category and keep track of quantities.
            </p>
          </div>

          <div className={styles.feature}>
            <span className={styles.icon}>✏️</span>
            <h2 className={styles.featureTitle}>Edit & Update</h2>
            <p className={styles.featureText}>
              Modify your lists anytime with instant updates.
            </p>
          </div>

          <div className={styles.feature}>
            <span className={styles.icon}>🤝</span>
            <h2 className={styles.featureTitle}>Share</h2>
            <p className={styles.featureText}>
              Send your shopping list to friends or family with one click.
            </p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>
          &copy; {new Date().getFullYear()} Smart Shopping Lists. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;