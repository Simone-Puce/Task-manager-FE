import axios from "axios"
import { RegisterUser } from "../interfaces/model/RegisterUser"
import { LoginUser } from "../interfaces/model/LoginUser"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"

const APP_CONTEXT_URI = "http://localhost:8080/task-manager"
const VERSION_URI = APP_CONTEXT_URI + "/v1"
const REGISTER_USER_URI = VERSION_URI + "/register"
const LOGIN_USER_URI = VERSION_URI + "/login"
const GET_USER_DETAILS_URI = VERSION_URI + "/email";
const token = Cookies.get("jwt-token");

export const registerNewUser = async (newUser: RegisterUser) => {
    try {
        const response = await axios.post(REGISTER_USER_URI, newUser)
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const loginUser = async (loginUserData: LoginUser) => {
    try{
        const response = await axios.post(LOGIN_USER_URI,loginUserData)
        return response.data;
    }catch (error){
        console.log(error)
    }
}

export const getUserDetails = async () => {
    try{
        const decodedToken = jwtDecode(token!)
        const response = await axios.get(GET_USER_DETAILS_URI, {
            params: { email: decodedToken.sub },
            headers: {
                Authorization: `Bearer ${token}`,
                "Access-Control-Allow-Origin": "*"
            }})
            return response.data
        }catch(error){
            console.log("error")
        }
}