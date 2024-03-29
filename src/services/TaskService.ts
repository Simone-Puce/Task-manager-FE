import axios from "axios"
import { Task } from "../interfaces/model/Task"

const APP_CONTEXT_URI = "http://localhost:8080/task-manager"
const VERSION_URI = APP_CONTEXT_URI + "/v1"
const TASK_BASE_URI = VERSION_URI + "/task"
const FIND_TASK_BY_ID = TASK_BASE_URI + "/find-by-id"
const CREATE_TASK = TASK_BASE_URI + "/create"
const UPDATE_TASK = TASK_BASE_URI + "/modify"
const DELETE_TASK = TASK_BASE_URI + "/delete"

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

export const updateTask = async (token: string, updatedTask: Task) => {
    try {
        const response = await axios.put(UPDATE_TASK,
            {
                taskName: updatedTask.taskName,
                description: updatedTask.description,
                laneId: updatedTask.laneId
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    taskId: updatedTask.taskId
                }
            })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const deleteTask = async (token: string, taskId: number) => {
    try {
        axios.put(DELETE_TASK, {},
            {
                params: { taskId: taskId },
                headers: { Authorization: `Bearer ${token}` }
            })
    } catch (error) {
        console.log(error)
    }
}