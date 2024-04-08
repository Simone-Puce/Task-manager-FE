import { Modal } from "antd"
import { ReactElement } from "react"
import { ICreateLaneModal } from "../../../interfaces/components/modal/ICreateLaneModal"
import CreateUpdateLaneForm from "../../forms/createUpdateLaneForm/CreateUpdateLaneForm"

const CreateLaneModal = (props: ICreateLaneModal): ReactElement => {
    const { isLaneModalOpen, handleCancel, selectedBoardId, reset } = props
    return (
        <Modal title="LANE NAME"
            open={isLaneModalOpen}
            onCancel={handleCancel}
            className="newLaneModalStyle"
            footer={<></>}
        >
            <CreateUpdateLaneForm
                handleCancel={handleCancel}
                selectedBoardId={selectedBoardId}
                reset={reset}
            />
        </Modal>
    )
}

export default CreateLaneModal