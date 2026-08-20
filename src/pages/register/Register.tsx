import { Input } from "../../components/input/Input";
import styles from "./Register.module.css";
import Button from "../../components/Button/Button";
import { Text } from "../../components/Text/Text";

import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/Store";

import {
  setName,
  setSurname,
  setNumber,
  setEmail,
  setPassword,
  setConfirmPassword,
} from "../../store/SignUpSlice";

function Register() {
  const dispatch = useDispatch<AppDispatch>();

  const signUpData = useSelector((state: RootState) => state.signUp);
  console.log(signUpData.email);
  return (
    <div className={styles.page}>
      <div className={styles.welcomeText}>
        <Text variant="h2" children={"Create your basket"} />
        <Text
          variant="p"
          children={"Your password is encrypted before it is ever stored."}
        />
      </div>

      <form className={styles.card}>
        <div className={styles.nameSurnameContainer}>
          <Input
            id="Name"
            name="Name"
            label="Name"
            type="text"
            onChange={(e) => dispatch(setName(e.target.value))}
            style={{ width: 240 }}
          />
          <Input
            id="Surname"
            name="Surname"
            label="Surname"
            type="text"
            onChange={(e) => dispatch(setSurname(e.target.value))}
            style={{ width: 240 }}
          />
        </div>
        <Input
          id="email"
          name="Email"
          label="Email"
          type="text"
          onChange={(e) => dispatch(setEmail(e.target.value))}
        />
        <Input
          id="Cell number"
          name="Cell number"
          label="Cell number"
          type="text"
          onChange={(e) => dispatch(setNumber(e.target.value))}
        />
        <div className={styles.passwordContainer}>
          <Input
            id="Password"
            name="Password"
            label="Password"
            type="password"
            onChange={(e) => dispatch(setPassword(e.target.value))}
            style={{ width: 240 }}
          />
          <Input
            id="Confirm password"
            name="Confirm password"
            label="Confirm password"
            type="password"
            onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
            style={{ width: 240 }}
          />
        </div>

        <Button type="submit">Sign up</Button>

        <p className={styles.registerText}>
          Already registered?{" "}
          <NavLink to={"/"} className={styles.registerLink}>
            Sign in
          </NavLink>
        </p>
      </form>
    </div>
  );
}

export default Register;
