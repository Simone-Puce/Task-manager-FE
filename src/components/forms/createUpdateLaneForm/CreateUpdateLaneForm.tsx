import { Button, Form, Input } from "antd"
import { createLane } from "../../../services/LaneServices"
import { ReactElement } from "react"
import Cookies from "js-cookie"
import { ICreateLaneModal } from "../../../interfaces/components/modal/ICreateLaneModal"


const CreateUpdateLaneForm = ({ handleCancel, selectedBoardId }: ICreateLaneModal): ReactElement => {
    const [form] = Form.useForm()
    const token = Cookies.get("jwt-token")

    const onSubmit = async () => {
        handleCancel()
        const laneName: string = form.getFieldValue("laneName")
        await createLane(token!, {
            laneName: laneName,
            boardId: selectedBoardId
        })
    }

    return (
        <Form 
            layout="vertical"
            form={form}
            onFinish={onSubmit}
            autoComplete="off"
        >
            <Form.Item
                name="laneName"
                label="Insert the name of the lane"
                rules={[{ required: true, message: 'Please input the title of the lane' }]}
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
}

export default CreateUpdateLaneForm