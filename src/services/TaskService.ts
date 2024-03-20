import axios from "axios"
import { Task } from "../interfaces/model/Task"

const APP_CONTEXT_URI = "http://localhost:8080/task-manager"
const VERSION_URI = APP_CONTEXT_URI + "/v1"
const TASK_BASE_URI = VERSION_URI + "/task"
const FIND_TASK_BY_ID = TASK_BASE_URI + "/find-by-id"
const CREATE_TASK = TASK_BASE_URI + "/create"


export const getTaskById = async (token: string, id: number) => {
    try {
        const response = await axios.get(FIND_TASK_BY_ID, {
            params: { id: id },
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const createTask = async (token: string, newTaskBody: Task) => {
    try {
        const response = await axios.post(CREATE_TASK,
            {
                taskName: newTaskBody.taskName,
                laneId: newTaskBody.laneId
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