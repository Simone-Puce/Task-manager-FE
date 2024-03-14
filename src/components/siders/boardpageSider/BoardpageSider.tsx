import Sider from "antd/es/layout/Sider"
import BoardpageMenu from "../../menus/boardpage/BoardpageMenu";
import { useState } from "react";
import "./BoardpageSider.css"


const BoardpageSider = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider className='sider-style' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <BoardpageMenu/>
        </Sider>
    )
}

export default BoardpageSider