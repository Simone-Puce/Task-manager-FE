import { Layout } from "antd"
import BoardpageHeader from "../../components/headers/boardpage/BoardpageHeader"
import BoardpageContent from "../../components/content/boardpage/BoardpageContent"
import BoardpageSider from "../../components/siders/boardpageSider/BoardpageSider"
import "./BoardPage.css"
const BoardPage = () => {
    return (
        <Layout>
            <BoardpageHeader />
            <Layout>
                <BoardpageSider />
                <BoardpageContent />
            </Layout>
        </Layout>
    )
}

export default BoardPage