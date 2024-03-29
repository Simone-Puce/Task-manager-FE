import { Button, Input, Popover, message } from "antd"
import Form, { Rule } from "antd/es/form"
import { ReactElement, useState } from "react"
import "./RegisterForm.css"
import { Link, useNavigate } from "react-router-dom"
import { registerNewUser } from "../../../services/UserService"
import SuccessfulRegisterUserModal from "../../modals/succesfulRegisterUser/SuccessfulRegisterUserModal"

const RegisterForm = (): ReactElement => {
    const passwordRegex: RegExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clicked, setClicked] = useState(false);
    const popOverMessage: string = "Password don't match";
    const navigate = useNavigate();
    const passwordValidation = (): boolean => {
        return form.getFieldValue("password") === form.getFieldValue("confirmPassword") ? true : false;
    }

    const clickedManagment = () => {
        setClicked(true)
        setTimeout(() => {
            setClicked(false)
        }, 1500)
    }

    const handleClickChange = () => {
        passwordValidation() ? setClicked(false) : clickedManagment()
    }

    const showModal = (): void => {
        setIsModalOpen(true);
    }

    const handleOk = () => {
        navigate("/")
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const onFailedSubmit = () => {
        messageApi.warning('Fill the form properly');
    }

    const sendData = async () => {
        const { email, firstName, lastName, password } = form.getFieldsValue(["email", "firstName", "lastName", "password"])
        const response = await registerNewUser({ email, firstName, lastName, password })
        response.success === true ? showModal() : message.error("This user already exists ")
    }

    const titleFunction = (): string => {
        passwordValidation() === true ? setClicked(false) : setClicked(true)
        return popOverMessage
    }


    const onSubmit = (): any => {
        if (passwordValidation() === true) {
            sendData()
        } else {

        }
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
            <SuccessfulRegisterUserModal
                showModal={showModal}
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
            />
            {contextHolder}
            <Form
                className="register-form-style"
                form={form}
                layout="vertical"
                name="login"
                initialValues={{ remember: true }}
                onFinish={onSubmit}
                onFinishFailed={onFailedSubmit}
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
                <Popover
                    placement="bottom"
                    content={"Password should have a capital letter, a number and a special character"}
                    trigger="click" >
                    <Form.Item label="Password" name="password" rules={passwordRules}>
                        <Input.Password /*onFocus={showPasswordInfo} */ />
                    </Form.Item>
                </Popover>
                <Form.Item label="Confirm password" name="confirmPassword" rules={confirmPasswordRules}>
                    <Input.Password />
                </Form.Item>
                <div className="submit-login">
                    <div className="register-button-style">
                    <Form.Item>
                        <Popover
                            placement="left"
                            title={titleFunction}
                            trigger="click"
                            open={clicked}
                            onOpenChange={handleClickChange}
                        >
                            <Button type="primary" htmlType="submit" className="color-button">
                                Register
                            </Button>
                        </Popover>
                    </Form.Item>
                    </div>
                    <div className="register-button-style">
                        <Form.Item>
                            <Button type="primary" onClick={() => navigate("/")} className="secondary-color-button">
                                Login
                            </Button>
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default RegisterForm;