import axios from "axios"

const APP_CONTEXT_URI = "http://localhost:8080/task-manager"
const VERSION_URI = APP_CONTEXT_URI + "/v1"
const BOARD_LANE_BASE_URI = VERSION_URI + "/board-lane"
const CREATE_BOARD_LANE = BOARD_LANE_BASE_URI + "/create"

export const associateBordLane = async (token: string, boardId: number, laneId: number) => {
    try {
        const response = await axios.post(CREATE_BOARD_LANE,
            {
                boardId: boardId,
                laneId: boardId,
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

