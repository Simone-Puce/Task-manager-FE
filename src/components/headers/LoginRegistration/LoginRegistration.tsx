import { Header } from "antd/es/layout/layout"
import { ReactElement } from "react"
import "./LoginRegistration.css"

const LoginRegisterHeader = (): ReactElement => {
    return (
        <Header className="header-style">
            <span> 404 Team - Task manager</span>
        </Header>
    )
}

export default LoginRegisterHeader