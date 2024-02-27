import axios from "axios"
import { RegisterUser } from "../interfaces/model/RegisterUser"
import { LoginUser } from "../interfaces/model/LoginUser"

const APP_CONTEXT_URI = "http://localhost:8080/task-manager"
const VERSION_URI = APP_CONTEXT_URI + "/v1"
const REGISTER_USER_URI = VERSION_URI + "/register"
const LOGIN_USER_URI = VERSION_URI + "/login"


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