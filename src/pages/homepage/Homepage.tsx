
import { Layout } from 'antd';
import HomepageHeader from '../../components/headers/homepage/HomepageHeader';
import HomepageSider from '../../components/siders/homepageSider/HomepageSider';
import HomepageContentAdmin from '../../components/content/homepage/HomepageContentAdmin';
import { useEffect, useState } from 'react';
import { getUserDetails } from '../../services/UserService';
import Cookies from 'js-cookie';
import { UserDetails } from '../../interfaces/model/UserDetails';
import HomepageContentUser from '../../components/content/homepage/HomepageContentUser';
import { IHomePage } from '../../interfaces/components/pages/IHomePage';
import "./Homepage.css"
import SpinnerPage from '../spinner/SpinnerPage';

const Homepage = ({ setSelectedBoardId, isSpinning }: IHomePage) => {

    const token = Cookies.get("jwt-token")
    const [userDetails, setUserDetails] = useState<UserDetails>()

    useEffect(() => {
        const fetchUserDetails = async () => {
            const response = await getUserDetails(token!)
            setUserDetails(response.data)
        }
        fetchUserDetails()
    }, [token, isSpinning])

    const getUserRole = () => {
        if (userDetails?.roles[0].name === "ROLE_ADMIN") {
            return <HomepageContentAdmin setSelectedBoardId={setSelectedBoardId}/>
        } else {
            return <HomepageContentUser setSelectedBoardId={setSelectedBoardId}/>
        }
    }

    if(isSpinning) {
        return (
            <SpinnerPage/>
        )
    } else {
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
}

export default Homepage;