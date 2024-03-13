
import { Layout } from 'antd';
import HomepageHeader from '../../components/headers/homepage/HomepageHeader';
import HomepageSider from '../../components/siders/homepageSider/HomepageSider';
import HomepageContentAdmin from '../../components/content/homepage/HomepageContentAdmin';
import "./Homepage.css"
import { useEffect, useState } from 'react';
import { getUserDetails } from '../../services/UserService';
import Cookies from 'js-cookie';
import { UserDetails } from '../../interfaces/model/UserDetails';
import HomepageContentUser from '../../components/content/homepage/HomepageContentUser';
import { IHomePage } from '../../interfaces/components/pages/IHomePage';

const Homepage = ({ setSelectedBoardId }: IHomePage) => {

    const token = Cookies.get("jwt-token")
    const [userDetails, setUserDetails] = useState<UserDetails>()

    useEffect(() => {
        const fetchUserDetails = async () => {
            const response = await getUserDetails(token!)
            setUserDetails(response.data)
        }
        fetchUserDetails()
    }, [token])

    const getUserRole = () => {
        if (userDetails?.roles[0].name === "ROLE_ADMIN") {
            return <HomepageContentAdmin />
        } else {
            return <HomepageContentUser setSelectedBoardId={setSelectedBoardId}/>
        }
    }

    return (
        <Layout>
            <HomepageHeader />
            <Layout>
                <HomepageSider />
                {getUserRole()}
            </Layout>
        </Layout>
    )
}

export default Homepage;