import { Menu } from "antd"
import { ReactElement } from "react";
import {
    UserOutlined,
    MailOutlined,
    HomeOutlined,
    CalendarOutlined,
    CloseOutlined
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../services/UserService";



const HomepageMenu = (): ReactElement => {
    const navigate = useNavigate()
    const handleLogout = (): void => {
        logoutUser()
        navigate("/")
    }

    return (
        <div>
            <Menu theme="dark"
                mode="inline"
            >
                <Menu.Item key="1" icon={<UserOutlined />} onClick={() => navigate("/profile")}>
                    Profile
                </Menu.Item>
                <Menu.Item key="2" icon={<MailOutlined />} onClick={() => navigate("/notifications")}>
                    Notifications
                </Menu.Item>
                <Menu.Item key="3" icon={<HomeOutlined />} onClick={() => navigate("/homepage")}>
                    Homepage
                </Menu.Item>
                <Menu.Item key="4" icon={<CloseOutlined />} onClick={handleLogout}>
                    Logout
                </Menu.Item>
            </Menu>
        </div>
    )

}

export default HomepageMenu