export interface Board {
    id: number
    boardName?: string
    lanes?: any[]
    tasks?: []
    users?: []
    createdBy?: string
    modifiedBy?: string
    createdDate?: Date
    modifiedDate?: Date
}