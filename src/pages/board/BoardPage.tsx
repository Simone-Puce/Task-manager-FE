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

const BoardPage = ({selectedBoardId, setSelectedBoardId} : IBoardPage) => {
    const [board, setBoard] = useState<Board>()
    const [isBoardSpinning, setIsBoardSpinning] = useState<boolean>(false)
    const token = Cookies.get("jwt-token")

    useEffect(()=>{
        const fetchBoard = async () => {
            const response = await getBoardById(selectedBoardId!,token!)
            setBoard(response.data)
        } 
        fetchBoard()
    },[token, setSelectedBoardId, selectedBoardId])

    const renderBoardPageContent = () => (
        <BoardpageContent
            board={board!}
            isBoardSpinning={isBoardSpinning}
        />
    )

    return (
        <Layout>
            <BoardpageHeader {...board} />
            <Layout>
                <BoardpageSider setSelectedBoardId={setSelectedBoardId} selectedBoardId={selectedBoardId} setIsBoardSpinning={setIsBoardSpinning}/>
                {board && renderBoardPageContent()}
            </Layout>
        </Layout>
    )
}
export default BoardPage