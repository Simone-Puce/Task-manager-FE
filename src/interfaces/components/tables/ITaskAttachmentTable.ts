import { Dispatch } from "react"
import { Attachment } from "../../model/Attachment"
import { UserInBoard } from "../../model/UserInBoard"
import { Task } from "../../model/Task"

export interface ITaskAttachmentTable {
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
    setTask: Dispatch<React.SetStateAction<Task | undefined>>
    resetTaskDetails : () => void
    isEditor: boolean
    isUserAssociatedWithTask?: boolean
}