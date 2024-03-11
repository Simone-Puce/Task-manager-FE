import { ReactElement, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Header } from "antd/es/layout/layout";
import "./ProfilepageHeader.css"
import { UserDetails } from "../../../interfaces/model/UserDetails";
import { getUserDetails } from "../../../services/UserService";
import Cookies from "js-cookie";

const ProfilepageHeader = (): ReactElement => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState<UserDetails>()

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = Cookies.get("jwt-token")
            const response = await getUserDetails(token!)
            console.log(response)
            setUserDetails(response.data)
        }

        fetchUserDetails()
    }, [])

    return (
        <Header className="profile-header-style">
            <div className="header-title">
                Task Manager 404
            </div>
        </Header>
    )
}

export default ProfilepageHeader