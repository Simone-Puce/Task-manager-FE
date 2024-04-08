import { Dispatch } from "react"
export interface ISuccessRegistrationModal {
    showModal?: any,
    isModalOpen?: boolean,
    handleOk?: any,
    handleCancel?: any,
    selectedLane?: number,
    selectedBoardId?: number
    setSelectedBoardId?: Dispatch<React.SetStateAction<number | undefined>>
    modifiedBy?: string
    modifiedDate?: Date
    boardName?: string
    setIsSpinning? :  Dispatch<React.SetStateAction<boolean>>
}