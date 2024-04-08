import { Button, Space, Table, TableProps, notification } from "antd"
import { Attachment } from "../../../../../interfaces/model/Attachment"
import { deleteAttachment, getFileById } from "../../../../../services/AttachmentService"
import Cookies from "js-cookie"
import { saveAs } from "file-saver"
import { useState } from "react"
import { ITaskAttachmentTable } from "../../../../../interfaces/components/tables/ITaskAttachmentTable"
import "./TaskAttachmentTable.css"

const TaskAttachmentTable = (props: ITaskAttachmentTable) => {
    const { attachments, resetTaskDetails } = props
    const [newAttachments, setNewAttachments] = useState<Attachment[]>()
    const token: string = Cookies.get("jwt-token")!

    const openNotification = () => {
        notification.open({
            message: "Can't delete the file",
            duration: 1.5
        });
    };

    const deleteHandler = async (attachment: Attachment) => {
        if (props.isEditor || props.isUserAssociatedWithTask) {
            await deleteAttachment(attachment.attachmentId!, token)
            if (attachmentHandler(attachment.attachmentId!).length === 0) {
                setNewAttachments([])
            } else {
                setNewAttachments(attachmentHandler(attachment.attachmentId!))
            }
            resetTaskDetails()
        } else {
            openNotification()
        }
    }

    const attachmentHandler = (attachmentId: number) => {
        if (newAttachments === undefined) {
            const newAttachmentsFiltered = attachments!.filter((checkAttachment) => checkAttachment.attachmentId !== attachmentId)
            return newAttachmentsFiltered
        } else {
            const newAttachmentsFiltered = newAttachments!.filter((checkAttachment) => checkAttachment.attachmentId !== attachmentId)
            return newAttachmentsFiltered
        }
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
                byteArray[i] = decodedTxt.charCodeAt(i)
            }
            const blob = new Blob([byteArray.buffer], { type: 'text/plain' })
            saveAs(blob, attachment.attachmentName + ".txt")
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
                    <Button onClick={() => downloadHandler(record)} className="color-button">download</Button>
                    <Button className="secondary-color-button" onClick={() => deleteHandler(record)}>delete</Button>
                </Space>
            )
        },
    ]

    const populateBoard = (): Attachment[] => {
        const data: Attachment[] = []
        if (newAttachments?.length === undefined) {
            attachments?.forEach((attachment: Attachment) => {
                data.push(attachment)
            })
        } else {
            newAttachments?.forEach((attachment: Attachment) => {
                data.push(attachment)
            })
        }
        return data
    }

    return (
        <Table bordered className="table-general-style" columns={columns} dataSource={populateBoard()} />
    )
}

export default TaskAttachmentTable