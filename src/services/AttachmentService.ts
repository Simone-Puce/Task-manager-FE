import axios from "axios"

const APP_CONTEXT_URI = "http://localhost:8080/task-manager"
const VERSION_URI = APP_CONTEXT_URI + "/v1"
const ATTACHMENT_BASE_URI = VERSION_URI + "/attachment"
const DOWNLOAD_BY_ID = ATTACHMENT_BASE_URI + "/download-by-id"
const DELETE_BY_ID = ATTACHMENT_BASE_URI + "/delete"
const UPLOAD = ATTACHMENT_BASE_URI + "/upload"


export const uploadNewFile = async (newBoard: string, token: string) => {

    try {
        const response = await axios.post(UPLOAD,
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