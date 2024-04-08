import { Button, Form, Select } from "antd"
import { DefaultOptionType } from "antd/es/select"
import { useEffect, useState } from "react"
import { getBoardById } from "../../../services/BoardService"
import Cookies from "js-cookie"
import { UserInBoard } from "../../../interfaces/model/UserInBoard"
import { IAssociateUserTaskForm } from "../../../interfaces/components/forms/IAssociateUserTaskForm"
import { associateUserTask } from "../../../services/TaskUserService"
import "./AssociateUserTaskForm.css"

const AssociateUserTaskForm = (props: IAssociateUserTaskForm) => {
    const [form] = Form.useForm()
    const token = Cookies.get("jwt-token")!
    const [usersInBoard, setUsersInBoard] = useState<UserInBoard[]>()

    const onSubmit = async () => {
        const formValues = form.getFieldsValue()
        await associateUserTask(token, props.selectedTaskId!, formValues)
        setUsersInBoard(usersInBoard!.filter(user => user.email !== formValues.selectedUserEmail))
        form.resetFields()
    }

    useEffect(() => {
        const fetchUserInBoardAndTaskDetails = async () => {
            if (props.boardId === undefined) {
                const localStorageId = localStorage.getItem("my-board-id")
                const boardResponse = await getBoardById(parseInt(localStorageId!), token)
                const usersInBoard = boardResponse.data.users
                const usersAssociatedWithTask: string[] = []
                const associatedUserArray = props.usersTask!
                if (associatedUserArray) {
                    associatedUserArray.forEach((user: UserInBoard) => usersAssociatedWithTask.push(user.email))
                    const nonAssociatedUsers = usersInBoard.filter((user: UserInBoard) => !usersAssociatedWithTask.includes(user.email))
                    setUsersInBoard(nonAssociatedUsers)
                }
            } else {
                const boardResponse = await getBoardById(props.boardId, token)
                const usersInBoard = boardResponse.data.users
                const usersAssociatedWithTask: string[] = []
                const associatedUserArray = props.usersTask!
                if (associatedUserArray) {
                    associatedUserArray.forEach((user: UserInBoard) => usersAssociatedWithTask.push(user.email))
                    const nonAssociatedUsers = usersInBoard.filter((user: UserInBoard) => !usersAssociatedWithTask.includes(user.email))
                    setUsersInBoard(nonAssociatedUsers)
                }
            }
        }

        fetchUserInBoardAndTaskDetails()
    }, [props.boardId, props.usersTask, token])

    const optionsHandler = (): DefaultOptionType[] => {
        const option: any[] = []
        if (usersInBoard) {
            usersInBoard.forEach((user: UserInBoard) => {
                option.push({
                    value: user.email,
                    label: user.email
                })
            })
        }
        return option
    }

    return (
        <Form
            form={form}
            onFinish={onSubmit}
            autoComplete="off"
            className="form-container"
        >
            <Form.Item
                name="selectedUserEmail"
                rules={[{ required: true, message: "Associate a user" }]}
                className="element-margin"
            >
                <Select
                    showSearch
                    defaultValue="Associate a user"
                    options={optionsHandler()}
                />
            </Form.Item>
            <Form.Item className="element-margin">
                <Button htmlType="submit" className="color-button button-width">
                    Associate
                </Button>
            </Form.Item>
        </Form>
    )
}

export default AssociateUserTaskForm