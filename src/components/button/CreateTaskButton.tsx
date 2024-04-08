import { useState, useEffect } from "react"
import { getUserDetails } from "../../services/UserService"
import Cookies from "js-cookie"
import { FileAddOutlined, DeleteOutlined, EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Button, Popover } from "antd"
import "./CreateTaskButton.css"
import { deleteLane } from "../../services/LaneServices"
import { ICreateTaskButton } from "../../interfaces/components/buttons/ICreateTaskButton"

const CreateTaskButton = (props: ICreateTaskButton) => {
    const { showModal, laneId, reset, updateLaneHandler, isColumnNameInUpdate, updateLaneName, isEditor, refresh } = props
    const token = Cookies.get("jwt-token")
    const [hideCreateTask, setHideCreateTask] = useState<boolean>(false)

    useEffect(() => {
        const fetchUser = async () => {
            const response = await getUserDetails(token!)
            if (response.data.roles[0].name === "ROLE_ADMIN") {
                setHideCreateTask(true)
            } else {
                setHideCreateTask(false)
            }
        }
        fetchUser()
    }, [token])

    const deleteLaneHandler = async () => {
        await deleteLane(token!, laneId!)
        reset()
        refresh!()
    }

    const laneUpdateHandler = () => {
        if (isEditor) {
            if (!isColumnNameInUpdate) {
                return (
                    <>
                        <Popover placement="bottom" title="Update Lane">
                            <Button icon={<EditOutlined />} onClick={updateLaneHandler} />
                        </Popover>
                        <Popover placement="bottomRight" title="Delete Lane">
                            <Button icon={<DeleteOutlined />} onClick={deleteLaneHandler} />
                        </Popover>
                    </>
                )
            } else {
                return (
                    <>
                        <Popover placement="bottom" title="Update Lane Name" >
                            <Button htmlType="submit" icon={<CheckOutlined />} onClick={updateLaneName} />
                        </Popover>
                        <Popover placement="bottomRight" title="Cancel" >
                            <Button icon={<CloseOutlined />} onClick={updateLaneHandler} />
                        </Popover>
                    </>
                )
            }
        }
    }

    if (!hideCreateTask) {
        return (
            <div className="columns-button">
                <Popover placement="bottomLeft" title="New Task">
                    <Button icon={<FileAddOutlined />} onClick={showModal} />
                </Popover>
                {laneUpdateHandler()}

            </div>
        )
    } else {
        return <></>
    }
}

export default CreateTaskButton