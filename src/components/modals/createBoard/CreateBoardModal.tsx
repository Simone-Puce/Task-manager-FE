import { ReactElement } from 'react';
import { Modal } from 'antd';
import { ISuccessRegistrationModal } from '../../../interfaces/components/modal/ISuccessRegistrationModal';
import CreateBoardForm from '../../forms/createBoardForm/CreateBoardForm';
import "./CreateBoardModal.css"

const CreateBoardModal = ({ isModalOpen, handleCancel, setIsSpinning }: ISuccessRegistrationModal): ReactElement => {

  return (
    <>
      <Modal title="Create a new board"
        open={isModalOpen}
        onCancel={handleCancel}
        className='createBoardModalStyle'
        footer={<></>}
      >
        <div className='createBoardModalStyle'>
          <CreateBoardForm handleCancel={handleCancel} setIsSpinning={setIsSpinning}/>
        </div>
      </Modal>
    </>
  );
};


export default CreateBoardModal;