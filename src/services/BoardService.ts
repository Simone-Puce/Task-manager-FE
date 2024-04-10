import axios from "axios"

const APP_CONTEXT_URI = "http://localhost:8080/task-manager"
const VERSION_URI = APP_CONTEXT_URI + "/v1"
const BOARD_BASE_URI = VERSION_URI + "/board"
const FIND_BY_CODE = BOARD_BASE_URI + "/find-by-id"
const PUT_BY_CODE = BOARD_BASE_URI + "/modify"
const DELETE_BY_CODE = BOARD_BASE_URI + "/delete"
const CREATE = BOARD_BASE_URI + "/create"
const GET_ALL = BOARD_BASE_URI + "/list"

export const getAllBoards = async (token: string) => {
    try {
        const response = await axios.get(GET_ALL, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getBoardById = async (id: number, token: string) => {
    try {
        const response = await axios.get(FIND_BY_CODE, {
            headers: { Authorization: `Bearer ${token}` },
            params: {id: id}
        })
        return response.data
    } catch (error: any) {
        return error
    }
}

export const createNewBoard = async (newBoard: string, token: string) => {

    try {
        const response = await axios.post(CREATE,
            {
                boardName: newBoard
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const updateBoard = async (newBoardName: string, id: number, token: string) => {
    try {
        const response = await axios.put(PUT_BY_CODE,
            {
                boardName: newBoardName
            },
            {
                params: {
                    boardId: id
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getAudit = async () => {
    const awaitResponse = await axios.get(VERSION_URI + "/audit/get-all")
    console.log(awaitResponse)
    return awaitResponse.data
}

export const deleteBoard = async (id: number, token: string) => {
    try {
        const response = await axios.put(DELETE_BY_CODE,{},
            {
                params: {
                    boardId: id
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

