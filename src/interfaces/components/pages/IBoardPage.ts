import { Dispatch } from "react"

export interface IBoardPage {
    selectedBoardId?: number | undefined
    setSelectedBoardId?: Dispatch<React.SetStateAction<number | undefined>>
    setIsBoardSpinning?: Dispatch<React.SetStateAction<boolean>>
    isSpinning?: boolean
    seed?: number
    reset?: ()=>void
}