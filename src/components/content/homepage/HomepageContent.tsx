import { Content } from "antd/es/layout/layout";
import "./HomepageContent.css"
import { Card } from "antd";

const cardArray = [
    <>
        <div className="single-card-holder">
            <Card title="Task name" bordered={false}>
                Card content
            </Card>
        </div>
        <div className="single-card-holder">
            <Card title="Task name" bordered={false}>
                Card content
            </Card>
        </div>   <div className="single-card-holder">
            <Card title="Task name" bordered={false}>
                Card content
            </Card>
        </div>   <div className="single-card-holder">
            <Card title="Task name" bordered={false}>
                Card content
            </Card>
        </div>   <div className="single-card-holder">
            <Card title="Task name" bordered={false}>
                Card content
            </Card>
        </div>   <div className="single-card-holder">
            <Card title="Task name" bordered={false}>
                Card content
            </Card>
        </div>   <div className="single-card-holder">
            <Card title="Task name" bordered={false}>
                Card content
            </Card>
        </div>   <div className="single-card-holder">
            <Card title="Task name" bordered={false}>
                Card content
            </Card>
        </div>   <div className="single-card-holder">
            <Card title="Task name" bordered={false}>
                Card content
            </Card>
        </div>
    </>
]



const HomepageContent = () => {
    return (
        <Content className="homepage-content-style">
            <div className="welcome-div">
                <h1> Welcome nome cognome </h1>
            </div>
            <div className="homepage-card-wrapper">
                {cardArray.map((element) => (
                    <div className="card-holder">
                        {element}
                    </div>
                ))}
            </div>
        </Content>
    )
}

export default HomepageContent;