import { Layout } from "antd"
import BoardpageHeader from "../../components/headers/boardpage/BoardpageHeader"
import BoardpageContent from "../../components/content/boardpage/BoardpageContent"
import BoardpageSider from "../../components/siders/boardpageSider/BoardpageSider"
import { IBoardPage } from "../../interfaces/components/pages/IBoardPage"
import { useEffect, useState } from "react"
import { Board } from "../../interfaces/model/Board"
import { getBoardById } from "../../services/BoardService"
import Cookies from "js-cookie"
import "./BoardPage.css"

const BoardPage = ({ selectedBoardId, setSelectedBoardId, isSpinning }: IBoardPage) => {
    const [board, setBoard] = useState<Board>()
    const token = Cookies.get("jwt-token")
    const [seed, setSeed] = useState(1)

    const reset = () => {
        setSeed(Math.random())
    }

    useEffect(() => {
        const fetchBoard = async () => {
            if (selectedBoardId === undefined) {
                const localStorageId = localStorage.getItem("my-board-id")
                const response = await getBoardById(parseInt(localStorageId!), token!)
                setBoard(response.data)
            } else {
                const response = await getBoardById(selectedBoardId!, token!)
                setBoard(response.data)
            }
        }
        fetchBoard()
    }, [token, setSelectedBoardId, selectedBoardId, seed])

    const renderBoardPageContent = () => (
        <BoardpageContent
            reset={reset}
            seed={seed}
            board={board!}
            isBoardSpinning={isSpinning!}
        />
    )

    return (
        <Layout>
            <BoardpageHeader {...board} />
            <Layout>
                <BoardpageSider
                    setSelectedBoardId={setSelectedBoardId}
                    selectedBoardId={selectedBoardId}
                    reset={reset}
                    seed={seed}
                />
                {board && renderBoardPageContent()}
            </Layout>
        </Layout>
    )
}
export default BoardPage