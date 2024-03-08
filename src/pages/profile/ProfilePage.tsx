import { Button, Card, Layout } from "antd"
import "./ProfilePage.css"
import ProfilepageHeader from "../../components/headers/profilepage/ProfilepageHeader"
import ProfilepageContent from "../../components/content/profilepage/ProfilepageContent"

const ProfilePage = () => {


    return (
        <Layout>
            <ProfilepageHeader/>
            <Layout>
               <ProfilepageContent/>
            </Layout>
        </Layout>
    )
}

export default ProfilePage