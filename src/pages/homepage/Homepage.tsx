
import { Layout } from 'antd';
import HomepageHeader from '../../components/headers/homepage/HomepageHeader';
import HomepageSider from '../../components/siders/homepageSider/HomepageSider';
import HomepageContent from '../../components/content/homepage/HomepageContent';
import "./Homepage.css"

const Homepage = () => {
    return (
        <Layout>
            <HomepageHeader />
            <Layout>
                <HomepageSider />
                <HomepageContent />
            </Layout>
        </Layout>
    )
}

export default Homepage;