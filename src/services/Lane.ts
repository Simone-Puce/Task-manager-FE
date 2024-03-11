import axios from "axios"

const APP_CONTEXT_URI = "http://localhost:8080/task-manager"
const VERSION_URI = APP_CONTEXT_URI + "/v1"
const LANE_BASE_URI = VERSION_URI + "/lane"
const GET_LANE_BY_ID = LANE_BASE_URI + "/find-by-id"
const CREATE_LANE = LANE_BASE_URI + "/create"

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

export const createLane = async (token: string, laneName: string) => {
    try {
        const response = await axios.post(CREATE_LANE,
            {
                laneName: laneName
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