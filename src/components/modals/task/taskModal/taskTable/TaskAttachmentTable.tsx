import { Button, Space, Table, TableProps } from "antd"
import { Attachment } from "../../../../../interfaces/model/Attachment"
import { Task } from "../../../../../interfaces/model/Task"
import "./TaskAttachmentTable.css"
import { downloadFile } from "../../../../../services/AttachmentService"
import fileDownload from 'js-file-download'
import Cookies from "js-cookie"

const TaskAttachmentTable = (task: Task) => {
    const { attachments } = task
    const token = Cookies.get("jwt-token")
    
    
    const downloadHandler = async (attachment: Attachment) => {
        const downloadResponse = await downloadFile(attachment.attachmentId!, token!)
        const blob = new Blob([downloadResponse], {type: "application/pdf"})
        let link = document.createElement("a")
        link.href = URL.createObjectURL(blob)
        link.download = attachment.attachmentName!
        link.click()
        //const url = URL.createObjectURL(blob)
        //window.open(url)
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
                    <Button onClick={()=>downloadHandler(record)}>a</Button>
                    <Button>b</Button>
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