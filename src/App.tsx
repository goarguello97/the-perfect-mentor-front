import { Route, Routes, useLocation } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import Navbar from "./components/Navbar";
import { useSocket } from "./hooks/useSocketHook";
import ActivateUserPage from "./pages/ActivateUserPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import CompleteUserDataPage from "./pages/CompleteUserDataPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import RecoverPasswordPage from "./pages/RecoverPasswordPage";
import ReportsPage from "./pages/ReportsPage";
import SignUpPage from "./pages/SignUpPage";
import StadisticsPage from "./pages/StadisticsPage";
import UsersPage from "./pages/UsersPage";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/login", "/signup", "/recover", "/user-data"];
  const shouldShowBar =
    !hideNavbarRoutes.includes(location.pathname) &&
    !location.pathname.startsWith("/activate/") &&
    !location.pathname.startsWith("/change-password/");

  const { user } = useAppSelector((state) => state.auth);

  useSocket(user?._id);

  return (
    <>
      {shouldShowBar && (
        <PrivateRoute>
          <Navbar />
        </PrivateRoute>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <MainPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUpPage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UsersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/stadistics"
          element={
            <PrivateRoute>
              <StadisticsPage />
            </PrivateRoute>
          }
        />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/activate/:token" element={<ActivateUserPage />} />
        <Route path="/recover" element={<RecoverPasswordPage />} />
        <Route
          path="/change-password/:token"
          element={<ChangePasswordPage />}
        />
        <Route
          path="/user-data"
          element={
            <PrivateRoute>
              <CompleteUserDataPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
