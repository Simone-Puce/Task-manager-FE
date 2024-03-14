import { SelectProps, Input, Select, Button, Form } from "antd";
import { ReactElement } from "react";
import { ISuccessRegistrationModal } from "../../../interfaces/components/modal/ISuccessRegistrationModal";
import { createNewBoard } from "../../../services/BoardService";
import Cookies from "js-cookie";
import "./CreateBoardForm.css"
import { createLane } from "../../../services/Lane";
import { associateBordLane } from "../../../services/BoardLaneService";

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
    const lanes = ["To do", "Work in progress", "Review", "Done"]

    const associateLane = async (boardId: number, laneId: number) => {
        const response = await associateBordLane(token!, boardId, laneId)
    }

    const createNewLane = async (boardId: number) => {
        const response1 = await createLane(token!, "To do")
        const response2 = await createLane(token!, "Work in progress")
        const response3 = await createLane(token!, "Review")
        const response4 = await createLane(token!, "Done")

        associateLane(boardId, response1.data.laneId)
        associateLane(boardId, response2.data.laneId)
        associateLane(boardId, response3.data.laneId)
        associateLane(boardId, response4.data.laneId)

    }

    const onSubmit = async () => {
        const boardName: string = form.getFieldValue("boardTitle")
        const response = await createNewBoard(boardName, token!)
        createNewLane(response.data.boardId)
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