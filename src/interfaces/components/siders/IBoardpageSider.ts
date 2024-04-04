import { Dispatch } from "react"

export interface IBoardpageSider {
    selectedBoardId?: number | undefined
    setSelectedBoardId?: Dispatch<React.SetStateAction<number | undefined>>
    setIsBoardSpinning?: Dispatch<React.SetStateAction<boolean>>
    isSpinning?: boolean
    seed?: number
    reset: ()=>void
}