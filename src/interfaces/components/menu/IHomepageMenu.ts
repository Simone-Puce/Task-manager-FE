import { Dispatch } from "react"

export interface IHomepageMenu {
    adminCreateBoard?: any
    resetBoard?: () => void
    userSubMenu?: any
    setIsSpinning?: Dispatch<React.SetStateAction<boolean>>
}