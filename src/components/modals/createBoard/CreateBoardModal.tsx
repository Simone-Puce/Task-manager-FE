import { ReactElement } from 'react';
import { Modal } from 'antd';
import { ISuccessRegistrationModal } from '../../../interfaces/components/modal/ISuccessRegistrationModal';
import CreateBoardForm from '../../forms/createBoardForm/CreateBoardForm';
import "./CreateBoardModal.css"

const CreateBoardModal = ({ isModalOpen, handleCancel }: ISuccessRegistrationModal): ReactElement => {

  return (
    <>
      <Modal title="Create a new board"
        open={isModalOpen}
        className='createBoardModalStyle'
        footer={<></>}
      >
        <div className='createBoardModalStyle'>
          <CreateBoardForm handleCancel={handleCancel}/>
        </div>
      </Modal>
    </>
  );
};


export default CreateBoardModal;