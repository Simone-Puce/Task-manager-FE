import { ReactElement, useState } from "react"
import { Task } from "../../../interfaces/model/Task"
import { Card } from "antd"
import CreateTaskModal from "../../modals/task/createTask/CreateTaskModal"
import { ILaneComponent } from "../../../interfaces/components/contents/ILaneComponent"
import TaskDetailsModal from "../../modals/task/taskModal/TaskDetailsModal"
import CreateTaskButton from "../../button/CreateTaskButton"
import SpinnerPage from "../../../pages/spinner/SpinnerPage"
import "./BoardpageContent.css"

const LaneComponent = (props: ILaneComponent): ReactElement => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false)
    const [selectedTaskId, setSelectedTaskId] = useState<number>()

    const showModal = () => {
        setIsModalOpen(true);
    }

    const handleCancel = () => {
        setIsModalOpen(false)
        setIsTaskModalOpen(false)
    }

    const showTaskModal = (taskId: number) => {
        setSelectedTaskId(taskId)
        setIsTaskModalOpen(true);
    }

    const taskMapper = () => {
        return (
            props.tasks!.map((task: Task) => (
                <Card title={task.taskName}
                    key={task.taskId}
                    bordered={true}
                    hoverable
                    onClick={() => showTaskModal(task.taskId!)}
                    className="card-style">
                    Task card
                </Card>
            ))
        )
    }

    if (!isModalOpen && !isTaskModalOpen) {
        return (
            <div className="general-task-div">
                <h1> {props.laneName} </h1>
                <div className="button-div">
                    <CreateTaskButton showModal={showModal} />
                </div>
                <CreateTaskModal
                    reset={props.reset}
                    showModal={showModal}
                    isModalOpen={isModalOpen}
                    handleCancel={handleCancel}
                    selectedLane={props.laneId}
                />
                <TaskDetailsModal
                    showTaskModal={showTaskModal}
                    isTaskModalOpen={isTaskModalOpen}
                    handleCancel={handleCancel}
                    selectedTaskId={selectedTaskId}
                    boardId={props.boardId!}
                    laneId={props.laneId!}
                    laneName={props.laneName!}
                    reset={props.reset}
                />
               {taskMapper()}
            </div>
        )
    } else {
        return (
            <div className="general-task-div">
                <h1> {props.laneName} </h1>
                <CreateTaskModal
                    reset={props.reset}
                    showModal={showModal}
                    isModalOpen={isModalOpen}
                    handleCancel={handleCancel}
                    selectedLane={props.laneId}
                />
                <TaskDetailsModal
                    showTaskModal={showTaskModal}
                    isTaskModalOpen={isTaskModalOpen}
                    handleCancel={handleCancel}
                    selectedTaskId={selectedTaskId}
                    boardId={props.boardId!}
                    laneId={props.laneId!}
                    laneName={props.laneName!}
                    reset={props.reset}
                />
                <SpinnerPage />
            </div>
        )

    }

}

export default LaneComponent