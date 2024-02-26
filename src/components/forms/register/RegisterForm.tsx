import { Button, Input } from "antd";
import Form, { Rule } from "antd/es/form";
import { ReactElement } from "react";
import "./RegisterForm.css"
import { Link } from "react-router-dom";
//import { useNavigate } from "react-router-dom";

const RegisterForm = (): ReactElement => {
    //const navigate = useNavigate()
    const passwordRegex: RegExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    const [form] = Form.useForm() //hook antd
    const passwordValidation = (): boolean => {
        return form.getFieldValue("password") === form.getFieldValue("confirmPassword") ? true : false;
    }

    const onSubmit = (): void => {
        passwordValidation() ? console.log("password match") : console.log("password do not match")
    }

    const emailRules: Rule[] = [
        { required: true, message: "Please input your email!", type: "email" }
    ]
    const passwordRules: Rule[] = [
        { required: true, message: "Please input your password!" },
        { pattern: passwordRegex, message: "Password should have at least a number and a special character" }
    ]

    return (
        <div className="register-form-container">
            <Form
                form={form}
                layout="vertical"
                name="login"
                initialValues={{ remember: true }}
                onFinish={onSubmit}
                //onFinishFailed={}
                autoComplete="off">
                <Form.Item label="Email" name="email" rules={emailRules}>
                    <Input />
                </Form.Item>
                <Form.Item label="Password" name="password" rules={passwordRules}>
                    <Input.Password />
                </Form.Item>
                <Form.Item label="Confirm password" name="confirmPassword" rules={passwordRules}>
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