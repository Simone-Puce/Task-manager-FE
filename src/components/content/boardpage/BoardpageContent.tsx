import { Board } from "../../../interfaces/model/Board"
import LaneComponent from "./LaneComponent"
import { Lane } from "../../../interfaces/model/Lane"
import AssociateUserBoardForm from "../../forms/associateUserBoardForm/AssociateUserBoardForm"
import { Button, FloatButton, Modal, Select } from "antd"
import { DefaultOptionType } from "antd/es/select"
import { InfoCircleTwoTone } from '@ant-design/icons';
import "./BoardpageContent.css"
import { useState } from "react"
import BoardInfoModal from "../../modals/boardInfo/BoardInfoModal"

const BoardpageContent = (props: Board) => {
    const { boardId, boardName, lanes, users, createdBy, modifiedBy, createdDate, modifiedDate } = props
    const [isModalOpen, setIsModalOpen] = useState(false);
    const sortArrayByLaneId = () => {
        if (lanes) {
            lanes.sort((a, b) => a.laneId! - b.laneId!)
        }
    }

    const mappedLanes = () => {
        sortArrayByLaneId()
        return (
            lanes?.map((lane: Lane, index) => (
                <LaneComponent key={index} laneStatus={lane.laneName} />
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