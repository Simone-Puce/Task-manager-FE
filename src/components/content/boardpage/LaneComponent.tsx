import { ReactElement, useEffect, useState } from "react"
import { Task } from "../../../interfaces/model/Task"
import { Button, Card } from "antd"
import { FileAddOutlined } from '@ant-design/icons'
import CreateTaskModal from "../../modals/createTask/CreateTaskModal"
import { ILaneComponent } from "../../../interfaces/components/contents/ILaneComponent"
import "./BoardpageContent.css"
import { getUserDetails } from "../../../services/UserService"
import Cookies from "js-cookie"

const LaneComponent = (props: ILaneComponent): ReactElement => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [hideCreateTask, setHideCreateTask] = useState<boolean>(false)
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
    }

    return (
        <div className="general-task-div">
            <h1> {props.laneName} </h1>
            <div hidden={hideCreateTask}>
                <Button icon={<FileAddOutlined />} onClick={showModal}>
                    New Task
                </Button>
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