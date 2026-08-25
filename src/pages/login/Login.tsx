import { Input } from "../../components/Input/Input";
import styles from "./Login.module.css";
import Button from "../../components/Button/Button";
import { Text } from "../../components/Text/Text";
import { NavLink } from "react-router-dom";

import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();
  const navToHome = () => {
    navigate("/home")
  }


  return (
    <div className={styles.page}>
      <div className={styles.welcomeText}>
        <Text variant="h2" children={"Welcome back"} />
        <Text
          variant="p"
          children={"Sign in to pick up your shopping where you left off."}
        />
      </div>

      <form className={styles.card}>
        <Input
          id="email"
          name="email"
          label="Email Address"
          type="email"
          onChange={() => { }}
          required

        />

        <Input
          id="password"
          name="password"
          label="Password"
          type="password"
          onChange={() => { }}
          required
        />

        <Button onClick={navToHome} type="submit">Sign in</Button>

        <p className={styles.registerText}>
          New here?{" "}
          <NavLink to={"/register"} className={styles.registerLink}>
            Create an account+
          </NavLink>
        </p>
      </form>
    </div>
  );
}

export default Login;
