import Login from "./pages/Login/Login";
import Register from "./pages/Signup/Register";
import Home from "./pages/Dashboard/Home";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}
