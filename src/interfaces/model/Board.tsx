export interface Board {
    boardCode: string
    boardName: string
    lanes: any[]
    tasks: []
    users: []
    createdBy: string
    modifiedBy: string
    createdDate: Date
    modifiedDate: Date
}