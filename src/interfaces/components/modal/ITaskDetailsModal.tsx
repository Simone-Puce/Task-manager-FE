export interface ITaskDetailsModal{
    showTaskModal?: any 
    isTaskModalOpen?: boolean
    handleCancel?: any
    deleteTask: ()=>void
    selectedTaskId?: number
    boardId: number
    laneId: number
    laneName: string
    isEditor: boolean
    reset: ()=>void
}