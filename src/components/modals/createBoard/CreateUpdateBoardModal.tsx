import { ReactElement } from 'react';
import { Modal } from 'antd';
import CreateBoardForm from '../../forms/createBoardForm/CreateBoardForm';
import "./CreateUpdateBoardModal.css"
import { ICreateUPdateBoardModal } from '../../../interfaces/components/modal/ICreateUpdateBoardModal';

const CreateUpdateBoardModal = ({ isModalOpen, handleCancel, setIsSpinning, isCreating, boardId }: ICreateUPdateBoardModal): ReactElement => {

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
            <CreateBoardForm handleCancel={handleCancel} setIsSpinning={setIsSpinning} isCreating={isCreating} />
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
          <CreateBoardForm handleCancel={handleCancel} setIsSpinning={setIsSpinning} isCreating={isCreating} boardId={boardId}/>
        </div>
      </Modal>
    )
  }
}


export default CreateUpdateBoardModal;