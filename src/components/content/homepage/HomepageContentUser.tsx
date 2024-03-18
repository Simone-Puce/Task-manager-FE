import { Content } from "antd/es/layout/layout"
import { Card } from "antd"
import { getUserDetails } from "../../../services/UserService"
import { ReactElement, useEffect, useState } from "react"
import { UserDetails } from "../../../interfaces/model/UserDetails"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import { getUserBoards } from "../../../services/BoardUserServices"
import { UserBoardAssociation } from "../../../interfaces/model/UserBoardAssociation"
import { IHomePage } from "../../../interfaces/components/pages/IHomePage"
import "./HomepageContentAdmin.css"

const HomepageContentUser = ({setSelectedBoardId} : IHomePage): ReactElement => {
    const [userDetails, setUserDetails] = useState<UserDetails>()
    const [userBoardsAssociation, setUserBoardsAssociation] = useState<UserBoardAssociation[]>([])
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
        const fetchUserBoards = async () => {
            const response = await getUserBoards(token!)
            if (response !== undefined) {
                setUserBoardsAssociation(response.data)
            }
            setShowCards(true)
        }
        fetchUserBoards()
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
                        {userBoardsAssociation.map((element, index) => (
                            <Card title={element.boardName}
                                key={index}
                                bordered={true}
                                hoverable
                                onClick={() => handleCardClick(element.boardId!)}
                                className="card-style">
                                <p>Click to see board details</p>      
                            </Card>
                        )
                        )
                        }
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

export default HomepageContentUser
