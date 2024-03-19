import { Lane } from "./Lane"

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