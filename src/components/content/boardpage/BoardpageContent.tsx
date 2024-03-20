import { Board } from "../../../interfaces/model/Board"
import LaneComponent from "./LaneComponent"
import { Lane } from "../../../interfaces/model/Lane"
import AssociateUserBoardForm from "../../forms/associateUserBoardForm/AssociateUserBoardForm"
import { FloatButton, Select } from "antd"
import { DefaultOptionType } from "antd/es/select"
import { InfoCircleTwoTone } from '@ant-design/icons';
import "./BoardpageContent.css"
import { Content } from "antd/es/layout/layout"
import { useEffect, useState } from "react"
import { getUserDetails } from "../../../services/UserService"
import Cookies from "js-cookie"
import { UserInBoard } from "../../../interfaces/model/UserInBoard"
import BoardInfoModal from "../../modals/boardInfo/BoardInfoModal"

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
        }
        checkIfUserIsEditor()
    })

    const mappedLanes = () => {
        return (
            lanes?.map((lane: Lane, index) => (
                <LaneComponent key={index} {...lane} isEditor={isEditor} boardId={boardId}/>
            )))
    }

    const optionsHandler = (): DefaultOptionType[] => {
        const option: any[] = [{}]
        users?.map((user: any) => {
            option.push({
                value: user.email,
                label: user.email
            })
        })
        return option
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
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
                <AssociateUserBoardForm />
            </div>
            <div className="audit-userlist-container">
                <div>
                    <Select
                        showSearch
                        placeholder="User connected to the board"
                        allowClear
                        className="select-style"
                        options={optionsHandler()}>
                    </Select>
                </div>
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


    )
}

export default BoardpageContent