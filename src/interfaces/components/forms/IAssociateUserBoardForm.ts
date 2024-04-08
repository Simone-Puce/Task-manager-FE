import { Lane } from "../../model/Lane"
import { UserInBoard } from "../../model/UserInBoard"

export interface IAssociateUserBoardForm{
    boardId?: number
    boardName?: string
    lanes?: Lane[]
    users?: UserInBoard[]
    createdBy?: string
    modifiedBy?: string
    createdDate?: Date
    modifiedDate?: Date
    isEditor?: boolean
}