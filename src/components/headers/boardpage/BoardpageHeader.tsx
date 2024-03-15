import { ReactElement } from "react"
import DefaultHeader from "../DefaultHeader"
import { Board } from "../../../interfaces/model/Board"

const BoardpageHeader = (props: Board): ReactElement => {
    
    return (
        <DefaultHeader 
            givenString={props.boardName}
        />
    )
}

export default BoardpageHeader