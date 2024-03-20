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

interface UserInBoard {
    firstName: string,
    lastName: string,
    email: string,
    roleCodeForBoard: string
}