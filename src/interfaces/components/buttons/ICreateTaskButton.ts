export interface ICreateTaskButton {
    showModal: () => void
    laneId?: number
    reset: () => void
    updateLaneHandler: () => void
    isColumnNameInUpdate?: boolean
    updateLaneName: () => void
    isEditor?: boolean
}