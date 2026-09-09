import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/Store";

export const ProtectedRoute = () => {
  const currentUser = useSelector((state: RootState) => state.login.user);

  // CHANGED: Get authentication check status.
  const authChecked = useSelector(
    (state: RootState) => state.login.authChecked,
  );

  if (!authChecked) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
