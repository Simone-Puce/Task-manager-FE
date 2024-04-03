import Sider from "antd/es/layout/Sider"
import BoardpageMenu from "../../menus/boardpage/BoardpageMenu";
import { useState } from "react";
import { IBoardPage } from "../../../interfaces/components/pages/IBoardPage";
import "./BoardpageSider.css"

const BoardpageSider = ({ selectedBoardId, setSelectedBoardId, reset, seed}: IBoardPage) => {
    const [collapsed, setCollapsed] = useState<boolean>(false)

    return (
        <Sider collapsible={true} collapsed={collapsed} onCollapse={(value: any) => setCollapsed(value)} className="sider-style">
            <BoardpageMenu
                setSelectedBoardId={setSelectedBoardId}
                selectedBoardId={selectedBoardId}
                reset={reset}
                seed={seed}
            />
        </Sider>
    )
}

export default BoardpageSider