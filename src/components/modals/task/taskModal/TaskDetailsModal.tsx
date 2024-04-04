import { Button, Card, Modal, Select } from "antd";
import { ReactElement, useEffect, useState } from "react";
import { ITaskDetailsModal } from "../../../../interfaces/components/modal/ITaskDetailsModal";
import { getTaskById, updateTask } from "../../../../services/TaskService";
import Cookies from "js-cookie";
import { Task } from "../../../../interfaces/model/Task";
import { Content } from "antd/es/layout/layout";
import { Board } from "../../../../interfaces/model/Board";
import { getBoardById } from "../../../../services/BoardService";
import { SelectProps } from "antd/es/select";
import { Lane } from "../../../../interfaces/model/Lane";
import TaskAttachmentTable from "./taskTable/TaskAttachmentTable";
import UploadFileForm from "../../../forms/uploadFile/UploadFileForm";
import AssociateUserTaskForm from "../../../forms/associateUserTaskForm/AssociateUserTaskForm";
import { getUserDetails } from "../../../../services/UserService";
import { UserInBoard } from "../../../../interfaces/model/UserInBoard";
import "./TaskDetailsModal.css"

const TaskDetailsModal = (props: ITaskDetailsModal): ReactElement => {
    const token: string = Cookies.get("jwt-token")!
    const [task, setTask] = useState<Task>()
    const [board, setBoard] = useState<Board>()
    const [selectedValue, setSelectedValue] = useState<number>(props.laneId)
    const [isUserAssociatedWithTask, setIsUserAssociatedWithTask] = useState<boolean>()
    const options: SelectProps['options'] = []

    useEffect(() => {
        const fetchTaskDetails = async () => {
            if (props.selectedTaskId) {
                const taskResponse = await getTaskById(token!, props.selectedTaskId!)
                if(taskResponse.status !== 400 && taskResponse.status !== 404) {
                    setTask(taskResponse.data)
                } else {
                    console.log(taskResponse.status)
                }
                const boardResponse = await getBoardById(props.boardId, token!)
                setBoard(boardResponse.data)
            }
        }

        fetchTaskDetails()
    }, [props.boardId, props.laneName, props.selectedTaskId, token])

    useEffect(() => {
        const fetchUserDetails = async () => {
            const userDetailsResponse = await getUserDetails(token)
            const loggedUserEmail = userDetailsResponse.data.email
            if (task && loggedUserEmail) {
                task.users?.forEach((user: UserInBoard) => {
                    if (user.email === loggedUserEmail) {
                        setIsUserAssociatedWithTask(true)
                    }
                })
            }
        }
        fetchUserDetails()
    }, [task, token])

    board?.lanes?.forEach((lane: Lane) => {
        options.push({
            value: lane.laneId,
            label: lane.laneName
        })
    })

    const handleSelectLaneChange = async (value: number) => {
        setSelectedValue(value)
        await updateTask(token!, {
            taskName: task?.taskName,
            description: task?.description,
            laneId: value,
            taskId: task?.taskId
        })
        props.reset()
    }

    const deleteButtonConditionalRender = () => {
        if (props.isEditor || isUserAssociatedWithTask) {
            return <Button className="color-button element-margin" onClick={props.deleteTask}> Delete task </Button>
        } else {
            return <></>
        }
    }

    const associateFormConditionalRender = () => {
        if (props.isEditor || isUserAssociatedWithTask) {
            return (
                <div className="user-task-form-container">
                    <AssociateUserTaskForm {...props} usersTask={task?.users!} />
                </div>
            )
        } else {
            return <></>
        }
    }

    const updateTaskStatusConditionalRender = () => {
        if (props.isEditor || isUserAssociatedWithTask) {
            return (
                <div className="update-delete-task">
                    <Select
                        className="task-select-modal-style element-margin"
                        onChange={handleSelectLaneChange}
                        options={options}
                        value={selectedValue}
                    />
                    {deleteButtonConditionalRender()}
                </div>
            )
        }
    }

    return (
        <>
            <Modal
                title={task?.taskName}
                open={props.isTaskModalOpen}
                onCancel={props.handleCancel}
                className='modal-Card'
                footer={<></>}
            >
                <Content>
                    <Card className="modal-card">
                        <p>Task description: {task?.description}</p>
                        <p>Creator: {task?.createdBy}</p>
                        <p>Task creation date:{task?.createdDate?.toString()}</p>
                        <p>Last update from:{task?.modifiedBy}</p>
                        {associateFormConditionalRender()}
                        {updateTaskStatusConditionalRender()}
                        <TaskAttachmentTable {...task} />
                        <UploadFileForm taskId={task?.taskId!} />
                    </Card>
                </Content>
            </Modal>
        </>
    )
}


export default TaskDetailsModal