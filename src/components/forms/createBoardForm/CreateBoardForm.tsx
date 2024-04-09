import { Input, Button, Form } from "antd";
import { ReactElement } from "react";
import { createNewBoard, updateBoard } from "../../../services/BoardService";
import Cookies from "js-cookie";
import "./CreateBoardForm.css"
import { ICreateUPdateBoardModal } from "../../../interfaces/components/modal/ICreateUpdateBoardModal";
import "./CreateBoardForm.css"

const CreateBoardForm = ({ handleCancel, isCreating, boardId, reset }: ICreateUPdateBoardModal): ReactElement => {
    const [form] = Form.useForm()
    const token = Cookies.get("jwt-token")

    const onSubmitCreate = async () => {
        const boardName: string = form.getFieldValue("boardTitle")
        const response = await createNewBoard(boardName, token!)
        if (reset !== undefined && response.data !== undefined) {
            reset()
            form.resetFields()
        }
        handleCancel()
    }

    const onSubmitUpdate = async () => {
        handleCancel()
        const newBoardName = form.getFieldValue("boardTitle")
        const response = await updateBoard(newBoardName, boardId!, token!)
        if (reset !== undefined && response.data !== undefined) {
            reset()
            form.resetFields()
        }
    }

    if (isCreating) {
        return (
            <Form
                layout="vertical"
                form={form}
                onFinish={onSubmitCreate}
                autoComplete="off"
            >
                <Form.Item
                    name="boardTitle"
                    label="Insert the name of the board"
                    rules={[{ required: true, message: 'Please input the title of the board' }]}
                >
                    <Input
                        allowClear
                    />
                </Form.Item>
                <Form.Item>
                    <div className="buttons">
                        <Button type="primary" htmlType="submit" className="color-button">
                            Create
                        </Button>
                        <Button onClick={handleCancel} className="secondary-color-button">
                            Cancel
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        )
    } else {
        return (
            <Form
                layout="vertical"
                form={form}
                onFinish={onSubmitUpdate}
                autoComplete="off"
            >
                <Form.Item
                    name="boardTitle"
                    label="Update the name of the board"
                    rules={[{ required: true, message: 'Please input the title of the board' }]}
                >
                    <Input
                        allowClear
                    />
                </Form.Item>
                <Form.Item>
                    <div className="buttons">
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                        <Button onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>
                </Form.Item>
            </Form>

        )
    }
}

export default CreateBoardForm