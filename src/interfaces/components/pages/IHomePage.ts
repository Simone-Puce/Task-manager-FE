import { Dispatch } from "react";

export interface IHomePage {
    setSelectedBoardId: Dispatch<React.SetStateAction<number | undefined>>
}