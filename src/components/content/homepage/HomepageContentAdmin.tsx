import { Content } from "antd/es/layout/layout"
import { Button, Card, Input, Select } from "antd"
import { ReactElement, useEffect, useState } from "react"
import Cookies from "js-cookie"
import { deleteBoard, getAllBoards } from "../../../services/BoardService"
import { Board } from "../../../interfaces/model/Board"
import { useNavigate } from "react-router-dom"
import { IHomePage } from "../../../interfaces/components/pages/IHomePage"
import { ArrowRightOutlined } from "@ant-design/icons"
import CreateUpdateBoardModal from "../../modals/createBoard/CreateUpdateBoardModal"
import "./HomepageContentAdmin.css"

const HomepageContentAdmin = ({ setSelectedBoardId }: IHomePage): ReactElement => {
    const [inputValue, setInputValue] = useState('')
    const [boards, setBoards] = useState<Board[]>([])
    const [displayedBoards, setDisplayedBoards] = useState<Board[]>([])
    const [updateBoardId, setUpdateBoardId] = useState<number>()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const token = Cookies.get("jwt-token")
    const navigate = useNavigate()
 
    useEffect(() => {
        const fetchUserDetailsAndBoards = async () => {
            const response2 = await getAllBoards(token!)
            setBoards(response2.data)
            setDisplayedBoards(response2.data)
        }
        fetchUserDetailsAndBoards()
    }, [token])
 
    const handleCardClick = (elementId: number) => {
        setSelectedBoardId!(elementId)
        localStorage.setItem("my-board-id", elementId.toString())
        navigate("/board")
    }

    const showModal = () => {
        setIsModalOpen(true);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const updateBoardHandler = async (boardId: number) => {
        setIsModalOpen(true)
        setUpdateBoardId(boardId)

    }

    const deleteBoardHandler = async (boardId: number) => {
        console.log(boardId)
        await deleteBoard(boardId, token!)
        const newBoards = boards.filter(board => board.boardId !== boardId)
        setBoards(newBoards)
        setDisplayedBoards(newBoards)
    }

    const boardmap = () => {
        return (
            displayedBoards.map((element, index) => (
                <Card title={element.boardName}
                    key={index}
                    bordered={true}
                    hoverable
                    className="card-style">
                    <div className="card-button">
                        <Button type="primary" onClick={() => updateBoardHandler(element.boardId!)}>Update</Button>
                        <Button onClick={() => deleteBoardHandler(element.boardId!)}>Delete</Button>
                        <Button type="text" onClick={() => handleCardClick(element.boardId!)}><ArrowRightOutlined /></Button>
                    </div>
                </Card>
            ))
        )
    }

    const filterBoards = (event: any) => {
        const newBoards = boards.filter((board: Board) => board.boardName?.includes(event.target.value))
        setDisplayedBoards(newBoards)
        setInputValue(event.target.value)
    }
 
    return (
        <div className="homepage-style">
            <div className="header-content-container">
                <h1>These are all the boards </h1>
            </div>
            <CreateUpdateBoardModal
                showModal={showModal}
                isModalOpen={isModalOpen}
                handleCancel={handleCancel}
                isCreating={false}
                boardId={updateBoardId}
            />
            <div className="homepage-content-style">
                <Content className="content-width">
                    <div className="filter-board-div">
                        <Input
                            className="input-filter"
                            placeholder="Filter the boards"
                            onChange={filterBoards}
                            value={inputValue}
                        />
                    </div>
                    <div className="homepage-card-container">
                        {boardmap()}
                    </div>
                </Content>
            </div>
        </div>
    )
}
 
export default HomepageContentAdmin
 