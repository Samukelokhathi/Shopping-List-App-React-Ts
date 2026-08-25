import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

import type { AppDispatch } from "../../store/Store";
// import { logout } from "../../store/AuthSlice";

import styles from "./Navbar.module.css";

function Navbar() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    // const handleLogout = () => {
    //     dispatch(logout());
    //     navigate("/login");
    // };

    return (
        <header className={styles.navbar}>
            <div className={styles.logo}>
                Basket
            </div>

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

                <Button
                    className={styles.signOutButton}
                    onClick={() => navigate("/")}
                >
                    Sign out
                </Button>
            </nav>
        </header>
    );
}

export default Navbar;