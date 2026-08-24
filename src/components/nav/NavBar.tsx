import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import type { AppDispatch } from "../../store/Store";
import { logout } from "../../store/AuthSlice";

import styles from "./Navbar.module.css";

function Navbar() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <header className={styles.navbar}>
            <div className={styles.logo}>
                Basket
            </div>

            <nav className={styles.navigation}>
                <button
                    className={`${styles.navButton} ${styles.active}`}
                    onClick={() => navigate("/home")}
                >
                    My lists
                </button>

                <button
                    className={styles.profileButton}
                    onClick={() => navigate("/profile")}
                >
                    Profile
                </button>

                <button
                    className={styles.signOutButton}
                    onClick={handleLogout}
                >
                    Sign out
                </button>
            </nav>
        </header>
    );
}

export default Navbar;