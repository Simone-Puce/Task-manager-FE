import { Attachment } from "./Attachment"

export interface Task {
    taskId?: number
    taskName?: string
    laneId?: number,
    createdBy?: string
    modifiedBy?: string
    createdDate?: Date
    modifiedDate?: Date
    description?: string
    attachments?: Attachment[]
}