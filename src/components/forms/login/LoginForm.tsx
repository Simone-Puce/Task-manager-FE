import { Button, Form, Input, notification } from "antd"
import { Rule } from "antd/es/form"
import { ReactElement } from "react"
import { useNavigate } from "react-router-dom"
import "./LoginForm.css"
import { loginUser } from "../../../services/UserService"
import { NotificationPlacement } from "antd/es/notification/interface"
import Cookies from "js-cookie"

const LoginForm = (): ReactElement => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [notificationApi, contextHolder] = notification.useNotification();

    const emailRules: Rule[] = [
        { required: true, message: "Please input your email!", type: "email" }
    ]
    const passwordRules: Rule[] = [
        { required: true, message: "Please input your password!" }
    ]


    const openNotification = (placement: NotificationPlacement) => {
        notificationApi.error({
            message: `WRONG CREDENTIAL`,
            description:
                'You have entered an invalid email or password',
            placement,
        });
    };

    const successLoginHandler = (response: any) => {
        Cookies.set("jwt-token", response.data.accessToken)
        navigate("/homepage")
    }

    const onSubmit = async () => {
        const { email, password } = form.getFieldsValue(["email", "password"])
        const response = await loginUser({ email, password })
        //response.success === true ? successLoginHandler(response) : openNotification("top")
        console.log(response)
        successLoginHandler(response)
    }

    return (
        <div className="login-form-container">
            {contextHolder}
            <Form
                className="login-form"
                layout="vertical"
                name="login"
                initialValues={{ remember: true }}
                onFinish={onSubmit}
                form={form}
                autoComplete="off">
                <Form.Item label="Email" name="email" rules={emailRules}>
                    <Input />
                </Form.Item>
                <Form.Item label="Password" name="password" rules={passwordRules}>
                    <Input.Password />
                </Form.Item>
                <div className="submit-registration">
                    <div className="login-button-style">
                        <Form.Item className="login-button-style">
                            <Button type="primary" htmlType="submit" className="color-button">
                                Sign In
                            </Button>
                        </Form.Item>
                    </div>
                    <div className="login-button-style">
                        <Form.Item>
                            <Button type="primary" onClick={() => navigate("/register")} className="secondary-color-button">
                                Sign up
                            </Button>
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default LoginForm
