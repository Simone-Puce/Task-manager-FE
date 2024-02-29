import { Header } from "antd/es/layout/layout"
import { IDefaultHeaders } from "../../interfaces/components/headers/IDefaultHeaders"
import "./DefaultHeader.css"

const DefaultHeader = ({givenString} : IDefaultHeaders) => {
    return (
        <Header className="header-container">
            <span> {givenString} </span>
        </Header>
    )
}

export default DefaultHeader