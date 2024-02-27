import { Button, Form, Input } from "antd"
import { Rule } from "antd/es/form"
import { ReactElement } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./LoginForm.css"
import WrongCredentialModal from "../../modals/WrongCredentialModal"
import { loginUser } from "../../../services/UserService"

const LoginForm = (): ReactElement => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const emailRules: Rule[] = [
        { required: true, message: "Please input your email!", type: "email" }
    ]
    const passwordRules: Rule[] = [
        { required: true, message: "Please input your password!" }
    ]

    const errorModal = (): any => { <WrongCredentialModal /> }  //here goes the component that contains the modal

    const onSubmit = async () => {
        const { email, password } = form.getFieldsValue(["email", "password"])
        const response = await loginUser({ email, password })
        response.success === true ? navigate("homepage") : console.log("failed")
    }

    return (
        <div className="login-form-container">
            <Form
                className="login-form"
                layout="vertical"
                name="login"
                initialValues={{ remember: true }}
                onFinish={onSubmit}
                form={form}
                onFinishFailed={errorModal} //here goes the funbction that calls the modal component
                autoComplete="off">
                <Form.Item label="Email" name="email" rules={emailRules}>
                    <Input />
                </Form.Item>
                <Form.Item label="Password" name="password" rules={passwordRules}>
                    <Input.Password />
                </Form.Item>
                <div className="submit-registration">
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Sign In
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Link to="/register">Create account</Link>
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}

export default LoginForm
