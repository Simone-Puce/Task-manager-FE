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
        <div className="homepage-content-style">
            <Content className="content-width">
                {cardArray.map((element) => (
                    <div className="homepage-card-container">
                        {element}
                    </div>
                ))}
            </Content>
        </div>
    )
}

export default HomepageContent;