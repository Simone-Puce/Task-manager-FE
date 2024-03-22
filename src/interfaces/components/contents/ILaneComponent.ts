import { Task } from "../../model/Task"

export interface ILaneComponent {
    boardId?: number,
    laneId?: number,
    laneName?: string
    boardName?:  string
    tasks?: Task[],
    active?: boolean,
    isEditor?: boolean,
    reset: ()=> void
}