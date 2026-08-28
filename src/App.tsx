import Login from "./pages/Login/Login";
import Register from "./pages/Signup/Register";
import Home from "./pages/Dashboard/Home";
import Profile from "./pages/Profile/Profile";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}
