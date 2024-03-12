import Sider from "antd/es/layout/Sider"
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { UserDetails } from "../../../interfaces/model/UserDetails";
import { getUserDetails } from "../../../services/UserService";
import HomepageMenu from "../../menus/homepage/Admin/HomepageMenu";
import "./HomepageSider.css"
import CreateBoardModal from "../../modals/createBoard/CreateBoardModal";


const HomepageSider = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider className='sider-style' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <HomepageMenu/>
        </Sider>
    )
}

export default HomepageSider