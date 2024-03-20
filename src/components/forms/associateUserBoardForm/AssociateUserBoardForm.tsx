import { Button, Form, Select } from "antd"
import { DefaultOptionType } from "antd/es/select"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { UserDetails } from "../../../interfaces/model/UserDetails"
import { getAllUsers } from "../../../services/UserService"
import { Board } from "../../../interfaces/model/Board"
import { associateUserBoard } from "../../../services/BoardUserServices"

const AssociateUserBoardForm = (props: Board) => {
    const [form] = Form.useForm()
    const token = Cookies.get("jwt-token")
    const [nonAdminUsers, setNonAdminUsers] = useState<UserDetails[]>([])

    useEffect(() => {
        const fetchAllNonAdminUser = async () => {
            const response = await getAllUsers(token!)
            setNonAdminUsers(response.data)
        }
        fetchAllNonAdminUser()
    }, [token])

    const optionsHandler = (): DefaultOptionType[] => {
        const option: any[] = [{}]
        nonAdminUsers?.map((user: UserDetails) => {
            option.push({
                value: user.email,
                label: user.email
            })
        })
        return option
    }

    const onSubmit = async () => {
        const formValues = form.getFieldsValue()
        await associateUserBoard(
            {
                email: formValues.selectedUserEmail,
                boardId: props.boardId,
                roleCode: formValues.userRole
            }, token!)
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
                rules={[{ required: true, message: "Choose a user" }]}
            >
                <Select
                    showSearch
                    defaultValue="choose a user"
                    style={{ width: "200px" }}
                    options={optionsHandler()}
                />
            </Form.Item>
            <Form.Item
                name="userRole"
                rules={[{ required: true, message: "A user needs to have a role when assigned to a board" }]}
            >
                <Select
                    defaultValue="choose the role"
                    style={{ width: "200px" }}
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