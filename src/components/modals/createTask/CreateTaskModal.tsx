import { Modal } from "antd";
import { ReactElement } from "react";
import { ISuccessRegistrationModal } from "../../../interfaces/components/modal/ISuccessRegistrationModal";
import CreateTaskForm from "../../forms/createTaskForm/CreateTaskForm";
import "./CreateTaskModal.css"

const CreateTaskModal = ({ isModalOpen, handleCancel, selectedLane, setSelectedBoardId}: ISuccessRegistrationModal): ReactElement => {
  return (
    <>
      <Modal title="Create a new board"
        open={isModalOpen}
        onCancel={handleCancel}
        className='createBoardModalStyle'
        footer={<></>}
      >
        <CreateTaskForm handleCancel={handleCancel} setSelectedBoardId={setSelectedBoardId} isModalOpen={isModalOpen} selectedLane={selectedLane} reset={()=>console.log("carlo")}/>
      </Modal>
    </>
  );
};


export default CreateTaskModal