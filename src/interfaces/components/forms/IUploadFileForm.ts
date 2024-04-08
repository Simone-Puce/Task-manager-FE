export interface IUploadFileForm {
    taskId: number,
    resetTaskDetails: () => void
    isEditor: boolean
    isUserAssociatedWithTask?: boolean
}