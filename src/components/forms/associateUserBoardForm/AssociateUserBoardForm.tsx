import { Button, Form, Select } from "antd"
import Cookies from "js-cookie"

const AssociateUserBoardForm = () => {
    const [form] = Form.useForm()
    const token = Cookies.get("jwt-token")

    const onSubmit = () => {
    }

    return (
        <Form
            layout="inline"
            form={form}
            onFinish={onSubmit}
            autoComplete="off"
        >
            <Form.Item
                name="selectedUserEmail"
                label="Associate a new user to the board"
                rules={[{ required: true,  message: "Choose a user"}]}
            >
                <Select
                    defaultValue="choose a user"
                    style={{width: "200px"}}
                    options={[
                        {
                            label: "mock1@gmail.com",
                            value: "mock1@gmail.com"
                        },
                        {
                            label: "mock2@gmail.com",
                            value: "mock2@gmail.com"
                        }
                    ]}
                />
            </Form.Item>
            <Form.Item
                name="userRole"
                rules={[{ required: true, message: "A user needs to have a role when assigned to a board"}]}
            >
                <Select
                defaultValue="choose the role"
                style={{width: "200px"}}
                options={[
                    {
                        label: "EDITOR",
                        value: "EDITOR"
                    },
                    {
                        label: "USER",
                        value: "USER"
                    }
                ]}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add user
                </Button>
            </Form.Item>
        </Form>
    )
}

export default AssociateUserBoardForm