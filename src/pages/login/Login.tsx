import { Input } from "../../components/Input/Input";
import styles from "./Login.module.css";
import Button from "../../components/Button/Button";
import { Text } from "../../components/Text/Text";


import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../../store/Store";
import { login } from '../../store/Auth/AuthThunks
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";



function Login() {

  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const auth = useSelector(
    (state: RootState) => state.auth
  );

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await dispatch(
        login({
          email,
          password,
        })
      ).unwrap();

      navigate("/home");

    } catch (error) {
      console.error("Login failed:", error);
    }
  };



  return (
    <div className={styles.page}>
      <div className={styles.welcomeText}>
        <Text variant="h2" children={"Welcome back"} />
        <Text
          variant="p"
          children={"Sign in to pick up your shopping where you left off."}
        />
      </div>

      <form className={styles.card} onSubmit={handleSubmit}>
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
