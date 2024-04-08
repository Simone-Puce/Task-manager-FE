import { Task } from "./Task";

export interface Lane {
    laneId?: number,
    laneName?: string,
    boardId?: number,
    boardName?: string,
    tasks?: Task[]
}