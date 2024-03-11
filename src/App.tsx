import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import Homepage from "./pages/homepage/Homepage";
import BoardPage from "./pages/board/BoardPage";
import { ProtectedRoutes } from "./services/ProtectedRoutes"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="register" element={<RegisterPage />} />
          <Route path="homepage" element={<Homepage />} />
          <Route path="board" element={<BoardPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
