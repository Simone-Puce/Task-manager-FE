import axios from "axios"

const APP_CONTEXT_URI = "http://localhost:8080/task-manager"
const VERSION_URI = APP_CONTEXT_URI + "/v1"
const TASK_USER_BASE_URI = VERSION_URI + "/task-user"
const CREATE_USER_TASK_ASSOCIATION = TASK_USER_BASE_URI + "/create"


export const associateUserTask = async (token: string, taskId: number, userEmail: any) => {
    const email: any = userEmail.selectedUserEmail
    try {
        const response = await axios.post(CREATE_USER_TASK_ASSOCIATION, {
            taskId: taskId,
            email: email
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}
