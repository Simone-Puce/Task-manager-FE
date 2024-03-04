import Cookies from "js-cookie"
import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRoutes = () =>{
    const auth = Cookies.get("jwt-token")
    return auth ? <Outlet/> : <Navigate to={"/login"}/>
}