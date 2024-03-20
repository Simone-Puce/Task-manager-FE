import { Content } from "antd/es/layout/layout"
import { Button, Card } from "antd"
import { getUserDetails } from "../../../services/UserService"
import { ReactElement, useEffect, useState } from "react"
import { UserDetails } from "../../../interfaces/model/UserDetails"
import "./HomepageContentAdmin.css"
import Cookies from "js-cookie"
import { getAllBoards } from "../../../services/BoardService"
import { Board } from "../../../interfaces/model/Board"
import { useNavigate } from "react-router-dom"
import { IHomePage } from "../../../interfaces/components/pages/IHomePage"

const HomepageContentAdmin = ({ setSelectedBoardId }: IHomePage): ReactElement => {
    const [userDetails, setUserDetails] = useState<UserDetails>()
    const [boards, setBoards] = useState<Board[]>([])
    const [showCards, setShowCards] = useState<boolean>(false)
    const token = Cookies.get("jwt-token")
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserDetails = async () => {
            const response = await getUserDetails(token!)
            setUserDetails(response.data)
        }

        fetchUserDetails()
    }, [token])

    useEffect(() => {
        const fetchAllBoards = async () => {
            const response = await getAllBoards(token!)
            setBoards(response.data)
            setShowCards(true)
        }

        fetchAllBoards()
    }, [token])

    const handleCardClick = (elementId: number) => {
        setSelectedBoardId(elementId)
        localStorage.setItem("my-board-id", elementId.toString())
        navigate("/board")
    }

    const cardDisplay = (): ReactElement => {
        if (showCards) {
            return (
                <Content className="content-width">
                    <div className="homepage-card-container">
                        {boards.map((element, index) => (
                            <Card title={element.boardName}
                                key={index}
                                bordered={true}
                                hoverable
                                onClick={() => handleCardClick(element.boardId!)}
                                className="card-style">
                                <div className="card-button">
                                    <Button type="primary">Update</Button>
                                    <Button >Delete</Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </Content>
            )
        } else {
            return (
                <h1> No boards are loaded</h1>
            )
        }
    }

    return (
        <div className="homepage-style">
            <div className="header-content-container">
                <h1>{userDetails?.firstName} {userDetails?.lastName} these are your boards</h1>
            </div>
            <div className="homepage-content-style">
                {cardDisplay()}
            </div>
        </div>
    )
}

export default HomepageContentAdmin
