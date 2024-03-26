import { Input, Button, Form } from "antd";
import { ReactElement } from "react";
import Cookies from "js-cookie";
import { createTask } from "../../../services/TaskService";
import "./CreateTaskForm.css"
import { ICreateUpdateTaskModal } from "../../../interfaces/components/modal/ICreateUpdateTaskModal";


const CreateTaskForm = ({ handleCancel, selectedLane, reset }: ICreateUpdateTaskModal): ReactElement => {
    const [form] = Form.useForm()
    const token = Cookies.get("jwt-token")

    const onSubmit = async () => {
        const formValues = form.getFieldsValue()
        await createTask(token!, {
            taskName: formValues.taskName,
            laneId: selectedLane
        })
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
                <Button type="primary" htmlType="submit">
                    Add
                </Button>
                <Button onClick={handleCancel}>
                    Cancel
                </Button>
            </div>
        </Form>
    );
};

export default CreateTaskForm