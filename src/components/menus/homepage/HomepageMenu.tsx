import { Menu } from "antd"
import { ReactElement, useEffect, useState } from "react";
import {
    UserOutlined,
    HomeOutlined,
    CloseOutlined,
    FileAddOutlined,
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { getUserDetails, logoutUser } from "../../../services/UserService";
import Cookies from "js-cookie";
import { UserDetails } from "../../../interfaces/model/UserDetails";
import { IHomepageMenu } from "../../../interfaces/components/menu/IHomepageMenu";
import CreateUpdateBoardModal from "../../modals/createBoard/CreateUpdateBoardModal";
import "./HomepageMenu.css"

const HomepageMenu = ({ setIsSpinning, resetBoard }: IHomepageMenu): ReactElement => {
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState<UserDetails>()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const token = Cookies.get("jwt-token")

    const handleLogout = (): void => {
        logoutUser()
        navigate("/")
    }

    useEffect(() => {
        const fetchUserDetails = async () => {
            const response = await getUserDetails(token!)
            setUserDetails(response.data)
        }
        fetchUserDetails()
    }, [token])

    const showModal = () => {
        setIsModalOpen(true)
        setIsSpinning!(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
        setIsSpinning!(false)
    }

    const roleHandler = () => {
        if (userDetails?.roles[0].name === "ROLE_ADMIN") {
            return (
                <>
                    <Menu.Item className="menu-item-hover" key="4" icon={<FileAddOutlined />} onClick={showModal}>
                        Create Board
                    </Menu.Item>
                    <CreateUpdateBoardModal
                        showModal={showModal}
                        isModalOpen={isModalOpen}
                        handleCancel={handleCancel}
                        setIsSpinning={setIsSpinning}
                        isCreating={true}
                        reset={resetBoard}
                    />
                </>
            )
        }
    }

    const handleNavigation = () => {
        localStorage.clear()
        navigate("/homepage")
    }

    return (
        <div>
            <Menu className="homepage-sider-menu"
                mode="inline">
                <Menu.Item className="menu-item-hover" key="1" icon={<HomeOutlined />} onClick={handleNavigation}>
                    Homepage
                </Menu.Item>
                <Menu.Item className="menu-item-hover" key="2" icon={<UserOutlined />} onClick={() => navigate("/profile")}>
                    Profile
                </Menu.Item>
                {roleHandler()}
                <Menu.Item className="menu-item-hover" key="3" icon={<CloseOutlined />} onClickCapture={handleLogout}>
                 Logout
                
                </Menu.Item>
            </Menu>
        </div>
    )

}

export default HomepageMenu