import { Input } from "../../components/input/Input";
import styles from "./Login.module.css";
import Button from "../../components/Button/Button";

function Login() {
  return (
    <div className={styles.page}>
      <form className={styles.card}>
        <Input
          id="email"
          name="email"
          label="Email Address"
          type="email"
          value={"email"}
          onChange={() => {}}
        />

        <Input
          id="password"
          name="password"
          label="Password"
          type="password"
          value={"password"}
          onChange={() => {}}
        />

        <Button type="submit">Sign in</Button>

        <p className={styles.registerText}>
          New here? <a className={styles.registerLink}>Create an Account</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
