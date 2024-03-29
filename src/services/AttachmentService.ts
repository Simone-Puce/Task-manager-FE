import axios from "axios"

const APP_CONTEXT_URI = "http://localhost:8080/task-manager"
const VERSION_URI = APP_CONTEXT_URI + "/v1"
const ATTACHMENT_BASE_URI = VERSION_URI + "/attachment"
const DOWNLOAD_BY_ID = ATTACHMENT_BASE_URI + "/download-by-id"
const FIND_BY_ID = ATTACHMENT_BASE_URI + "/find-by-id"
const DELETE_BY_ID = ATTACHMENT_BASE_URI + "/delete"
const UPLOAD = ATTACHMENT_BASE_URI + "/upload"

export const downloadFile = async (id: number, token: string) => {
    try {
        const response = await axios.get(DOWNLOAD_BY_ID, {
            headers: { Authorization: `Bearer ${token}` },
            params: { id: id }
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getFileById = async (id: number, token: string) => {
    try {
        const response = await axios.get(FIND_BY_ID, {
            headers: { Authorization: `Bearer ${token}` },
            params: { id: id }
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const uploadFile = async (file: File, token: string, taskId: number) => {
    console.log(file)
    try {
        const formData = new FormData()
        formData.append('file', file)
        const response = await axios.post(UPLOAD,
            {
                formData
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                },
                params: { taskId: taskId }
            })
        return response.data
    } catch (error) {
        console.log(error)
    }
}