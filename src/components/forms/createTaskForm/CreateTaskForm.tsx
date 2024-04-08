import { Input, Button, Form } from "antd";
import { ReactElement } from "react";
import Cookies from "js-cookie";
import { createTask } from "../../../services/TaskService";
import { ICreateUpdateTaskModal } from "../../../interfaces/components/modal/ICreateUpdateTaskModal";
import "./CreateTaskForm.css"

const CreateTaskForm = ({ handleCancel, selectedLane, reset, createTaskHandler }: ICreateUpdateTaskModal): ReactElement => {
    const [form] = Form.useForm()
    const token = Cookies.get("jwt-token")

    const onSubmit = async () => {
        const formValues = form.getFieldsValue()
        const taskResponse = await createTask(token!, {
            taskName: formValues.taskName,
            laneId: selectedLane
        })
        if (taskResponse !== undefined) {
            createTaskHandler!(taskResponse.data)
        }
        handleCancel()
        reset()
    }

    return (
        <Form form={form}
            name="new_task_form"
            onFinish={onSubmit}
            layout="vertical"
        >
            <Form.Item
                name="taskName"
                label="Task Name"
                rules={[{ required: true, message: 'Please input the task name!' }]}
            >
                <Input />
            </Form.Item>
            <div className="buttons">
                <Button type="primary" htmlType="submit" className="color-button">
                    Add
                </Button>
                <Button onClick={handleCancel} className="secondary-color-button">
                    Cancel
                </Button>
            </div>
        </Form>
    )
}

export default CreateTaskForm