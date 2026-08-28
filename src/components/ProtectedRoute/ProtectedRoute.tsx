import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/Store";

export const ProtectedRoute = () => {
  const currentUser = useSelector((state: RootState) => state.login.user);

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
