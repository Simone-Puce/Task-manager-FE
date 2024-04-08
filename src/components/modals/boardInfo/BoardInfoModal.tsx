import { ReactElement } from "react";
import { ISuccessRegistrationModal } from "../../../interfaces/components/modal/ISuccessRegistrationModal";
import { Modal } from "antd";
import "./BoardInfoModal.css"

const BoardInfoModal = (props:  ISuccessRegistrationModal): ReactElement => {
    const { handleCancel, isModalOpen, modifiedBy, modifiedDate, boardName} = props
    return (
        <>
            <Modal title={boardName}
                open={isModalOpen}
                onCancel={handleCancel}
                className='infoBoardModalStyle'
                footer={<></>}
            >
                <div>
                    Last update of the board from {modifiedBy} in date {modifiedDate?.toString()}
                </div>
            </Modal>
        </>
    );
};


export default BoardInfoModal;