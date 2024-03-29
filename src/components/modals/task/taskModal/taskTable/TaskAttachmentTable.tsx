import { Button, Space, Table, TableProps } from "antd"
import { Attachment } from "../../../../../interfaces/model/Attachment"
import { Task } from "../../../../../interfaces/model/Task"
import "./TaskAttachmentTable.css"
import { getFileById } from "../../../../../services/AttachmentService"
import Cookies from "js-cookie"
import { saveAs } from "file-saver"

const TaskAttachmentTable = (task: Task) => {
    const { attachments } = task
    const token = Cookies.get("jwt-token")

    const deleteHandler = async (attachment: Attachment) => {

    }

    const downloadHandler = async (attachment: Attachment) => {
        if (attachment.extension === "pdf") {
            const downloadResponsePdf = await getFileById(attachment.attachmentId!, token!)
            const file64 = downloadResponsePdf.data.file64
            const decodedPdf = atob(file64)
            const byteArray = new Uint8Array(decodedPdf.length)
            for (let i = 0; i < decodedPdf.length; i++) {
                byteArray[i] = decodedPdf.charCodeAt(i);
            }
            const blob = new Blob([byteArray.buffer], { type: 'application/pdf' });
            saveAs(blob, attachment.attachmentName)
        }
        if (attachment.extension === "txt") {
            const downloadResponseTxt = await getFileById(attachment.attachmentId!, token!)
            const file64 = downloadResponseTxt.data.file64
            const decodedTxt = atob(file64)
            const byteArray = new Uint8Array(decodedTxt.length)
            for (let i = 0; i < decodedTxt.length; i++) {
                byteArray[i] = decodedTxt.charCodeAt(i);
            }
            const blob = new Blob([byteArray.buffer], { type: 'text/plain' });
            saveAs(blob, attachment.attachmentName+".txt")
        }
    }

    const columns: TableProps<Attachment>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'attachmentName',
            key: 'attachmentName',
        },
        {
            title: 'Extension',
            dataIndex: 'extension',
            key: 'extension',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: Attachment) => (
                <Space className="table-button-container">
                    <Button onClick={() => downloadHandler(record)}>download</Button>
                    <Button onClick={() => deleteHandler(record)}>delete</Button>
                </Space>
            ),
        },
    ]

    const populateBoard = (): Attachment[] => {
        const data: Attachment[] = []
        attachments?.forEach((attachment: Attachment) => {
            data.push(attachment)
        })
        return data
    }

    return (
        <Table bordered className="table-general-style" columns={columns} dataSource={populateBoard()} />
    )
}

export default TaskAttachmentTable