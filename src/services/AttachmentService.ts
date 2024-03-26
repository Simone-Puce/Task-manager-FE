import axios from "axios"

const APP_CONTEXT_URI = "http://localhost:8080/task-manager"
const VERSION_URI = APP_CONTEXT_URI + "/v1"
const ATTACHMENT_BASE_URI = VERSION_URI + "/attachment"
const DOWNLOAD_BY_ID = ATTACHMENT_BASE_URI + "/download-by-id"
const DELETE_BY_ID = ATTACHMENT_BASE_URI + "/delete"
const UPLOAD = ATTACHMENT_BASE_URI + "/upload"

export const downloadFile = async (id: number, token: string) => {
    try {
        const response = await axios.get(DOWNLOAD_BY_ID, {
            headers: {Authorization: `Bearer ${token}`},
            params: {id: id}
        })
       return response.data
    } catch (error) {
        console.log(error)
    }
}