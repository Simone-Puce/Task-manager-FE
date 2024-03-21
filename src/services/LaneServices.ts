import axios from "axios"
import { Lane } from "../interfaces/model/Lane"

const APP_CONTEXT_URI = "http://localhost:8080/task-manager"
const VERSION_URI = APP_CONTEXT_URI + "/v1"
const LANE_BASE_URI = VERSION_URI + "/lane"
const GET_LANE_BY_ID = LANE_BASE_URI + "/find-by-id"
const CREATE_LANE = LANE_BASE_URI + "/create"
const UPDATE_LANE = LANE_BASE_URI + "/modify"
const DELETE_LANE = LANE_BASE_URI + "/delete"

export const getLaneById = async (token: string, id: number) => {
    try {
        const response = await axios.get(GET_LANE_BY_ID, {
            params: { id: id },
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const createLane = async (token: string, newLane: Lane) => {
    console.log(newLane)
    try {
        const response = await axios.post(CREATE_LANE,
            {
                laneName: newLane.laneName,
                boardId: newLane.boardId
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const updateLane = async (token: string, newLane: Lane) => {
    try {
        const response = await axios.put(UPDATE_LANE, {
            params: {
                laneName: newLane.laneName,
                boardId: newLane.boardId
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

export const deleteLane = async (token: string, id: number) => {
    try {
        const response = await axios.put(DELETE_LANE, {
            params: {
                laneId: id
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