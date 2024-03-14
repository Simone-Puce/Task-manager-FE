import { Input, Button, Form, DatePicker, Select, SelectProps } from "antd";
import { ReactElement } from "react";
import { ISuccessRegistrationModal } from "../../../interfaces/components/modal/ISuccessRegistrationModal";
import Cookies from "js-cookie";
import "./CreateTaskForm.css"


const CreateTaskForm = ({ handleCancel }: ISuccessRegistrationModal): ReactElement => {
    const [form] = Form.useForm()
    const token = Cookies.get("jwt-token")

    const selectOptions: SelectProps['options'] =
        [
            {
                label: "To do",
                value: "TODO"
                

            },
            {
                label: "Work in progress",
                value: "WIP"
            },
            {
                label: "Review",
                value: "REVIEW"

            },
            {
                label: "Done",
                value: "DONE"

            },
        ]

    const onSubmit = async () => {

        console.log("Implement the 'saved Task' method")

    }

    return (
        <Form form={form} 
        name="new_task_form" 
        onFinish={onSubmit}
        layout="vertical"
        >
            <Form.Item
                name="name"
                label="Task Name"
                rules={[{ required: true, message: 'Please input the task name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item label="Status">
                <Select
                    defaultValue={selectOptions[0]}
                    allowClear
                    placeholder="Please select"
                    options={selectOptions}
                />
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