import axios from "axios"
import { RegisterUser } from "../interfaces/model/RegisterUser"

const APP_CONTEXT_URI = "http://localhost:8080/task-manager"
const VERSION_URI = APP_CONTEXT_URI + "/v1"
const REGISTER_USER_URI = VERSION_URI + "/register"

export const registerNewUser = async (newUser: RegisterUser) => {
    console.log(newUser, "new user data")
    try {
        const response = await axios.post(REGISTER_USER_URI, newUser)
        return response;
    } catch (error) {
        console.log(error)
    }
}