import { Dispatch } from "react";

export interface IHomePage {
    setSelectedBoardId?: Dispatch<React.SetStateAction<number | undefined>>
    resetBoard?: () => void
    setIsSpinning?: Dispatch<React.SetStateAction<boolean>>
    isSpinning?: boolean
}