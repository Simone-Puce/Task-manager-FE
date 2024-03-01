import { Content } from "antd/es/layout/layout";
import { Card } from "antd";

import "./HomepageContent.css"
import { Navigate, useNavigate } from "react-router-dom";

const emptyCardArray: any[] = [<></>]
    
const cardArray = [
    <>
        <Card title="Board name"
            bordered={true}
            hoverable
            onClick={() => window.open("localhost:3000/board")}
            className="card-style">
            Board
        </Card>
        <Card title="Board name"
            bordered={true}
            className="card-style"
            onClick={() => console.log("Open details modal")}>

            Board
        </Card>
        <Card title="Board name"
            bordered={true}
            className="card-style">
            Board
        </Card>
        <Card title="Board name"
            bordered={true}
            className="card-style">
            Board
        </Card>
        <Card title="Board name"
            bordered={true}
            className="card-style">
            Board
        </Card>
        <Card title="Board name"
            bordered={true}
            className="card-style">
            Board
        </Card>
        <Card title="Board name"
            bordered={true}
            className="card-style">
            Board
        </Card>
        <Card title="Board name"
            bordered={true}
            className="card-style">
            Board
        </Card>
        <Card title="Board name"
            bordered={true}
            className="card-style">
            Board
        </Card>
        <Card title="Board name"
            bordered={true}
            className="card-style">
            Board
        </Card>
        <Card title="Board name"
            bordered={true}
            className="card-style">
            Board
        </Card>
    </>
]

const HomepageContent = () => {
    return (
        <div className="homepage-style">
            <div className="header-content-container">
                <h1>Nome cognome this is Your board</h1>
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

export default HomepageContent;