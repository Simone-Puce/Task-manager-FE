import { Modal } from "antd"
import Cookies from "js-cookie"
import { ReactElement } from "react"
import { ICreateLaneModal } from "../../../interfaces/components/modal/ICreateLaneModal"
import CreateUpdateLaneForm from "../../forms/createUpdateLaneForm/CreateUpdateLaneForm"

const CreateLaneModal = (props: ICreateLaneModal): ReactElement => {
    const { showLaneModal, isLaneModalOpen, handleCancel, selectedBoardId } = props
    return (
        <Modal title="LANE NAME"
            open={props.isLaneModalOpen}
            onCancel={props.handleCancel}
            className="newLaneModalStyle"
            footer={<></>}
        >
            <CreateUpdateLaneForm
                handleCancel={handleCancel}
                selectedBoardId={selectedBoardId}
            />
        </Modal>
    )
}

export default CreateLaneModal