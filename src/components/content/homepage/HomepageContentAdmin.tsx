import { Content } from "antd/es/layout/layout"
import { Button, Card } from "antd"
import { getUserDetails } from "../../../services/UserService"
import { ReactElement, useEffect, useState } from "react"
import { UserDetails } from "../../../interfaces/model/UserDetails"
import Cookies from "js-cookie"
import { deleteBoard, getAllBoards } from "../../../services/BoardService"
import { Board } from "../../../interfaces/model/Board"
import { useNavigate } from "react-router-dom"
import { IHomePage } from "../../../interfaces/components/pages/IHomePage"
import "./HomepageContentAdmin.css"
import { ArrowRightOutlined } from "@ant-design/icons"


const HomepageContentAdmin = ({ setSelectedBoardId, isSpinning, setIsSpinning }: IHomePage): ReactElement => {
    const [userDetails, setUserDetails] = useState<UserDetails>()
    const [boards, setBoards] = useState<Board[]>([])
    const token = Cookies.get("jwt-token")

    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserDetailsAndBoards = async () => {
            const response1 = await getUserDetails(token!)
            setUserDetails(response1.data)
            const response2 = await getAllBoards(token!)
            setBoards(response2.data)
        }
        fetchUserDetailsAndBoards()
    }, [token])

    const handleCardClick = (elementId: number) => {
        setSelectedBoardId!(elementId)
        localStorage.setItem("my-board-id", elementId.toString())
        navigate("/board")
    }

    const updateBoardHandler = () => {
        console.log("carlo")
    }

    const deleteBoardHandler = async (boardId: number) => {
        console.log(boardId)
        await deleteBoard(boardId, token!)
        const newBoards = boards.filter(board => board.boardId !== boardId)
        setBoards(newBoards)
    }

    return (
        <div className="homepage-style">
            <div className="header-content-container">
                <h1>{userDetails?.firstName} {userDetails?.lastName} these are your boards</h1>
            </div>
            <div className="homepage-content-style">
                <Content className="content-width">
                    <div className="homepage-card-container">
                        {boards.map((element, index) => (
                            <Card title={element.boardName}
                                key={index}
                                bordered={true}
                                hoverable
                                className="card-style">
                                <div className="card-button">
                                    <Button type="primary" onClick={updateBoardHandler}>Update</Button>
                                    <Button onClick={()=>deleteBoardHandler(element.boardId!)}>Delete</Button>
                                    <Button type="text" onClick={() => handleCardClick(element.boardId!)}><ArrowRightOutlined /></Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </Content>
            </div>
        </div>
    )
}

export default HomepageContentAdmin
