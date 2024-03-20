import Sider from "antd/es/layout/Sider"
import HomepageMenu from "../../menus/homepage/HomepageMenu";
import { useState } from "react";
import { IHomePage } from "../../../interfaces/components/pages/IHomePage";
import "./HomepageSider.css"

const HomepageSider = ({setIsSpinning} : IHomePage) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider className='sider-style' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <HomepageMenu setIsSpinning={setIsSpinning}/>
        </Sider>
    )
}

export default HomepageSider