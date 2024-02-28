import { Content } from "antd/es/layout/layout";
import "./HomepageContent.css"
import { Card } from "antd";

const emptyCardArray: any[] = [<></>]

const cardArray = [
    <>
        <Card title="Task name" bordered={false} className="card-style">
            Card content
        </Card>
        <Card title="Task name" bordered={false} className="card-style">
            Card content
        </Card>
        <Card title="Task name" bordered={false} className="card-style">
            Card content
        </Card>
        <Card title="Task name" bordered={false} className="card-style">
            Card content
        </Card>

        <Card title="Task name" bordered={false} className="card-style">
            Card content
        </Card>
        <Card title="Task name" bordered={false} className="card-style">
            Card content
        </Card>
        <Card title="Task name" bordered={false} className="card-style">
            Card content
        </Card>
        <Card title="Task name" bordered={false} className="card-style">
            Card content
        </Card>
        <Card title="Task name" bordered={false} className="card-style">
            Card content
        </Card>
        <Card title="Task name" bordered={false} className="card-style">
            Card content
        </Card>
        <Card title="Task name" bordered={false} className="card-style">
            Card content
        </Card>
        <Card title="Task name" bordered={false} className="card-style">
            Card content
        </Card>
        <Card title="Task name" bordered={false} className="card-style">
            Card content
        </Card>
        <Card title="Task name" bordered={false} className="card-style">
            Card content
        </Card>
        <Card title="Task name" bordered={false} className="card-style">
            Card content
        </Card>
        <Card title="Task name" bordered={false} className="card-style">
            Card content
        </Card>
        <Card title="Task name" bordered={false} className="card-style">
            Card content
        </Card>
        <Card title="Task name" bordered={false} className="card-style">
            Card content
        </Card>
        <Card title="Task name" bordered={false} className="card-style">
            Card content
        </Card>
        <Card title="Task name" bordered={false} className="card-style">
            Card content
        </Card>

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