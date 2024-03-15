import { Board } from "../../../interfaces/model/Board"
import LaneComponent from "./LaneComponent"
import { Lane } from "../../../interfaces/model/Lane"
import AssociateUserBoardForm from "../../forms/associateUserBoardForm/AssociateUserBoardForm"
import { useState } from "react"
import "./BoardpageContent.css"  

const BoardpageContent = (props: Board) => {
    const { boardId, boardName, lanes, tasks, users, createdBy, modifiedBy, createdDate, modifiedDate } = props
    const [loading, setLoading] = useState(true);

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