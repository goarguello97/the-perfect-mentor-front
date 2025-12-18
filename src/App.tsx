import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
import UsersPage from "./pages/UsersPage";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/login", "/signup"];
  const shouldShowBar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowBar && <Navbar />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </>
  );
}

export default App;
