import { Modal } from "antd";
import { ReactElement } from "react";
import { ISuccessRegistrationModal } from "../../../interfaces/components/modal/ISuccessRegistrationModal";
import "./CreateTaskModal.css"
import CreateTaskForm from "../../forms/createTaskForm/CreateTaskForm";

const CreateTaskModal = ({ isModalOpen, handleCancel, selectedLane, setSelectedBoardId}: ISuccessRegistrationModal): ReactElement => {
  return (
    <>
      <Modal title="Create a new board"
        open={isModalOpen}
        onCancel={handleCancel}
        className='createBoardModalStyle'
        footer={<></>}
      >
        <CreateTaskForm handleCancel={handleCancel} setSelectedBoardId={setSelectedBoardId} isModalOpen={isModalOpen} selectedLane={selectedLane}/>
      </Modal>
    </>
  );
};


export default CreateTaskModal;