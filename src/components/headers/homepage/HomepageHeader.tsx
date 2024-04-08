import { ReactElement } from "react";
import DefaultHeader from "../DefaultHeader";

const HomepageHeader = (): ReactElement => {
    return (
        <DefaultHeader 
            givenString={"Task Manager 404 - Welcome to the Homepage"}
        />
    )
}

export default HomepageHeader