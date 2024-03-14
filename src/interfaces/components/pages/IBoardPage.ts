import { Dispatch } from "react"

export interface IBoardPage {
    selectedBoardId?: number | undefined
    setSelectedBoardId?: Dispatch<React.SetStateAction<number | undefined>>
}