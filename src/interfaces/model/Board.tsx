import { Lane } from "./Lane"
import { UserInBoard } from "./UserInBoard"

export interface Board {
    boardId?: number
    boardName?: string
    lanes?: Lane[]
    users?: UserInBoard[]
    createdBy?: string
    modifiedBy?: string
    createdDate?: Date
    modifiedDate?: Date
}
