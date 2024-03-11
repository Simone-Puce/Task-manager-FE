import { ReactElement } from "react";
import DefaultHeader from "../DefaultHeader";

const HomepageHeader = (): ReactElement => {
    return (
        <DefaultHeader 
            givenString={"Task Manager 404 - welcome to the homepage"}
        />
    )
}

export default HomepageHeader