import { Dispatch } from "react"
import { Task } from "../../model/Task"

export interface ICreateUpdateTaskModal {
    reset: ()=> void
    showModal?: any,
    isModalOpen?: boolean,
    handleCancel?: any,
    selectedLane?: number,
    selectedBoardId?: number
    setSelectedBoardId?: Dispatch<React.SetStateAction<number | undefined>>
    createTaskHandler?: (newTask: Task) => void
}