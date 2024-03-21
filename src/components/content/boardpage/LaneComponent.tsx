import { ReactElement, useEffect, useState } from "react"
import { Task } from "../../../interfaces/model/Task"
import { Card } from "antd"
import CreateTaskModal from "../../modals/createTask/CreateTaskModal"
import { ILaneComponent } from "../../../interfaces/components/contents/ILaneComponent"
import "./BoardpageContent.css"
import CreateTaskButton from "../../button/CreateTaskButton"

const LaneComponent = (props: ILaneComponent): ReactElement => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const showModal = () => {
        setIsModalOpen(true);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    return (
        <div className="general-task-div">
            <h1> {props.laneName} </h1>
            <div className="button-div">
                <CreateTaskButton showModal={showModal}/>
            </div>
            <CreateTaskModal
                showModal={showModal}
                isModalOpen={isModalOpen}
                handleCancel={handleCancel}
                selectedLane={props.laneId}
            />
            {props.tasks!.map((task: Task) => (
                <Card title={task.taskName}
                    key={task.taskId}
                    bordered={true}
                    hoverable
                    onClick={() => console.log("error")}
                    className="card-style">
                    Task card
                </Card>
            ))}
        </div>
    )
}

export default LaneComponent