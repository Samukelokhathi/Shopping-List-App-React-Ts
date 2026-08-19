import { Input } from "../../components/input/Input";
import styles from "./Login.module.css";

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

        <button className={styles.button} type="submit">
          Sign in
        </button>

        <p className={styles.registerText}>
          New here?{" "}
          <button type="button" className={styles.link}>
            Create an Account
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;
