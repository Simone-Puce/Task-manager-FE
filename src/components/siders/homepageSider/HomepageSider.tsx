import Sider from "antd/es/layout/Sider"
import "./HomepageSider.css"
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { UserDetails } from "../../../interfaces/model/UserDetails";
import { getUserDetails } from "../../../services/UserService";
import HomepageMenuAdmin from "../../menus/homepage/HomepageMenuAdmin";
import HomepageMenuUser from "../../menus/homepage/HomepageMenuUser";

const HomepageSider = () => {

    const [collapsed, setCollapsed] = useState(false);
    const token = Cookies.get("jwt-token")
    const [userDetails, setUserDetails] = useState<UserDetails>()
   
    useEffect(() => {
        const fetchUserDetails = async () => {
            const response = await getUserDetails(token!)
            setUserDetails(response.data)
        }
        fetchUserDetails()
    }, [token])

const getUserRole = () =>{
    if(userDetails?.roles[0].name === "ROLE_ADMIN"){
        return <HomepageMenuAdmin/>
    } else {
        return <HomepageMenuUser/>
    }
}


    return (
        <Sider className='sider-style' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            {getUserRole()}
        </Sider>
    )
}

export default HomepageSider