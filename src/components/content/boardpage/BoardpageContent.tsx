import { Board } from "../../../interfaces/model/Board"
import LaneComponent from "./LaneComponent"
import { Lane } from "../../../interfaces/model/Lane"
import AssociateUserBoardForm from "../../forms/associateUserBoardForm/AssociateUserBoardForm"
import { Select } from "antd"
import { DefaultOptionType } from "antd/es/select"
import "./BoardpageContent.css"
import { Content } from "antd/es/layout/layout"
import { useEffect, useState } from "react"
import { getUserDetails } from "../../../services/UserService"
import Cookies from "js-cookie"
import { UserInBoard } from "../../../interfaces/model/UserInBoard"

const BoardpageContent = (props: Board) => {
    const token = Cookies.get("jwt-token")
    const { boardId, boardName, lanes, users, createdBy, modifiedBy, createdDate, modifiedDate } = props
    const [isEditor, setIsEditor] = useState<boolean>()

    useEffect(()=> {
        const checkIfUserIsEditor = async () => {
            const response = await getUserDetails(token!)
            users?.map((user: UserInBoard) => {
                if(user.email === response.data.email && user.roleCodeForBoard === "EDITOR"){
                    setIsEditor(true)
                }
            })
        }
        checkIfUserIsEditor()
    })

    const mappedLanes = () => {
        return (
            lanes?.map((lane: Lane, index) => (
                <LaneComponent key={index} {...lane} isEditor={isEditor} boardId={boardId}/>
            )))
    }

    const optionsHandler = (): DefaultOptionType[] => {
        const option: any[] = [{}]
        users?.map((user: any) => {
            option.push({
                value: user.email,
                label: user.email
            })
        })
        return option
    }

    return (
        <Content>
            <div className="task-content-container">
                <div className="serch-field">
                    <AssociateUserBoardForm {...props} />
                </div>
                <div className="audit-userlist-container">
                    <div>
                        Last update of the board from {modifiedBy} in date {modifiedDate?.toString()}
                    </div>
                    <div>
                        <Select
                            showSearch
                            placeholder="User connected to the board"
                            allowClear
                            className="select-style"
                            options={optionsHandler()}
                        />
                    </div>
                </div>
                <div className="task-content-style">
                    {mappedLanes()}
                </div>
            </div>
        </Content>
    )
}

export default BoardpageContent