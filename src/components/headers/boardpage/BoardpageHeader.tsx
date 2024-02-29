import { ReactElement } from "react"
import DefaultHeader from "../DefaultHeader"

const BoardpageHeader = (): ReactElement => {
    return (
        <DefaultHeader 
            givenString={"[Board name here]"}
        />
    )
}

export default BoardpageHeader