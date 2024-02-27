import React, { ReactElement, useState } from 'react';
import { Button, Modal } from 'antd';
import { ISuccessRegistrationModal } from '../../interfaces/components/modal/ISuccessRegistrationModal';
import "./SuccessfulRegisterUserModal.css"

const SuccessfulRegisterUserModal = ({showModal, isModalOpen, handleOk, handleCancel}: ISuccessRegistrationModal): ReactElement => {

  return (
    <>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
       <div className='modalStyle'>
            CARLO
       </div>
      </Modal>
    </>
  );
};

export default SuccessfulRegisterUserModal;