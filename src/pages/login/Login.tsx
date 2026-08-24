import { Input } from "../../components/input/Input";
import styles from "./Login.module.css";
import Button from "../../components/Button/Button";
import { Text } from "../../components/Text/Text";
import { NavLink } from "react-router-dom";

function Login() {
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
        />

        <Input
          id="password"
          name="password"
          label="Password"
          type="password"
          onChange={() => { }}
        />

        <Button type="submit">Sign in</Button>

        <p className={styles.registerText}>
          New here?{" "}
          <NavLink to={"/register"} className={styles.registerLink}>
            Create an account
          </NavLink>
        </p>
      </form>
    </div>
  );
}

export default Login;
