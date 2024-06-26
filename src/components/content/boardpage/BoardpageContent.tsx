import { Board } from "../../../interfaces/model/Board"
import LaneComponent from "./LaneComponent"
import { Lane } from "../../../interfaces/model/Lane"
import AssociateUserBoardForm from "../../forms/associateUserBoardForm/AssociateUserBoardForm"
import { ConfigProvider, FloatButton } from "antd"
import { InfoCircleOutlined } from '@ant-design/icons';
import { getBoardById } from "../../../services/BoardService"
import { IBoardPageContent } from "../../../interfaces/components/contents/IBoardpageContent"
import SpinnerPage from "../../../pages/spinner/SpinnerPage"
import { useEffect, useState } from "react"
import { getUserDetails } from "../../../services/UserService"
import Cookies from "js-cookie"
import { UserInBoard } from "../../../interfaces/model/UserInBoard"
import BoardInfoModal from "../../modals/boardInfo/BoardInfoModal"
import { Content } from "antd/es/layout/layout"
import "./BoardpageContent.css"

const BoardpageContent = ({ board, isBoardSpinning, reset, seed }: IBoardPageContent) => {
    const token = Cookies.get("jwt-token")
    const { boardId, boardName, lanes, users, modifiedBy, modifiedDate } = board
    const [isEditor, setIsEditor] = useState<boolean>()
    const [newBoard, setNewBoard] = useState<Board>()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const refresh = () => {
        window.location.reload()
    }

    useEffect(() => {
        const fetchNewLanes = async () => {
            if (boardId !== undefined) {
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
                } else if (user.email === response.data.email && user.roleCodeForBoard === "USER") {
                    setIsEditor(false)
                }
            })
            if (response.data.roles[0].name === "ROLE_ADMIN") {
                setIsEditor(true)
            }
        }
        checkIfUserIsEditor()
    }, [token, users, seed])


    const mappedLanes = () => {
        return (
            newBoard?.lanes?.map((lane: Lane, index) => (
                <LaneComponent
                    key={index}
                    {...lane}
                    isEditor={isEditor}
                    boardId={boardId}
                    reset={reset}
                    refresh={refresh} />
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
        if (isEditor)
            return (
                <div className="serch-field">
                    <AssociateUserBoardForm {...board} isEditor={isEditor} />
                </div>
            )

    }

    const customTheme = {
        token: {
            colorPrimary: '#B10135',
        },
    }

    if (!isBoardSpinning) {
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
                        <ConfigProvider theme={customTheme}>
                            <FloatButton
                                icon={<InfoCircleOutlined />}
                                description="Info"
                                shape="square"
                                type="primary"
                                style={{ right: 50 }}
                                onClick={showModal}
                            />
                        </ConfigProvider>
                    </div>
                </div>
            </Content>
        )
    } else {
        return (
            <Content>
                <div className="spinner-holder-content">
                    <SpinnerPage />
                </div>
            </Content>
        )
    }
}

export default BoardpageContent