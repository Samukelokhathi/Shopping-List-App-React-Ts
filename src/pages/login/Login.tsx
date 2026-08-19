import React from "react";
import { Input } from "../../components/input/Input";
export default function Login() {
  return (
    <div>
      <Input label="Email" type="email" />
      <Input label="Password" type="password" />
    </div>
  );
}
