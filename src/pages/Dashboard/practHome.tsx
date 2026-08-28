import { Input } from "../../ui/Input/Input";
import styles from "./Register.module.css";
import Button from "../../ui/Button/Button";
import { Text } from "../../ui/Text/Text";

import { NavLink, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "../../store/Store";

import {
  setName,
  setSurname,
  setNumber,
  setEmail,
  setPassword,
  setConfirmPassword,
  resetForm,
  signup,
} from "../../store/Signup/SignUp";

function Register() {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  // Get signup data from Redux

  const signUpData = useSelector((state: RootState) => state.signUp);

  // Get loading and error

  const isLoading = signUpData.isLoading;

  const error = signUpData.error;

  // ==========================
  // SUBMIT
  // ==========================

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(
        signup({
          name: signUpData.name,
          surname: signUpData.surname,
          number: signUpData.number,
          email: signUpData.email,
          password: signUpData.password,
          confirmPassword: signUpData.confirmPassword,
        }),
      ).unwrap();

      // Signup successful

      dispatch(resetForm());

      // Go to login

      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.welcomeText}>
        <Text variant="h2" children="Create your basket" />

        <Text
          variant="p"
          children="Your password is encrypted before it is ever stored."
        />
      </div>

      <form className={styles.card} onSubmit={handleSubmit}>
        {/* NAME + SURNAME */}

        <div className={styles.nameSurnameContainer}>
          <Input
            id="Name"
            name="Name"
            label="Name"
            type="text"
            value={signUpData.name}
            onChange={(e) => dispatch(setName(e.target.value))}
            style={{
              width: 240,
            }}
            required
          />

          <Input
            id="Surname"
            name="Surname"
            label="Surname"
            type="text"
            value={signUpData.surname}
            onChange={(e) => dispatch(setSurname(e.target.value))}
            style={{
              width: 240,
            }}
            required
          />
        </div>

        {/* EMAIL */}

        <Input
          id="email"
          name="Email"
          label="Email"
          type="email"
          value={signUpData.email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
          required
        />

        {/* CELL NUMBER */}

        <Input
          id="Cell number"
          name="Cell number"
          label="Cell number"
          type="text"
          value={signUpData.number}
          onChange={(e) => dispatch(setNumber(e.target.value))}
          required
        />

        {/* PASSWORDS */}

        <div className={styles.passwordContainer}>
          <Input
            id="Password"
            name="Password"
            label="Password"
            type="password"
            value={signUpData.password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            style={{
              width: 240,
            }}
            required
          />

          <Input
            id="Confirm password"
            name="Confirm password"
            label="Confirm password"
            type="password"
            value={signUpData.confirmPassword}
            onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
            style={{
              width: 240,
            }}
            required
          />
        </div>

        {/* ERROR */}

        {error && <p>{error}</p>}

        {/* SUBMIT */}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Sign up"}
        </Button>

        {/* LOGIN LINK */}

        <p className={styles.registerText}>
          Already registered?{" "}
          <NavLink to="/" className={styles.registerLink}>
            Sign in
          </NavLink>
        </p>
      </form>
    </div>
  );
}

export default Register;
