import Sider from "antd/es/layout/Sider"
import HomepageMenu from "../../menus/homepage/HomepageMenu";
import { useState } from "react";
import "./HomepageSider.css"

const HomepageSider = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider className='sider-style' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <HomepageMenu />
        </Sider>
    )
}

export default HomepageSider