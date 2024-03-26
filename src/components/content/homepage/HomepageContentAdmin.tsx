import { Content } from "antd/es/layout/layout"
import { Button, Card, Input } from "antd"
import { ReactElement, useEffect, useState } from "react"
import Cookies from "js-cookie"
import { deleteBoard, getAllBoards } from "../../../services/BoardService"
import { Board } from "../../../interfaces/model/Board"
import { useNavigate } from "react-router-dom"
import { IHomePage } from "../../../interfaces/components/pages/IHomePage"
import { ArrowRightOutlined } from "@ant-design/icons"
import CreateUpdateBoardModal from "../../modals/createBoard/CreateUpdateBoardModal"
import "./HomepageContentAdmin.css"
import SpinnerPage from "../../../pages/spinner/SpinnerPage"

const HomepageContentAdmin = ({ setSelectedBoardId, isSpinning }: IHomePage): ReactElement => {
    const [inputValue, setInputValue] = useState('')
    const [boards, setBoards] = useState<Board[]>([])
    const [displayedBoards, setDisplayedBoards] = useState<Board[]>([])
    const [updateBoardId, setUpdateBoardId] = useState<number>()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [seed, setSeed] = useState(1)
    const token = Cookies.get("jwt-token")
    const navigate = useNavigate()

    const reset = () => {
        setSeed(Math.random())
    }

    useEffect(() => {
        const fetchUserDetailsAndBoards = async () => {
            const response2 = await getAllBoards(token!)
            setBoards(response2.data)
            setDisplayedBoards(response2.data)
        }
        fetchUserDetailsAndBoards()
    }, [token, isModalOpen, seed, isSpinning])

    const handleCardClick = (elementId: number) => {
        setSelectedBoardId!(elementId)
        localStorage.setItem("my-board-id", elementId.toString())
        navigate("/board")
    }

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const updateBoardHandler = async (boardId: number) => {
        setIsModalOpen(true)
        setUpdateBoardId(boardId)
    }

    const deleteBoardHandler = async (boardId: number) => {
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
        const searchFilterString: string = event.target.value
        const newBoards = boards.filter((board: Board) =>
            board.boardName?.toLocaleLowerCase().includes(searchFilterString.toLocaleLowerCase().trim())
        )
        setDisplayedBoards(newBoards)
        setInputValue(event.target.value)
    }

    const mainContentHandler = () => {
        return (
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
        )
    }

    if (!isModalOpen && !isSpinning) {
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
                    reset={reset}
                />
                <div className="homepage-content-style">
                    {mainContentHandler()}
                </div>
            </div>
        )
    } else {
        return (
            <div className="homepage-style">
                <div className="header-content-container">
                    <h1>These are all the boards </h1>
                </div>
                <CreateUpdateBoardModal
                    reset={reset}
                    showModal={showModal}
                    isModalOpen={isModalOpen}
                    handleCancel={handleCancel}
                    isCreating={false}
                    boardId={updateBoardId}
                />
                <SpinnerPage />
            </div>
        )
    }

}

export default HomepageContentAdmin
