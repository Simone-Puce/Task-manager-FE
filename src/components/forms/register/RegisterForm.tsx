import { Button, Input, message } from "antd";
import Form, { Rule } from "antd/es/form";
import { ReactElement } from "react";
import "./RegisterForm.css"
import { Link } from "react-router-dom";
import { registerNewUser } from "../../../services/UserService";

const RegisterForm = (): ReactElement => {
    const passwordRegex: RegExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage();
    const passwordValidation = (): boolean => {
        return form.getFieldValue("password") === form.getFieldValue("confirmPassword") ? true : false;
    }

    const showPasswordInfo = () => {
        messageApi.info('Password should have a capital letter, a number and a special character');
    }

    const sendData = async () => {
        const { email, firstName, lastName, password } = form.getFieldsValue(["email", "firstName", "lastName", "password"])
        await registerNewUser({ email, firstName, lastName, password })
    }

    const onSubmit = (): void => {
        passwordValidation() ? sendData() : console.log("password do not match")
    }
    const emailRules: Rule[] = [
        { required: true, message: "Please input a valid email!", type: "email" }
    ]
    const anagraphicRules: Rule[] = [
        { required: true, type: "string", message: "Fill this field" }
    ]
    const passwordRules: Rule[] = [
        { required: true, message: "Please input your password!", pattern: passwordRegex }
    ]
    const confirmPasswordRules: Rule[] = [
        { required: true, message: "Please repeat your password!", pattern: passwordRegex }
    ]

    return (
        <div className="register-form-container">
            {contextHolder}
            <Form
                className="register-form-style"
                form={form}
                layout="vertical"
                name="login"
                initialValues={{ remember: true }}
                onFinish={onSubmit}
                onFinishFailed={() => console.log("sium")}
                autoComplete="off">
                <Form.Item label="Email" name="email" rules={emailRules}>
                    <Input />
                </Form.Item>
                <Form.Item label="First name" name="firstName" rules={anagraphicRules}>
                    <Input />
                </Form.Item>
                <Form.Item label="Last name" name="lastName" rules={anagraphicRules}>
                    <Input />
                </Form.Item>
                <Form.Item label="Password" name="password" rules={passwordRules}>
                    <Input.Password onFocus={showPasswordInfo} />
                </Form.Item>
                <Form.Item label="Confirm password" name="confirmPassword" rules={confirmPasswordRules}>
                    <Input.Password />
                </Form.Item>
                <div className="submit-login">
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Link to="/">Login</Link>
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}

export default RegisterForm;