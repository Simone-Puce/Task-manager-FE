import { Content } from "antd/es/layout/layout"
import { Card } from "antd"
import { getUserDetails } from "../../../services/UserService"
import { useCallback, useEffect, useState } from "react"
import { UserDetails } from "../../../interfaces/model/UserDetails"
import "./HomepageContent.css"
import { rejects } from "assert"
import { get } from "http"

const emptyCardArray: any[] = [<></>]

const cardArray = [
    <>
        <Card title="Board name"
            bordered={true}
            hoverable
            onClick={() => console.log("navigate to the board")}
            className="card-style">
            Board
        </Card>
        <Card title="Board name"
            bordered={true}
            hoverable
            onClick={() => console.log("navigate to the board")}
            className="card-style">
            Board
        </Card>
        <Card title="Board name"
            bordered={true}
            hoverable
            onClick={() => console.log("navigate to the board")}
            className="card-style">
            Board
        </Card>
        <Card title="Board name"
            bordered={true}
            hoverable
            onClick={() => console.log("navigate to the board")}
            className="card-style">
            Board
        </Card>
        <Card title="Board name"
            bordered={true}
            hoverable
            onClick={() => console.log("navigate to the board")}
            className="card-style">
            Board
        </Card>
        <Card title="Board name"
            bordered={true}
            hoverable
            onClick={() => console.log("navigate to the board")}
            className="card-style">
            Board
        </Card>
        <Card title="Board name"
            bordered={true}
            hoverable
            onClick={() => console.log("navigate to the board")}
            className="card-style">
            Board
        </Card>
        <Card title="Board name"
            bordered={true}
            hoverable
            onClick={() => console.log("navigate to the board")}
            className="card-style">
            Board
        </Card>
        <Card title="Board name"
            bordered={true}
            hoverable
            onClick={() => console.log("navigate to the board")}
            className="card-style">
            Board
        </Card>
        <Card title="Board name"
            bordered={true}
            hoverable
            onClick={() => console.log("navigate to the board")}
            className="card-style">
            Board
        </Card>
        <Card title="Board name"
            bordered={true}
            hoverable
            onClick={() => console.log("navigate to the board")}
            className="card-style">
            Board
        </Card>
        <Card title="Board name"
            bordered={true}
            hoverable
            onClick={() => console.log("navigate to the board")}
            className="card-style">
            Board
        </Card>
        <Card title="Board name"
            bordered={true}
            hoverable
            onClick={() => console.log("navigate to the board")}
            className="card-style">
            Board
        </Card>
        <Card title="Board name"
            bordered={true}
            hoverable
            onClick={() => console.log("navigate to the board")}
            className="card-style">
            Board
        </Card>
    </>
]

const HomepageContent = () => {
    const [userDetails, setUserDetails] = useState<UserDetails>()

    const fetchData = async () => {
        const response = await getUserDetails()
        if(response.data !== userDetails){
            setUserDetails(response.data)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await getUserDetails()
            console.log(response)
            setUserDetails(response.data)
        }
        
        fetchData()
    }, [])

  

    return (
        <div className="homepage-style">
            <div className="header-content-container">
                <h1>{userDetails?.firstName} {userDetails?.lastName} these are your boards</h1>
            </div>
            <div className="homepage-content-style">
                <Content className="content-width">
                    {cardArray.map((element) => (
                        <div className="homepage-card-container">
                            {element}
                        </div>
                    ))}
                </Content>
            </div>
        </div>
    )
}

export default HomepageContent