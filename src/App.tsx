import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ActivateUserPage from "./pages/ActivateUserPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import ReportsPage from "./pages/ReportsPage";
import SignUpPage from "./pages/SignUpPage";
import StadisticsPage from "./pages/StadisticsPage";
import UsersPage from "./pages/UsersPage";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/login", "/signup"];
  const shouldShowBar =
    !hideNavbarRoutes.includes(location.pathname) &&
    !location.pathname.startsWith("/activate/");

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
        <Route path="/stadistics" element={<StadisticsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/activate/:token" element={<ActivateUserPage />} />
      </Routes>
    </>
  );
}

export default App;
