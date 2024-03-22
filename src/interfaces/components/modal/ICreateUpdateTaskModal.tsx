import { Dispatch } from "react"

export interface ICreateUpdateTaskModal {
    reset: ()=> void
    showModal?: any,
    isModalOpen?: boolean,
    handleCancel?: any,
    selectedLane?: number,
    selectedBoardId?: number
    setSelectedBoardId?: Dispatch<React.SetStateAction<number | undefined>>
}