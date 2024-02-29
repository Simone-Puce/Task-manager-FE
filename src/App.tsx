import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import Homepage from "./pages/homepage/Homepage";
import BoardPage from "./pages/board/BoardPage";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="" element={<LoginPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="homepage" element={<Homepage/>} />
      <Route path="board" element={<BoardPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
