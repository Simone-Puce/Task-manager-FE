import { Layout } from "antd"
import HomepageContent from "../../components/content/homepage/HomepageContent"
import HomepageSider from "../../components/siders/homepageSider/HomepageSider"
import BoardpageHeader from "../../components/headers/boardpage/BoardpageHeader"
import "./BoardPage.css"

const BoardPage = () => {
    return (
        <Layout>
            <BoardpageHeader />
            <Layout>
                <HomepageSider />
                <HomepageContent />
            </Layout>
        </Layout>
    )
}

export default BoardPage