import { useState, useEffect } from "react"
import { getUserDetails } from "../../services/UserService"
import Cookies from "js-cookie"
import { FileAddOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button } from "antd"
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
                        <Button icon={<EditOutlined />} onClick={updateLaneHandler}>
                            Edit
                        </Button>
                        <Button icon={<DeleteOutlined />} onClick={deleteLaneHandler}>
                            Delete
                        </Button>
                    </>
                )
            } else {
                return (
                    <>
                        <Button htmlType="submit" icon={<EditOutlined />} onClick={updateLaneName}>
                            Confirm update
                        </Button>
                        <Button icon={<EditOutlined />} onClick={updateLaneHandler}>
                            Cancel update
                        </Button>
                    </>
                )
            }
        }
    }

    if (!hideCreateTask) {
        return (
            <div className="columns-button">
                <Button icon={<FileAddOutlined />} onClick={showModal}>
                    New Task
                </Button>
                {laneUpdateHandler()}
            </div>
        )
    } else {
        return <></>
    }
}

export default CreateTaskButton