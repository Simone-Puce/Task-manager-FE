import { ReactElement, useState } from "react"
import { Task } from "../../../interfaces/model/Task"
import { Card } from "antd"
import CreateTaskModal from "../../modals/task/createTask/CreateTaskModal"
import { ILaneComponent } from "../../../interfaces/components/contents/ILaneComponent"
import TaskDetailsModal from "../../modals/task/taskModal/TaskDetailsModal"
import CreateTaskButton from "../../button/CreateTaskButton"
import SpinnerPage from "../../../pages/spinner/SpinnerPage"
import { getUserDetails } from "../../../services/UserService"
import Cookies from "js-cookie"
import { deleteTask } from "../../../services/TaskService"
import "./BoardpageContent.css"

const LaneComponent = (props: ILaneComponent): ReactElement => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false)
    const [selectedTaskId, setSelectedTaskId] = useState<number>()
    const [tasksNewMapping, setTasksNewMapping] = useState<Task[]>()
    const token: string = Cookies.get("jwt-token")!

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
        setIsTaskModalOpen(false)
    }

    const showTaskModal = async (taskId: number) => {
        const response = await getUserDetails(token!)
        const userRole = response.data.roles[0].name
        if (userRole === "ROLE_USER") {
            setSelectedTaskId(taskId)
            setIsTaskModalOpen(true)
        }
    }

    const taskMapper = () => {
        if (tasksNewMapping === undefined) {
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
        } else {
            return (
                tasksNewMapping.map((task: Task) => (
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
    }

    const deleteTaskHandler = async () => {
        await deleteTask(token, selectedTaskId!)
        const filteredNewTasks = props.tasks!.filter((task) => task.taskId !== selectedTaskId)
        setTasksNewMapping(filteredNewTasks)
        setIsTaskModalOpen(false)
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
                    deleteTask={deleteTaskHandler}
                    handleCancel={handleCancel}
                    selectedTaskId={selectedTaskId}
                    boardId={props.boardId!}
                    laneId={props.laneId!}
                    laneName={props.laneName!}
                    isEditor={props.isEditor!}
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
                    deleteTask={deleteTaskHandler}
                    boardId={props.boardId!}
                    laneId={props.laneId!}
                    laneName={props.laneName!}
                    isEditor={props.isEditor!}
                    reset={props.reset}
                />
                <SpinnerPage />
            </div>
        )

    }

}

export default LaneComponent