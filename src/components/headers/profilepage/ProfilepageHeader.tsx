import { ReactElement, useEffect, useState } from "react"
import { Header } from "antd/es/layout/layout";
import "./ProfilepageHeader.css"


const ProfilepageHeader = (): ReactElement => {

    return (
        <Header className="profile-header-style">
            <div className="header-title">
            Task Manager 404
            </div>
        </Header>
    )
}

export default ProfilepageHeader