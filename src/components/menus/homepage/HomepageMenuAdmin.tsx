import { Menu } from "antd"
import { ReactElement, useState } from "react";
import {
    UserOutlined,
    MailOutlined,
    HomeOutlined,
    CloseOutlined,
    FileAddOutlined
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../services/UserService";
import "./HomepageMenuAdmin.css"
import CreateBoardModal from "../../modals/createBoard/CreateBoardModal";


const HomepageMenuAdmin = (): ReactElement => {
    const navigate = useNavigate()
    const handleLogout = (): void => {
        logoutUser()
        navigate("/")
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

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
                <Menu.Item icon={<FileAddOutlined />} onClick={showModal}>
                    Create Board
                </Menu.Item>
                <CreateBoardModal
                showModal={showModal}
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                />
                <Menu.Item key="5" icon={<CloseOutlined />} onClick={handleLogout}>
                    Logout
                </Menu.Item>
            </Menu>
        </div>
    )

}

export default HomepageMenuAdmin