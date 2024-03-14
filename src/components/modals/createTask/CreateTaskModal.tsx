import { Modal } from "antd";
import { ReactElement } from "react";
import { ISuccessRegistrationModal } from "../../../interfaces/components/modal/ISuccessRegistrationModal";
import "./CreateTaskModal.css"
import CreateTaskForm from "../../forms/createTaskForm/CreateTaskForm";

const CreateTaskModal = ({ isModalOpen, handleCancel, selectedBoardId }: ISuccessRegistrationModal): ReactElement => {

  return (
    <>
      <Modal title="Create a new board"
        open={isModalOpen}
        onCancel={handleCancel}
        className='createBoardModalStyle'
        footer={<></>}
      >
        <CreateTaskForm handleCancel={handleCancel} isModalOpen={isModalOpen} selectedBoardId={selectedBoardId}/>
      </Modal>
    </>
  );
};


export default CreateTaskModal;