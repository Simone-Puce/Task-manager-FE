
import { Layout } from 'antd';
import HomepageHeader from '../../components/headers/homepage/HomepageHeader';
import HomepageSider from '../../components/siders/homepageSider/HomepageSider';
import "./Homepage.css"
import HomepageContent from '../../components/content/homepage/HomepageContent';
import { Footer } from 'antd/es/layout/layout';

const Homepage = () => {
    return (
        <Layout>
            <HomepageHeader />
            <Layout>
                <HomepageSider />
                <HomepageContent />
            </Layout>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>




            
        </Layout>
    )
}

export default Homepage;