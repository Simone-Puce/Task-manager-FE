import { ReactElement } from "react";
import { ISuccessRegistrationModal } from "../../../interfaces/components/modal/ISuccessRegistrationModal";
import { Modal } from "antd";
import "./BoardInfoModal.css"

const BoardInfoModal = (props:  ISuccessRegistrationModal): ReactElement => {
    const { handleCancel, isModalOpen, modifiedBy, modifiedDate, boardName} = props
    return (
        <>
            <Modal title={boardName?.toUpperCase()}
                open={isModalOpen}
                onCancel={handleCancel}
                className='infoBoardModalStyle'
                footer={<></>}
            >
                <div>
                    <h4>Last update of the board from</h4> {modifiedBy}
                    <h4>in date</h4> {modifiedDate?.toString()}
                </div>
            </Modal>
        </>
    );
};


export default BoardInfoModal;