import { UserInBoard } from "../../model/UserInBoard"

export interface IAssociateUserTaskForm {
    showTaskModal?: any
    isTaskModalOpen?: boolean
    handleCancel?: any
    deleteTask: () => void
    selectedTaskId?: number
    boardId: number
    laneId: number
    laneName: string
    isEditor: boolean
    usersTask: UserInBoard[]
    reset: () => void
}