import { Layout } from "antd"
import HomepageSider from "../../components/siders/homepageSider/HomepageSider"
import BoardpageHeader from "../../components/headers/boardpage/BoardpageHeader"
import BoardpageContent from "../../components/content/boardpage/BoardpageContent"
import "./BoardPage.css"

const BoardPage = () => {
    return (
        <Layout>
            <BoardpageHeader />
            <Layout>
                <HomepageSider />
                <BoardpageContent />
            </Layout>
        </Layout>
    )
}

export default BoardPage