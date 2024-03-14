import Sider from "antd/es/layout/Sider"
import BoardpageMenu from "../../menus/boardpage/BoardpageMenu";
import { useState } from "react";
import "./BoardpageSider.css"
import { IBoardPage } from "../../../interfaces/components/pages/IBoardPage";


const BoardpageSider = ({setSelectedBoardId} : IBoardPage) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider className='sider-style' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <BoardpageMenu setSelectedBoardId={setSelectedBoardId} />
        </Sider>
    )
}

export default BoardpageSider