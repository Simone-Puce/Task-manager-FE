import { Modal } from "antd";
import { ReactElement, useEffect, useState } from "react";
import "./TaskDetailsModal.css"
import { ITaskDetailsModal } from "../../../../interfaces/components/modal/ITaskDetailsModal";
import { getTaskById } from "../../../../services/TaskService";
import Cookies from "js-cookie";
import { Task } from "../../../../interfaces/model/Task";

const TaskDetailsModal = (props : ITaskDetailsModal): ReactElement => {
    const token = Cookies.get("jwt-token")
    const [task, setTask] = useState<Task>()

    useEffect(()=> {
        const fetchTaskDetails = async() => {
            const response = await getTaskById(token!, props.selectedTaskId!)
            setTask(response.data)
        }

        fetchTaskDetails()
    },[props.selectedTaskId, token])

    return (
        <>
            <Modal title={task?.taskName}
                open={props.isTaskModalOpen}
                onCancel={props.handleCancel}
                className='taskDetailsModalStyle'
                footer={<></>}
            >
                <div>
                    {task?.description}
                </div>
            </Modal>
        </>
    )
}


export default TaskDetailsModal;