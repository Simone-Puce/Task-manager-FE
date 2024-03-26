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
import { getBoardById } from "../../../services/BoardService"
import "./BoardpageContent.css"

const BoardpageContent = (props: Board) => {
    const token = Cookies.get("jwt-token")
    const { boardId, boardName, lanes, users, createdBy, modifiedBy, createdDate, modifiedDate } = props
    const [isEditor, setIsEditor] = useState<boolean>()
    const [newBoard, setNewBoard] = useState<Board>()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [seed, setSeed] = useState(1)

    const reset = () => {
        setSeed(Math.random())
    }

    useEffect(() => {
        const fetchNewLanes = async () => {
            if(boardId !== undefined){
                const response = await getBoardById(boardId!, token!)
                setNewBoard(response.data)
            }
        }
        fetchNewLanes()
    }, [boardId, token, seed, lanes])

    useEffect(() => {
        const checkIfUserIsEditor = async () => {
            const response = await getUserDetails(token!)
            users?.forEach((user: UserInBoard) => {
                if (user.email === response.data.email && user.roleCodeForBoard === "EDITOR") {
                    setIsEditor(true)
                }
            })
            if (response.data.roles[0].name === "ROLE_ADMIN") {
                setIsEditor(true)
            }
        }
        checkIfUserIsEditor()
    }, [token, users])

    const mappedLanes = () => {
        return (
            newBoard?.lanes?.map((lane: Lane, index) => (
                <LaneComponent key={index} {...lane} isEditor={isEditor} boardId={boardId} reset={reset} />
            )))
    }

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const searchField = () => {
        if(isEditor)
        return (
            <div className="serch-field">
                    <AssociateUserBoardForm {...props} isEditor={isEditor} />
                </div>
        )
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
                {searchField()}
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