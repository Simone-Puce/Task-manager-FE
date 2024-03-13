import { ReactElement, useEffect, useState } from "react";
import { ILaneComponent } from "../../../interfaces/components/contents/ILaneComponent";
import { Task } from "../../../interfaces/model/Task";
import { Card } from "antd";
import "./BoardpageContent.css"

const LaneComponent = ({ laneStatus, tasks }: ILaneComponent): ReactElement => {
    const [laneTasks, setLaneTasks] = useState<Task[]>([])

    useEffect(() => {
        const newLaneTasks = tasks?.filter((task) => (
            task.status?.toLowerCase() === laneStatus?.toLowerCase()
        ));

        setLaneTasks((prevLaneTasks) => {
            return [...prevLaneTasks, ...newLaneTasks!.filter(task => !prevLaneTasks.includes(task))];
        });
    }, [tasks, laneStatus]);

    return (
        <div className="general-task-div">
            <h1> {laneStatus} </h1>
            {laneTasks.map((task: Task) => (
                <Card title={task.taskName}
                    key={task.taskId}
                    bordered={true}
                    hoverable
                    onClick={() => console.log("error")}
                    className="card-style">
                    Board
                </Card>
            ))}
        </div>
    )
}

export default LaneComponent