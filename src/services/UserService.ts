import axios from "axios"
import { RegisterUser } from "../interfaces/model/RegisterUser"
import { LoginUser } from "../interfaces/model/LoginUser"
import Cookies from "js-cookie"

const APP_CONTEXT_URI = "http://localhost:8080/task-manager"
const VERSION_URI = APP_CONTEXT_URI + "/v1"
const REGISTER_USER_URI = VERSION_URI + "/register"
const LOGIN_USER_URI = VERSION_URI + "/login"
const GET_USER_DETAILS_URI = VERSION_URI + "/email";
const GET_ALL_USERS = VERSION_URI + "/registered-users"

export const registerNewUser = async (newUser: RegisterUser) => {
    try {
        const response = await axios.post(REGISTER_USER_URI, newUser)
        return response.data;
    } catch (error) {
       return error
    }
}

export const loginUser = async (loginUserData: LoginUser) => {
    try {
        const response = await axios.post(LOGIN_USER_URI, loginUserData)
        return response.data;
    } catch (error: any) {
        return error.response.data
    }
}

export const getAllUsers = async (token: string) => {
    try {
        const response = await axios.get(GET_ALL_USERS,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const logoutUser = () => {
    Cookies.remove("jwt-token")
}

export const getUserDetails = async (token: string) => {
    try {
        const response = await axios.get(GET_USER_DETAILS_URI, {
            params: { token: token },
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data
    } catch (error) {
        console.log("error")
    }
}