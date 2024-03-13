import { Task } from "../../model/Task"

export interface ILaneComponent {
    laneStatus?: string
    tasks?: Task[]
}