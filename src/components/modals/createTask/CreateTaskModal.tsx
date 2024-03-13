import { Modal } from "antd";
import { ReactElement } from "react";
import { ISuccessRegistrationModal } from "../../../interfaces/components/modal/ISuccessRegistrationModal";
import "./CreateTaskModal.css"
import CreateTaskForm from "../../forms/createTaskForm/CreateTaskForm";

const CreateTaskModal = ({ isModalOpen, handleCancel }: ISuccessRegistrationModal): ReactElement => {

  return (
    <>
      <Modal title="Create a new board"
        open={isModalOpen}
        onCancel={handleCancel}
        className='createBoardModalStyle'
        footer={<></>}
      >
        <CreateTaskForm/>
      </Modal>
    </>
  );
};


export default CreateTaskModal;