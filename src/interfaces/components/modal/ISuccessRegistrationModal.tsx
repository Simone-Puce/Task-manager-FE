import { Dispatch } from "react"

export interface ISuccessRegistrationModal {
    showModal?: any,
    isModalOpen?: boolean,
    handleOk?: any,
    handleCancel?: any,
    selectedBoardId?: number
    setSelectedBoardId?: Dispatch<React.SetStateAction<number | undefined>>
    setIsSpinning? :  Dispatch<React.SetStateAction<boolean | undefined>>
}