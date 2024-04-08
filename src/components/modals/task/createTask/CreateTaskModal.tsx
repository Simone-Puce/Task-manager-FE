import { Modal } from "antd"
import { ReactElement } from "react"
import CreateTaskForm from "../../../forms/createTaskForm/CreateTaskForm"
import { ICreateUpdateTaskModal } from "../../../../interfaces/components/modal/ICreateUpdateTaskModal"
import "./CreateTaskModal.css"

const CreateTaskModal = ({ isModalOpen, handleCancel, selectedLane, setSelectedBoardId, reset, createTaskHandler }: ICreateUpdateTaskModal): ReactElement => {
  return (
    <>
      <Modal title="Create a new task"
        open={isModalOpen}
        onCancel={handleCancel}
        className='createBoardModalStyle'
        footer={<></>}
      >
        <CreateTaskForm
          handleCancel={handleCancel}
          setSelectedBoardId={setSelectedBoardId}
          isModalOpen={isModalOpen}
          selectedLane={selectedLane}
          createTaskHandler={createTaskHandler!}
          reset={reset}
        />
      </Modal>
    </>
  )
}


export default CreateTaskModal;