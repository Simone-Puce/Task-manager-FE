import axios from "axios"
import Cookies from "js-cookie"
import { Board } from "../interfaces/model/Board"

const APP_CONTEXT_URI = "http://localhost:8080/task-manager"
const VERSION_URI = APP_CONTEXT_URI + "/v1"
const BOARD_BASE_URI = VERSION_URI + "/board"
const FIND_BY_CODE = BOARD_BASE_URI + "/find-by-code"
const PUT_BY_CODE = BOARD_BASE_URI + "/modify"
const DELETE_BY_CODE = BOARD_BASE_URI + "/delete"
const CREATE = BOARD_BASE_URI + "/create"
const GET_ALL = BOARD_BASE_URI + "/list"

export const getAllBoards = async (token: string) => {
    try {
        const response = await axios.get(GET_ALL, {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getBoardByCode = async (boardCode: string) => {
    const token = Cookies.get("jwt-token")
    try {
        const response = await axios.get(FIND_BY_CODE, {
            params: { code: boardCode },
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log(response) //need to implement return statement here
    } catch (error) {
        console.log(error)
    }
}

export const createNewBoard = async (newBoardBody: Board) => {
    const token = Cookies.get("jwt-token")
    try {
        const response = await axios.post(CREATE,
            {
                //newBoardBody here
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        console.log(response) //need to implement return statement here
    } catch (error) {
        console.log(error)
    }
}

export const updateBoard = async (newBoardBody: Board, boardCode: string) => {
    const token = Cookies.get("jwt-token")
    try {
        const response = await axios.put(PUT_BY_CODE,
            {
                //newBoardBody here
            },
            {
                params: {
                    boardCode: boardCode
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        console.log(response) //need to implement return statement here
    } catch (error) {
        console.log(error)
    }
}

export const deleteBoard = async (boardCode: string) => {
    const token = Cookies.get("jwt-token")
    try {
        const response = await axios.put(DELETE_BY_CODE,
            {
                params: {
                    boardCode: boardCode
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        console.log(response) //need to implement return statement here
    } catch (error) {
        console.log(error)
    }
}

