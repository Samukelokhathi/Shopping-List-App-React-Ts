import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/Dashboard/Home";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
