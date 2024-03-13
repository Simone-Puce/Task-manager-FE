import { Layout } from "antd"
import BoardpageHeader from "../../components/headers/boardpage/BoardpageHeader"
import BoardpageContent from "../../components/content/boardpage/BoardpageContent"
import BoardpageSider from "../../components/siders/boardpageSider/BoardpageSider"
import { IBoardPage } from "../../interfaces/components/pages/IBoardPage"
import { useEffect, useState } from "react"
import { Board } from "../../interfaces/model/Board"
import "./BoardPage.css"
import { getBoardById } from "../../services/BoardService"
import Cookies from "js-cookie"

const BoardPage = ({selectedBoardId} : IBoardPage) => {
    const [board, setBoard] = useState<Board>()
    const token = Cookies.get("jwt-token")

    useEffect(()=>{
        const fetchBoard = async () => {
            const response = await getBoardById(selectedBoardId!,token!)
            console.log(response.data)
            setBoard(response.data)
        } 
        fetchBoard()
    },[selectedBoardId, token])

    return (
        <Layout>
            <BoardpageHeader />
            <Layout>
                <BoardpageSider />
                <BoardpageContent {...board}/>
            </Layout>
        </Layout>
    )
}

export default BoardPage