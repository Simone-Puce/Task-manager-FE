import { Menu } from "antd"
import { ReactElement, useEffect, useState } from "react";
import {
    UserOutlined,
    MailOutlined,
    HomeOutlined,
    CloseOutlined,
    CalendarOutlined,
    FileAddOutlined
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { getUserDetails, logoutUser } from "../../../services/UserService";
import SubMenu from "antd/es/menu/SubMenu";
import Cookies from "js-cookie";
import { UserDetails } from "../../../interfaces/model/UserDetails";
import CreateBoardModal from "../../modals/createBoard/CreateBoardModal";
import CreateTaskModal from "../../modals/createTask/CreateTaskModal";
import { UserBoardAssociation } from "../../../interfaces/model/UserBoardAssociation";
import { getUserBoards } from "../../../services/BoardUserServices";
import { Board } from "../../../interfaces/model/Board";
import { IBoardPage } from "../../../interfaces/components/pages/IBoardPage";
import "./BoardpageMenu.css"

const BoardpageMenu = ({ setSelectedBoardId, selectedBoardId }: IBoardPage): ReactElement => {
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState<UserDetails>()
    const [userBoardsAssociation, setUserBoardsAssociation] = useState<UserBoardAssociation[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
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

    useEffect(() => {
        const fetchUserBoards = async () => {
            const response = await getUserBoards(token!)
            if (response !== undefined) {
                setUserBoardsAssociation(response.data)
            }
        }
        fetchUserBoards()
    }, [token])

    const handleNavigation = (boardId: number) => {
        setSelectedBoardId!(boardId)
        localStorage.setItem("my-board-id", boardId.toString())
        navigate("/spinner")
    }
    
    const boardItem = () => {
        return (
            userBoardsAssociation.map((element: Board) => (
                <Menu.Item
                    title={element.boardName}
                    onClick={() => handleNavigation(element.boardId!)}
                >
                    {element.boardName}
                </Menu.Item>
            )
            )
        )
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const roleHandler = () => {
        if (userDetails?.roles[0].name === "ROLE_ADMIN") {
            return (
                <>
                    <Menu.Item key="4" icon={<FileAddOutlined />} onClick={showModal}>
                        Create Board
                    </Menu.Item>
                    <CreateBoardModal
                        showModal={showModal}
                        isModalOpen={isModalOpen}
                        handleCancel={handleCancel}
                    />
                </>
            )
        } else {
            return (
                <>
                    <Menu.Item key="10" icon={<FileAddOutlined />} onClick={showModal}>
                        New Task
                    </Menu.Item>
                    <CreateTaskModal
                        showModal={showModal}
                        isModalOpen={isModalOpen}
                        handleCancel={handleCancel}
                        selectedBoardId={selectedBoardId}
                        setSelectedBoardId={setSelectedBoardId}
                    />

                    <SubMenu
                        key="sub4"
                        title={"Boards"}
                        icon={<CalendarOutlined />}
                        className="submenu">
                        {boardItem()}
                    </SubMenu>
                </>
            )
        }
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
                {roleHandler()}
                <Menu.Item key="5" icon={<CloseOutlined />} onClick={handleLogout}>
                    Logout
                </Menu.Item>
            </Menu>
        </div>
    )

}

export default BoardpageMenu