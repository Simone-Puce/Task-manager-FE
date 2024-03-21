import { useState, useEffect } from "react"
import { getUserDetails } from "../../services/UserService"
import Cookies from "js-cookie"
import { FileAddOutlined } from '@ant-design/icons'
import { Button } from "antd"

const CreateTaskButton = ({ showModal }: any) => {
    const token = Cookies.get("jwt-token")
    const [hideCreateTask, setHideCreateTask] = useState<boolean>(false)

    useEffect(() => {
        const fetchUser = async () => {
            const response = await getUserDetails(token!)
            console.log(response.data.roles[0].name)
            if(response.data.roles[0].name === "ROLE_ADMIN"){
                setHideCreateTask(true)
            } else {
                setHideCreateTask(false)
            }
        }
        fetchUser()
    }, [token])

    if (!hideCreateTask) {
        return (
            <Button icon={<FileAddOutlined />} onClick={showModal}>
                New Task
            </Button>
        )
    } else {
        return <></>
    }
}

export default CreateTaskButton