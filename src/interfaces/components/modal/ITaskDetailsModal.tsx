export interface ITaskDetailsModal{
    showTaskModal?: any 
    isTaskModalOpen?: boolean
    handleCancel?: any
    selectedTaskId?: number
    boardId: number
    laneId: number
    laneName: string
    reset: ()=>void
}