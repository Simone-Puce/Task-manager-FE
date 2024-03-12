import { Button, Card } from "antd"
import "./ProfilepageContent.css"
import { HomeOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { UserDetails } from "../../../interfaces/model/UserDetails";
import { getUserDetails } from "../../../services/UserService";


const ProfilepageContent = () => {

    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState<UserDetails>()

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = Cookies.get("jwt-token")
            const response = await getUserDetails(token!)
            setUserDetails(response.data)
        }

        fetchUserDetails()
    }, [])


    return (
        <div className="container-card">
            <Card
                className="profile-card"
            >
                <div className="img-card-container">
                    <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" className="img-values"/>
                </div>
                <p>{userDetails?.firstName}</p>
                <p>{userDetails?.lastName}</p>
                <p>{userDetails?.email}</p>
                <Button icon={<HomeOutlined />} onClick={() => navigate("/homepage")}></Button>
            </Card>
        </div>
    )
}
export default ProfilepageContent