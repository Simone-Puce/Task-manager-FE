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
import SubMenu from "antd/es/menu/SubMenu";
import "./HomepageMenuAdmin.css"


const HomepageMenuAdmin = (): ReactElement => {
    const navigate = useNavigate()
    const handleLogout = (): void => {
        logoutUser()
        navigate("/")
    }

    return (
        <div>
            <Menu theme="dark"
                mode="inline">
                <Menu.Item key="1" icon={<HomeOutlined />} onClick={() => navigate("/homepage")}>
                    Homepage
                </Menu.Item>
                <Menu.Item key="2" icon={<UserOutlined />} onClick={() => navigate("/profile")}>
                    Profile
                </Menu.Item>
                <Menu.Item key="3" icon={<MailOutlined />} onClick={() => navigate("/notifications")}>
                    Notifications
                </Menu.Item>
          

                <SubMenu
                    key="sub4"
                    title={"Boards"}
                    icon={<CalendarOutlined />}
                    className="submenu">
                    <Menu.Item key="4" onClick={() => navigate("/board")}>
                        Board1
                    </Menu.Item>
                    <Menu.Item key="6">
                        Board2
                    </Menu.Item>
                    <Menu.Item key="7">
                        Board3
                    </Menu.Item>
                    <Menu.Item key="8">
                        Board4
                    </Menu.Item>
                    <Menu.Item key="9">
                        Board5
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key="5" icon={<CloseOutlined />} onClick={handleLogout}>
                    Logout
                </Menu.Item>
            </Menu>
        </div>
    )

}

export default HomepageMenuAdmin
