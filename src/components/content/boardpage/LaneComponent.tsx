import { ReactElement, useState } from "react"
import { Task } from "../../../interfaces/model/Task"
import { Card, Form, Input } from "antd"
import CreateTaskModal from "../../modals/task/createTask/CreateTaskModal"
import { ILaneComponent } from "../../../interfaces/components/contents/ILaneComponent"
import TaskDetailsModal from "../../modals/task/taskModal/TaskDetailsModal"
import CreateTaskButton from "../../button/CreateTaskButton"
import SpinnerPage from "../../../pages/spinner/SpinnerPage"
import { getUserDetails } from "../../../services/UserService"
import Cookies from "js-cookie"
import { deleteTask } from "../../../services/TaskService"
import { updateLane } from "../../../services/LaneServices"
import "./BoardpageContent.css"

const LaneComponent = (props: ILaneComponent): ReactElement => {
    const [isCreateUpdateTaskOpen, setIsCreateUpdateTaskOpen] = useState<boolean>(false)
    const [isTaskModalOpen, setIsTaskModalOpen] = useState<boolean>(false)
    const [selectedTaskId, setSelectedTaskId] = useState<number>()
    const [tasksNewMapping, setTasksNewMapping] = useState<Task[]>()
    const [isColumnNameInUpdate, setIsColumnNameInUpdate] = useState<boolean>()
    const [form] = Form.useForm()
    const token: string = Cookies.get("jwt-token")!

    const showCreateUpdateTask = () => {
        setIsCreateUpdateTaskOpen(true)
    }

    const handleCancel = () => {
        setIsCreateUpdateTaskOpen(false)
        setIsTaskModalOpen(false)
        props.reset()
    }

    const showTaskModal = async (taskId: number) => {
        const response = await getUserDetails(token!)
        const userRole = response.data.roles[0].name
        if (userRole === "ROLE_USER") {
            setSelectedTaskId(taskId)
            setIsTaskModalOpen(true)
            props.reset()
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
                        <p>Click to see details</p>
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
                        <p>Click to see details</p>
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
        props.reset()
    }

    const updateLaneName = async () => {
        const laneName = form.getFieldValue("laneName")
        if (laneName) {
            await updateLane(token, {
                laneName: laneName,
                boardId: props.boardId,
                laneId: props.laneId
            })
        }
        setIsColumnNameInUpdate(!isColumnNameInUpdate)
        form.resetFields()
        props.reset()
    }

    const laneNameHandler = () => {
        if (isColumnNameInUpdate) {
            return (
                <Form
                    className="form-style"
                    form={form}
                    onFinish={updateLaneName}
                    autoComplete="off"
                >
                    <Form.Item
                        name="laneName"
                        rules={[{ required: true }]}>
                        <Input maxLength={12} showCount defaultValue={props.laneName} />
                    </Form.Item>
                </Form>
            )
        } else {
            return (
                <h1> {props.laneName?.toUpperCase()} </h1>
            )
        }
    }

    const createTaskHandler = (newTask: Task) => {
        const newTaskArray: Task[] = props.tasks!
        newTaskArray.push(newTask)
        setTasksNewMapping(newTaskArray)
    }

    const updateLaneHandler = () => {
        setIsColumnNameInUpdate(!isColumnNameInUpdate)
        form.resetFields()
    }

    if (!isCreateUpdateTaskOpen && !isTaskModalOpen) {
        return (
            <div className="general-task-div">
                <div className="lane-name-handler-container">
                    {laneNameHandler()}
                </div>
                <div className="button-div">
                    <CreateTaskButton
                        showModal={showCreateUpdateTask}
                        laneId={props.laneId}
                        reset={props.reset}
                        updateLaneHandler={updateLaneHandler}
                        isColumnNameInUpdate={isColumnNameInUpdate}
                        updateLaneName={updateLaneName}
                        isEditor={props.isEditor}
                        refresh={props.refresh}
                    />
                </div>
                <CreateTaskModal
                    reset={props.reset}
                    showModal={showCreateUpdateTask}
                    isModalOpen={isCreateUpdateTaskOpen}
                    handleCancel={handleCancel}
                    selectedLane={props.laneId}
                    createTaskHandler={createTaskHandler}
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
                <div className="lane-name-handler-container">
                    {laneNameHandler()}
                </div>
                <CreateTaskModal
                    reset={props.reset}
                    showModal={showCreateUpdateTask}
                    isModalOpen={isCreateUpdateTaskOpen}
                    handleCancel={handleCancel}
                    createTaskHandler={createTaskHandler}
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