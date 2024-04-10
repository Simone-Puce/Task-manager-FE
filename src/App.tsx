import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import Homepage from "./pages/homepage/Homepage";
import BoardPage from "./pages/board/BoardPage";
import { ProtectedRoutes } from "./services/ProtectedRoutes"
import ProfilePage from "./pages/profile/ProfilePage";
import { useEffect, useState } from "react";
import SpinnerPage from "./pages/spinner/SpinnerPage";
import "./App.css";
import AuditChart from "./components/chart/AuditChart";

function App() {
  const [selectedBoardId, setSelectedBoardId] = useState<number>()
  const [isSpinning, setIsSpinning] = useState<boolean>(false)

  useEffect(() => {
    if (localStorage.getItem("my-board-id") !== undefined && selectedBoardId === undefined) {
      setSelectedBoardId(parseInt(localStorage.getItem("my-board-id")!))
    }
  }, [selectedBoardId, setSelectedBoardId])

  return (
    <Router>
      <Routes>
        <Route path="" element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="homepage" element={<Homepage setSelectedBoardId={setSelectedBoardId} isSpinning={isSpinning} setIsSpinning={setIsSpinning} />} />
          <Route path="audit" element={<AuditChart/>} /> 
          <Route path="board" element={<BoardPage setSelectedBoardId={setSelectedBoardId} selectedBoardId={selectedBoardId} isSpinning={isSpinning} setIsBoardSpinning={setIsSpinning}/>} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="spinner" element={<SpinnerPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
