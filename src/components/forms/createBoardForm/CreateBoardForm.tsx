import { SelectProps, Input, Select, Button, Form } from "antd";
import { ReactElement } from "react";
import { ISuccessRegistrationModal } from "../../../interfaces/components/modal/ISuccessRegistrationModal";
import { createNewBoard } from "../../../services/BoardService";
import Cookies from "js-cookie";
import "./CreateBoardForm.css"

const selectOptions: SelectProps['options'] =
    [
        {
            label: "To do",
            value: "To do"
        },
        {
            label: "Work in progress",
            value: "Work in progress"
        },
        {
            label: "Review",
            value: "Review"
        },
        {
            label: "Done",
            value: "Done"
        }
    ]

const CreateBoardForm = ({ handleCancel }: ISuccessRegistrationModal): ReactElement => {
    const [form] = Form.useForm()
    const token = Cookies.get("jwt-token")

    const onSubmit = async () => {
        const boardName: string = form.getFieldValue("boardTitle")
        const lanes: string[] = form.getFieldValue("lanes")
        const response = await createNewBoard(boardName, token!)
        console.log(response.data)

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
            <Form.Item
                label="Insert the lanes of your board"
                name="lanes"
            >
                <Select
                    mode="multiple"
                    allowClear
                    placeholder="Please select"
                    options={selectOptions}
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