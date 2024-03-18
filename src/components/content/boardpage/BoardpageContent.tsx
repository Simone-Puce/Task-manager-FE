import { Board } from "../../../interfaces/model/Board"
import LaneComponent from "./LaneComponent"
import { Lane } from "../../../interfaces/model/Lane"
import AssociateUserBoardForm from "../../forms/associateUserBoardForm/AssociateUserBoardForm"
import { Select } from "antd"
import { DefaultOptionType } from "antd/es/select"
import "./BoardpageContent.css"

const BoardpageContent = (props: Board) => {
    const { boardId, boardName, lanes, tasks, users, createdBy, modifiedBy, createdDate, modifiedDate } = props

    const sortArrayByLaneId = () => {
        if (lanes) {
            lanes.sort((a, b) => a.laneId - b.laneId)
        }
    }

    const mappedLanes = () => {
        sortArrayByLaneId()
        return (
            lanes?.map((lane: Lane, index) => (
                <LaneComponent key={index} laneStatus={lane.laneName} tasks={tasks} />
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

    return (
        <div className="task-content-container">
            <div className="serch-field">
                <AssociateUserBoardForm />
            </div>
            <div className="audit-userlist-container">
                <div>
                    Last update of the board from {modifiedBy} in date {modifiedDate?.toString()}
                </div>
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
            </div>
        </div>

    )
}

export default BoardpageContent