import { ReactElement } from "react";
import "./HomepageHeader.css"
import { Header } from "antd/es/layout/layout";

const HomepageHeader = (): ReactElement => {
    return (
        <Header className="header-container">
            <span> Task manager </span>
        </Header>
    )
}

export default HomepageHeader