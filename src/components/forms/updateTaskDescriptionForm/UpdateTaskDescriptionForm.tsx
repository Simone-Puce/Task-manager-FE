import { Button, Form } from "antd"
import TextArea from "antd/es/input/TextArea"
import Cookies from "js-cookie"
import { ReactElement } from "react"
import { Task } from "../../../interfaces/model/Task"
import { updateTask } from "../../../services/TaskService"

const UpdateTaskDescriptionForm = (task: Task): ReactElement => {
    const { description, taskName, laneId, taskId } = task
    const [form] = Form.useForm()
    const token = Cookies.get("jwt-token")!

    const submitUpdatedDescription = async () => {
        const newDescription = form.getFieldValue("newDescription")
        await updateTask(token, {
            taskName: taskName,
            description: newDescription,
            laneId: laneId,
            taskId: taskId
        })

    }

    const placeHolderHandler = (): string => {
        if (description === undefined) {
            return ""
        } else {
            return description
        }
    }

    return (
        <Form
            form={form}
            onFinish={submitUpdatedDescription}
            autoComplete="off"
            className="form-container"
        >
            <Form.Item
                name="newDescription"
                className="element-margin"
            >
                <TextArea maxLength={5000} placeholder={placeHolderHandler()} />
            </Form.Item>
            <Form.Item className="element-margin">
                <Button htmlType="submit" className="color-button button-width">
                    Update Description
                </Button>
            </Form.Item>
        </Form>
    )
}

export default UpdateTaskDescriptionForm