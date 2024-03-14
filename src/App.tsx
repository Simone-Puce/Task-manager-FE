import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import Homepage from "./pages/homepage/Homepage";
import BoardPage from "./pages/board/BoardPage";
import { ProtectedRoutes } from "./services/ProtectedRoutes"
import ProfilePage from "./pages/profile/ProfilePage";
import { useEffect, useState } from "react";

function App() {
  const [selectedBoardId,setSelectedBoardId] = useState<number>()

  useEffect(()=> {
    if(localStorage.getItem("my-board-id") !== undefined && selectedBoardId === undefined){
      setSelectedBoardId(parseInt(localStorage.getItem("my-board-id")!))
    }
  },[selectedBoardId, setSelectedBoardId])

  return (
    <Router>
      <Routes>
        <Route path="" element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="homepage" element={<Homepage setSelectedBoardId={setSelectedBoardId}/>} />
          <Route path="board" element={<BoardPage setSelectedBoardId={setSelectedBoardId} selectedBoardId={selectedBoardId}/>} />
          <Route path="profile" element={<ProfilePage/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
