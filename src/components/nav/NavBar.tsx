import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button/Button";

// import type { AppDispatch } from "../../store/Store";
// import { logout } from "../../store/Login/LoginSlice";

import styles from "./Navbar.module.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>Basket</div>

      <nav className={styles.navigation}>
        <Button
          className={`${styles.myListsButton} ${styles.active}`}
          onClick={() => navigate("/home")}
        >
          My lists
        </Button>

        <Button
          className={styles.profileButton}
          onClick={() => navigate("/profile")}
        >
          Profile
        </Button>

        <Button className={styles.signOutButton} onClick={handleLogout}>
          Sign out
        </Button>
      </nav>
    </header>
  );
}

export default Navbar;
