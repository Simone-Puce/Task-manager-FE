import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { UserBoardAssociation } from "../interfaces/model/UserBoardAssociation"

const APP_CONTEXT_URI = "http://localhost:8080/task-manager"
const VERSION_URI = APP_CONTEXT_URI + "/v1"
const BOARD_USER_BASE_URI = VERSION_URI + "/user-board"
const FIND_BOARD_BY_USER = BOARD_USER_BASE_URI + "/find-boards-by-user"
const CREATE_USER_BOARD_ASSOCIATION = BOARD_USER_BASE_URI + "/create"

export const getUserBoards = async (token: string) => {
    const decodedToken = jwtDecode(token)
    const email = decodedToken.sub
    try {
        const response = await axios.get(FIND_BOARD_BY_USER,
            {
                params: {
                    email: email
                },
                headers: { Authorization: `Bearer ${token}` }
            })
        console.log(response)
        //add return statment 
    } catch (error) {
        console.log(error)
    }
}

export const associateUserBoard = async (newUserBoardAssociation: UserBoardAssociation, token: string) => {
    try {
        const response = await axios.post(CREATE_USER_BOARD_ASSOCIATION,
            {
                newUserBoardAssociation
            }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log(response)
        //add return statment
    } catch (error) {
        console.log(error)
    }
}
