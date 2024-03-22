import { ReactElement } from 'react';
import { Modal } from 'antd';
import CreateBoardForm from '../../forms/createBoardForm/CreateBoardForm';
import "./CreateUpdateBoardModal.css"
import { ICreateUPdateBoardModal } from '../../../interfaces/components/modal/ICreateUpdateBoardModal';

const CreateUpdateBoardModal = ({ isModalOpen, handleCancel, isCreating, boardId, showModal }: ICreateUPdateBoardModal): ReactElement => {

  if (isCreating) {
    return (
      <>
        <Modal title="Create a new board"
          open={isModalOpen}
          onCancel={handleCancel}
          className='createBoardModalStyle'
          footer={<></>}
        >
          <div className='createBoardModalStyle'>
            <CreateBoardForm handleCancel={handleCancel} isCreating={isCreating} showModal={showModal} />
          </div>
        </Modal>
      </>
    )
  } else {
    return (
      <Modal title="Update the board"
        open={isModalOpen}
        onCancel={handleCancel}
        className='createBoardModalStyle'
        footer={<></>}
      >
        <div className='createBoardModalStyle'>
          <CreateBoardForm handleCancel={handleCancel} isCreating={isCreating} boardId={boardId} showModal={showModal}/>
        </div>
      </Modal>
    )
  }
}


export default CreateUpdateBoardModal;