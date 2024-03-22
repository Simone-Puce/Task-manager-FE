import { Button, Card, Modal, Select, Upload, UploadProps, message } from "antd";
import { ReactElement, useEffect, useState } from "react";
import { UploadOutlined } from '@ant-design/icons'
import { ITaskDetailsModal } from "../../../../interfaces/components/modal/ITaskDetailsModal";
import { getTaskById } from "../../../../services/TaskService";
import Cookies from "js-cookie";
import { Task } from "../../../../interfaces/model/Task";
import { Content } from "antd/es/layout/layout";
import "./TaskDetailsModal.css"
import { Board } from "../../../../interfaces/model/Board";
import { getBoardById } from "../../../../services/BoardService";
import { DefaultOptionType } from "antd/es/select";
import { Lane } from "../../../../interfaces/model/Lane";


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
    },
};



const TaskDetailsModal = (props: ITaskDetailsModal): ReactElement => {
    const token = Cookies.get("jwt-token")
    const [task, setTask] = useState<Task>()
    const [board, setBoard] = useState<Board>()
    const [selectValue, setSelectValue]= useState<string>()

    useEffect(() => {
        const fetchTaskDetails = async () => {
            const taskResponse = await getTaskById(token!, props.selectedTaskId!)
            setTask(taskResponse.data)
            const boardResponse = await getBoardById(props.boardId, token!)
            setBoard(boardResponse.data)
            setSelectValue(props.laneName)
        }

        fetchTaskDetails()
    }, [props.boardId, props.laneName, props.selectedTaskId, token])

    const selecteLaneOptions = (): DefaultOptionType[] => {
        const option: any[] = []
        board?.lanes?.map((lane: Lane) => {
            option.push({
                value: lane.boardId,
                label: lane.laneName
            })
        })
        return option
    }

    const updateLaneOfTask = async () => {
        //call service to update lane 
    }

    const handleSelectLaneChange = (value: string) => {
        console.log(value)

    }

    return (
        <>
            <Modal title={task?.taskName}
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
                        <Select
                            className="task-select-modal-style"
                            options={selecteLaneOptions()}
                            onChange={handleSelectLaneChange}
                            value={selectValue}
                        />
                        
                        <div>
                            <Upload {...property}>
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </div>
                    </Card>
                </Content>
            </Modal>
        </>
    )
}


export default TaskDetailsModal;