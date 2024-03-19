import { Dispatch } from "react";

export interface IHomePage {
    setSelectedBoardId: Dispatch<React.SetStateAction<number | undefined>>
    setIsSpinning? :  Dispatch<React.SetStateAction<boolean | undefined>>
    isSpinning?: boolean
}