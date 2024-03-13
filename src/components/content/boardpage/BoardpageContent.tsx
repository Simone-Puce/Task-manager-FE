import { Board } from "../../../interfaces/model/Board"
import LaneComponent from "./LaneComponent"
import { Lane } from "../../../interfaces/model/Lane"
import "./BoardpageContent.css"

const BoardpageContent = (props: Board) => {
    const { boardId, boardName, lanes, tasks, users, createdBy, modifiedBy, createdDate, modifiedDate } = props

    return (
        <div className="task-content-style">
            {lanes?.map((lane: Lane) => (
                <LaneComponent laneStatus={lane.laneName} tasks={tasks}/>
        ))}
        </div>
    )
}

export default BoardpageContent