import { Button, Card, Input, Modal, Select } from "antd";
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
import TextArea from "antd/es/input/TextArea";

const TaskDetailsModal = (props: ITaskDetailsModal): ReactElement => {
    const token: string = Cookies.get("jwt-token")!
    const [task, setTask] = useState<Task>()
    const [board, setBoard] = useState<Board>()
    const [seed, setSeed] = useState<number>(1)
    const [selectedValue, setSelectedValue] = useState<number>(props.laneId)
    const [isUserAssociatedWithTask, setIsUserAssociatedWithTask] = useState<boolean>()
    const [taskDescription, setTaskDescription] = useState<string>("")
    const [taskName, setTaskName] = useState<string>("")
    const options: SelectProps['options'] = []

    const resetTaskDetails = () => {
        setSeed(Math.random())
    }

    useEffect(() => {
        const fetchTaskDetails = async () => {
            if (props.selectedTaskId) {
                const taskResponse = await getTaskById(token!, props.selectedTaskId!)
                if (taskResponse.status !== 400 && taskResponse.status !== 404) {
                    setTask(taskResponse.data)
                    setTaskDescription(taskResponse.data.description)
                    setTaskName(taskResponse.data.taskName)
                } else {
                    console.log(taskResponse.status)
                }
                const boardResponse = await getBoardById(props.boardId, token!)
                setBoard(boardResponse.data)
            }
        }
        fetchTaskDetails()
    }, [props.boardId, props.laneName, props.selectedTaskId, token, seed])

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
    }, [task, token, seed])

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

    const updateDescription = async (event: any) => {
        setTaskDescription(event.target.value)
        await updateTask(token, {
            taskName: task?.taskName,
            description: event.target.value,
            laneId: task?.laneId,
            taskId: task?.taskId
        })
        resetTaskDetails()
    }

    const updateTaskName = async () => {
        await updateTask(token, {
            taskName: taskName,
            description: taskDescription,
            laneId: task?.laneId,
            taskId: task?.taskId
        })
        resetTaskDetails()
    }

    const updateTaskNameHandler = (): ReactElement => {
        if (props.isEditor || isUserAssociatedWithTask) {
            return (
                <div className="update-task-name">
                    <Input
                        minLength={1}
                        showCount
                        maxLength={255}
                        size="small"
                        value={taskName}
                        onChange={async (event) => setTaskName(event?.target.value!)}
                        className="input-handler"
                    />
                    <Button className="color-button button-style" onClick={updateTaskName}> Update task name </Button>
                </div>
            )
        } else {
            return (
                <></>
            )
        }
    }

    const taskDescriptionHandler = (): ReactElement => {
        if (props.isEditor || isUserAssociatedWithTask) {
            return (
                <div className="textarea-container">
                    <label> Description </label>
                    <TextArea maxLength={5000} value={taskDescription} onChange={updateDescription} />
                </div>
            )
        } else {
            return (
                <div className="textarea-container">
                    <label> Description </label>
                    <TextArea disabled maxLength={5000} value={taskDescription} />
                </div>
            )
        }
    }

    return (
        <>
            <Modal
                title={task?.taskName?.toUpperCase()}
                open={props.isTaskModalOpen}
                onCancel={props.handleCancel}
                className='modal-Card'
                footer={<></>}
            >
                <Content>
                    <Card className="modal-card">
                        {updateTaskNameHandler()}
                        <h4>{"Creator: " + task?.createdBy}</h4>
                        <h4>{"Task creation date: " + task?.createdDate?.toString()}</h4>
                        <h4>{"Last update from: " + task?.modifiedBy}</h4>
                        <h4>{"Last update date: " + task?.modifiedDate}</h4>
                        {taskDescriptionHandler()}
                        {associateFormConditionalRender()}
                        {updateTaskStatusConditionalRender()}
                        <TaskAttachmentTable
                            {...task}
                            setTask={setTask}
                            resetTaskDetails={resetTaskDetails}
                            isEditor={props.isEditor}
                            isUserAssociatedWithTask={isUserAssociatedWithTask}
                        />
                        <UploadFileForm
                            taskId={task?.taskId!}
                            resetTaskDetails={resetTaskDetails}
                            isEditor={props.isEditor}
                            isUserAssociatedWithTask={isUserAssociatedWithTask}
                        />
                    </Card>
                </Content>
            </Modal>
        </>
    )
}


export default TaskDetailsModal