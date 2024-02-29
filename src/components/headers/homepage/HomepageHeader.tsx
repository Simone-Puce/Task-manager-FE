import { ReactElement } from "react";
import DefaultHeader from "../DefaultHeader";

const HomepageHeader = (): ReactElement => {
    return (
        <DefaultHeader 
            givenString={"Task manager - welcome to the homepage"}
        />
    )
}

export default HomepageHeader