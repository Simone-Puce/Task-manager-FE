import { Input, Button, Form } from "antd";
import { ReactElement, useState } from "react";
import { ISuccessRegistrationModal } from "../../../interfaces/components/modal/ISuccessRegistrationModal";
import { createNewBoard } from "../../../services/BoardService";
import Cookies from "js-cookie";
import "./CreateBoardForm.css"

const CreateBoardForm = ({ handleCancel, setIsSpinning }: ISuccessRegistrationModal): ReactElement => {
    const [form] = Form.useForm()
    const token = Cookies.get("jwt-token")

    const onSubmit = async () => {
        setIsSpinning!(true)
        handleCancel()
        const boardName: string = form.getFieldValue("boardTitle")
        await createNewBoard(boardName, token!)
        setTimeout(() => {
            setIsSpinning!(false)
        }, 1000)
    }

    return (
        <Form
            layout="vertical"
            form={form}
            onFinish={onSubmit}
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
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                    <Button onClick={handleCancel}>
                        Cancel
                    </Button>
                </div>
            </Form.Item>
        </Form>
    )
}

export default CreateBoardForm