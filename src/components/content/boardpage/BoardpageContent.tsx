import { Board } from "../../../interfaces/model/Board"
import LaneComponent from "./LaneComponent"
import { Lane } from "../../../interfaces/model/Lane"
import "./BoardpageContent.css"                 
import { Button, Form, Select } from "antd"
import AssociateUserBoardForm from "../../forms/associateUserBoardForm/AssociateUserBoardForm"

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

    const testfn = () => {
        console.log("carlo")
    }

    return (
        <div className="task-content-container">
            <div className="serch-field">
                <AssociateUserBoardForm />
            </div>
            <div className="task-content-style">
                {mappedLanes()}
            </div>
        </div>

    )
}

export default BoardpageContent