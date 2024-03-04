import { Card } from "antd"
import "./BoardpageContent.css"

const cardArray = [
    <>
        <Card title="Board name"
            bordered={true}
            hoverable
            onClick={() => console.log("carlovitto")}
            className="card-style">
            Board
        </Card>
        <Card title="Board name"
            bordered={true}
            hoverable
            onClick={() => console.log("carlovitto")}
            className="card-style">
            Board
        </Card>
        <Card title="Board name"
            bordered={true}
            hoverable
            onClick={() => console.log("carlovitto")}
            className="card-style">
            Board
        </Card>
        <Card title="Board name"
            bordered={true}
            hoverable
            onClick={() => console.log("carlovitto")}
            className="card-style">
            Board
        </Card>
        <Card title="Board name"
            bordered={true}
            hoverable
            onClick={() => console.log("carlovitto")}
            className="card-style">
            Board
        </Card>
        <Card title="Board name"
            bordered={true}
            hoverable
            onClick={() => console.log("carlovitto")}
            className="card-style">
            Board
        </Card>
        <Card title="Board name"
            bordered={true}
            hoverable
            onClick={() => console.log("carlovitto")}
            className="card-style">
            Board
        </Card>
        <Card title="Board name"
            bordered={true}
            hoverable
            onClick={() => console.log("carlovitto")}
            className="card-style">
            Board
        </Card>
        <Card title="Board name"
            bordered={true}
            hoverable
            onClick={() => console.log("carlovitto")}
            className="card-style">
            Board
        </Card>

    </>
]

const BoardpageContent = () => {
    return (
        <div className="task-content-style">
            <div className="general-task-div">
                <h1>TODO</h1>
                {cardArray.map((element) => (
                    element
                ))}
            </div>
            <div className="general-task-div">
                <h1>WIP</h1>
                {cardArray.map((element) => (
                    element
                ))}
            </div>
            <div className="general-task-div">
                <h1>REVIEW</h1>
                {cardArray.map((element) => (
                    element
                ))}
            </div>
            <div className="general-task-div">
                <h1>DONE</h1>
                {cardArray.map((element) => (
                    element
                ))}
            </div>
        </div>
    )
}

export default BoardpageContent