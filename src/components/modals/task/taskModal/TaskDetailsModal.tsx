import { Button, Card, Modal, Select, Table, Upload, UploadProps, message } from "antd";
import { ReactElement, useEffect, useState } from "react";
import { UploadOutlined } from '@ant-design/icons'
import { ITaskDetailsModal } from "../../../../interfaces/components/modal/ITaskDetailsModal";
import { getTaskById, updateTask } from "../../../../services/TaskService";
import Cookies from "js-cookie";
import { Task } from "../../../../interfaces/model/Task";
import { Content } from "antd/es/layout/layout";
import { Board } from "../../../../interfaces/model/Board";
import { getBoardById } from "../../../../services/BoardService";
import { SelectProps } from "antd/es/select";
import { Lane } from "../../../../interfaces/model/Lane";
import "./TaskDetailsModal.css"
import TaskAttachmentTable from "./taskTable/TaskAttachmentTable";


const property: UploadProps = {
    name: 'file',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }
}

const TaskDetailsModal = (props: ITaskDetailsModal): ReactElement => {
    const token = Cookies.get("jwt-token")
    const [task, setTask] = useState<Task>()
    const [board, setBoard] = useState<Board>()
    const [selectedValue, setSelectedValue] = useState<number>(props.laneId)
    const options: SelectProps['options'] = []

    useEffect(() => {
        const fetchTaskDetails = async () => {
            if(props.selectedTaskId){
                const taskResponse = await getTaskById(token!, props.selectedTaskId!)
            setTask(taskResponse.data)
            const boardResponse = await getBoardById(props.boardId, token!)
            setBoard(boardResponse.data)
            }
        }

        fetchTaskDetails()
    }, [props.boardId, props.laneName, props.selectedTaskId, token])

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
                    <Card className="modal-Card">
                        <p>{task?.description}</p>
                        <p>{task?.createdBy}</p>
                        <p>{task?.createdDate?.toString()}</p>
                        <p>{task?.modifiedBy}</p>
                        <p>Column</p>
                        <p>
                            <Select
                                className="task-select-modal-style"
                                onChange={handleSelectLaneChange}
                                options={options}
                                value={selectedValue}
                            />
                        </p>
                        <TaskAttachmentTable {...task}/>
                        <div>
                            <Upload {...property}>
                                <Button icon={<UploadOutlined />} className="color-button">Click to Upload</Button>
                            </Upload>
                        </div>
                    </Card>
                </Content>
            </Modal>
        </>
    )
}


export default TaskDetailsModal;