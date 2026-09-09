import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Smart Shopping Lists</h1>
        <p className={styles.subtitle}>
          Organize, track, and share your shopping lists with ease.
        </p>
      </header>

      <main className={styles.main}>
        <section className={styles.features}>
          <div className={styles.feature}>
            <h2>📋 Create Lists</h2>
            <p>Group items by category and keep track of quantities.</p>
          </div>
          <div className={styles.feature}>
            <h2>✏️ Edit & Update</h2>
            <p>Modify your lists anytime with instant updates.</p>
          </div>
          <div className={styles.feature}>
            <h2>🤝 Share</h2>
            <p>Send your shopping list to friends or family with one click.</p>
          </div>
        </section>

        <button
          className={styles.ctaButton}
          onClick={() => navigate("/home")}
        >
          Get Started
        </button>
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Smart Shopping Lists. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
