import Sider from "antd/es/layout/Sider"
import BoardpageMenu from "../../menus/boardpage/BoardpageMenu";
import { useState } from "react";
import "./BoardpageSider.css"
import { IBoardPage } from "../../../interfaces/components/pages/IBoardPage";

const BoardpageSider = ({selectedBoardId}: IBoardPage) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider className='sider-style' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <BoardpageMenu selectedBoardId={selectedBoardId}/>
        </Sider>
    )
}

export default BoardpageSider