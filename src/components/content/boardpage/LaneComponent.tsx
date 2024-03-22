import { ReactElement, useEffect, useState } from "react"
import { Task } from "../../../interfaces/model/Task"
import { Card } from "antd"
import CreateTaskModal from "../../modals/task/createTask/CreateTaskModal"
import { ILaneComponent } from "../../../interfaces/components/contents/ILaneComponent"
import { getUserDetails } from "../../../services/UserService"
import Cookies from "js-cookie"
import CreateTaskButton from "../../button/CreateTaskButton"
import TaskDetailsModal from "../../modals/task/taskModal/TaskDetailsModal"
import "./BoardpageContent.css"

const LaneComponent = (props: ILaneComponent): ReactElement => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false)
    const [hideCreateTask, setHideCreateTask] = useState<boolean>(false)
    const [selectedTaskId, setSelectedTaskId] = useState<number>()
    const token = Cookies.get("jwt-token")

    useEffect(() => {
        const fetchUser = async () => {
            const response = await getUserDetails(token!)
            if (response.data.roles[0].name === "ROLE_ADMIN") {
                setHideCreateTask(true)
            }
        }
        fetchUser()
    }, [token])

    const showModal = () => {
        setIsModalOpen(true);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsTaskModalOpen(false)
    }

    const showTaskModal = (taskId: number) => {
        setSelectedTaskId(taskId)
        setIsTaskModalOpen(true);
    }

    return (
        <div className="general-task-div">
            <h1> {props.laneName} </h1>
            <div  className="button-div">
                <CreateTaskButton showModal={showModal}/>
            </div>
            <CreateTaskModal
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
            />
            {props.tasks!.map((task: Task) => (
                <Card title={task.taskName}
                    key={task.taskId}
                    bordered={true}
                    hoverable
                    onClick={()=>showTaskModal(task.taskId!)}
                    className="card-style">
                    Task card
                </Card>
            ))}
        </div>
    )
}

export default LaneComponent