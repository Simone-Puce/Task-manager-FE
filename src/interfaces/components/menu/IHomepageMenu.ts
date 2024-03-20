import { Dispatch } from "react"

export interface IHomepageMenu {
    adminCreateBoard?: any
    userSubMenu?: any
    setIsSpinning?: Dispatch<React.SetStateAction<boolean>>
}