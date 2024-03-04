import { Content } from "antd/es/layout/layout"
import { Card } from "antd"
import { getUserDetails } from "../../../services/UserService"
import { useEffect, useState } from "react"
import { UserDetails } from "../../../interfaces/model/UseDetails"
import "./HomepageContent.css"

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

    useEffect(()=>{
        const fetchUserDetails = async () =>{
            const response = await getUserDetails();
            setUserDetails(response.data)
        }

        fetchUserDetails()
    },[])

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