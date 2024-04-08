import { Content } from "antd/es/layout/layout"
import { Button, Card } from "antd"
import { getUserDetails } from "../../../services/UserService"
import { ReactElement, useEffect, useState } from "react"
import { UserDetails } from "../../../interfaces/model/UserDetails"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import { getUserBoards } from "../../../services/BoardUserServices"
import { UserBoardAssociation } from "../../../interfaces/model/UserBoardAssociation"
import { IHomePage } from "../../../interfaces/components/pages/IHomePage"
import { ArrowRightOutlined } from "@ant-design/icons"
import "./HomepageContentAdmin.css"

const HomepageContentUser = ({ setSelectedBoardId }: IHomePage): ReactElement => {
    const [userDetails, setUserDetails] = useState<UserDetails>()
    const [userBoardsAssociation, setUserBoardsAssociation] = useState<UserBoardAssociation[]>([])
    const token = Cookies.get("jwt-token")
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserDetailsAndBoards = async () => {
            const response1 = await getUserDetails(token!)
            setUserDetails(response1.data)
            const response2 = await getUserBoards(token!)
            if (response2 !== undefined) {
                setUserBoardsAssociation(response2.data)
            }
        }
        fetchUserDetailsAndBoards()
    }, [token])

    const handleCardClick = (elementId: number) => {
        setSelectedBoardId!(elementId)
        localStorage.setItem("my-board-id", elementId.toString())
        setSelectedBoardId!(elementId)
        localStorage.setItem("my-board-id", elementId.toString())
        navigate("/board")
    }

    const cardDisplay = (): ReactElement => {
        return (
            <Content className="content-width">
                <div className="homepage-card-container">
                    {userBoardsAssociation.map((element, index) => (
                        <Card title={element.boardName}
                            key={index}
                            bordered={true}
                            hoverable
                            className="card-style">
                            <div className="card-button">
                                <Button type="text" onClick={() => handleCardClick(element.boardId!)}><ArrowRightOutlined /></Button>
                            </div>
                        </Card>
                    )
                    )
                    }
                </div>
            </Content>
        )
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