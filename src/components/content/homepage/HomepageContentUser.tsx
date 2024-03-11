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

const HomepageContentAdmin = (): ReactElement => {
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

    const latestUpdateHandler = (singleBoardData: Board) => {
        console.log(singleBoardData.createdDate)
        console.log(singleBoardData.modifiedDate)
        if (singleBoardData.createdDate === singleBoardData.modifiedDate) {
            return (
                <p>{"Board has been created by " + singleBoardData.createdBy + " on the " + singleBoardData.createdDate}</p>
            )
        } else {
            return (
                <p>{"Board has been updated by " + singleBoardData.modifiedBy + " on the " + singleBoardData.modifiedDate}</p>
            )
        }

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
                                onClick={() => navigate("/board")}
                                className="card-style">
                                <p>{element.boardCode}</p>
                                <p> {latestUpdateHandler(element)}</p>
                                <Button>update</Button>
                                <Button>delete</Button>
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
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="https://media.licdn.com/dms/image/D4D03AQEc4-a6nd_J0g/profile-displayphoto-shrink_800_800/0/1694878219965?e=1714608000&v=beta&t=qlXttAt6t97RsLr9I7LJKv1VHcMZdbvBNYHClsvKFG0" />}
                >
                </Card>
                {cardDisplay()}
            </div>
        </div>
    )
}

export default HomepageContentAdmin
