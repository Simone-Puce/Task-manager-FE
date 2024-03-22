import { Button, Card, Modal, Select, Upload, UploadProps, message } from "antd";
import { ReactElement, useEffect, useState } from "react";
import { UploadOutlined } from '@ant-design/icons'
import { ITaskDetailsModal } from "../../../../interfaces/components/modal/ITaskDetailsModal";
import { getTaskById } from "../../../../services/TaskService";
import Cookies from "js-cookie";
import { Task } from "../../../../interfaces/model/Task";
import { Content } from "antd/es/layout/layout";
import "./TaskDetailsModal.css"


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

    useEffect(() => {
        const fetchTaskDetails = async () => {
            const response = await getTaskById(token!, props.selectedTaskId!)
            setTask(response.data)
            console.log(response.data)
        }

        fetchTaskDetails()
    }, [])

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
                        <p>{task?.laneId}</p>
                        <Select>
                            
                        </Select>
                        <div>
                            <Upload {...property}>
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </div>
                    </Card>
                </Content>
            </Modal>-
        </>
    )
}


export default TaskDetailsModal;