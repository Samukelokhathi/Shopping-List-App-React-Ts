import Login from "./pages/Login/Login";
import Register from "./pages/Signup/Register";
import Home from "./pages/Dashboard/Home";
import Profile from "./pages/Profile/Profile";
import { SharedListPage } from "./pages/SharedListPage/SharedList";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Route, Routes } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store/Store";
import { getLoggedInUser, authChecked } from "./store/Auth/Login";

import ShoppingListDetails from "./pages/Dashboard/ShoppingListDetails";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();

  // Check whether the user has already been restored.
  const authCheckedState = useSelector(
    (state: RootState) => state.login.authChecked,
  );

  // Restore the logged-in user when the app starts.
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      dispatch(getLoggedInUser());
    } else {
      // No saved user means there is nothing to restore.
      dispatch(authChecked());
    }
  }, [dispatch]);


  if (!authCheckedState) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sharedList" element={<SharedListPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/shoppingListItems" element={<ShoppingListDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}
