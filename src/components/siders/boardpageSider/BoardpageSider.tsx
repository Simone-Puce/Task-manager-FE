import Sider from "antd/es/layout/Sider"
import BoardpageMenu from "../../menus/boardpage/BoardpageMenu";
import { useState } from "react";
import "./BoardpageSider.css"
import { IBoardPage } from "../../../interfaces/components/pages/IBoardPage";

const BoardpageSider = ({selectedBoardId, setSelectedBoardId}: IBoardPage) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <BoardpageMenu setSelectedBoardId={setSelectedBoardId} selectedBoardId={selectedBoardId}/>
        </Sider>
    )
}

export default BoardpageSider