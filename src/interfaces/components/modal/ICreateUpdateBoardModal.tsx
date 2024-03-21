import { Dispatch } from "react"

export interface ICreateUPdateBoardModal {
    showModal?: any,
    isModalOpen?: boolean,
    handleOk?: any,
    handleCancel?: any,
    modifiedBy?: string
    modifiedDate?: Date
    boardName?: string
    setIsSpinning? :  Dispatch<React.SetStateAction<boolean>>
    isCreating?: boolean
    boardId?: number
}