import { Modal } from "antd"
import { ReactElement } from "react"
import CreateTaskForm from "../../../forms/createTaskForm/CreateTaskForm"
import "./CreateTaskModal.css"
import { ICreateUpdateTaskModal } from "../../../../interfaces/components/modal/ICreateUpdateTaskModal"

const CreateTaskModal = ({ isModalOpen, handleCancel, selectedLane, setSelectedBoardId, reset}: ICreateUpdateTaskModal): ReactElement => {
  return (
    <>
      <Modal title="Create a new task"
        open={isModalOpen}
        onCancel={handleCancel}
        className='createBoardModalStyle'
        footer={<></>}
      >
        <CreateTaskForm handleCancel={handleCancel} setSelectedBoardId={setSelectedBoardId} isModalOpen={isModalOpen} selectedLane={selectedLane} reset={reset}/>
      </Modal>
    </>
  );
};


export default CreateTaskModal;