import { Board } from "../../../interfaces/model/Board"
import LaneComponent from "./LaneComponent"
import { Lane } from "../../../interfaces/model/Lane"
import AssociateUserBoardForm from "../../forms/associateUserBoardForm/AssociateUserBoardForm"
import { FloatButton } from "antd"
import { InfoCircleTwoTone } from '@ant-design/icons';
import { useEffect, useState } from "react"
import { getUserDetails } from "../../../services/UserService"
import Cookies from "js-cookie"
import { UserInBoard } from "../../../interfaces/model/UserInBoard"
import BoardInfoModal from "../../modals/boardInfo/BoardInfoModal"
import { Content } from "antd/es/layout/layout"
import "./BoardpageContent.css"

const BoardpageContent = (props: Board) => {
    const token = Cookies.get("jwt-token")
    const { boardId, boardName, lanes, users, createdBy, modifiedBy, createdDate, modifiedDate } = props
    const [isEditor, setIsEditor] = useState<boolean>()
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const checkIfUserIsEditor = async () => {
            const response = await getUserDetails(token!)
            users?.map((user: UserInBoard) => {
                if (user.email === response.data.email && user.roleCodeForBoard === "EDITOR") {
                    setIsEditor(true)
                }
            })
            if(response.data.roles[0].name === "ROLE_ADMIN") {
                setIsEditor(true)
            }
        }
        checkIfUserIsEditor()
    })

    const mappedLanes = () => {
        return (
            lanes?.map((lane: Lane, index) => (
                <LaneComponent key={index} {...lane} isEditor={isEditor} boardId={boardId}/>
            )))
    }

    const showModal = () => {
        setIsModalOpen(true);
    }

    const handleOk = () => {
        setIsModalOpen(false);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    return (
        <Content>
            <div className="task-content-container">
                <BoardInfoModal
                    handleOk={handleOk}
                    isModalOpen={isModalOpen}
                    handleCancel={handleCancel}
                    modifiedBy={modifiedBy}
                    modifiedDate={modifiedDate}
                    boardName={boardName}
                />
                <div className="serch-field">
                    <AssociateUserBoardForm {...props} isEditor={isEditor}/>
                </div>
                <div className="task-content-style">
                    {mappedLanes()}
                    <FloatButton
                        icon={<InfoCircleTwoTone />}
                        type="primary"
                        style={{ right: 50 }}
                        onClick={showModal}
                    />
                </div>
            </div>
        </Content>

    )
}

export default BoardpageContent