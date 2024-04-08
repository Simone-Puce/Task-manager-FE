import { Attachment } from "./Attachment"
import { UserInBoard } from "./UserInBoard"

export interface Task {
    taskId?: number
    taskName?: string
    laneId?: number,
    createdBy?: string
    modifiedBy?: string
    createdDate?: Date
    modifiedDate?: Date
    description?: string
    users?: UserInBoard[]
    attachments?: Attachment[]
}