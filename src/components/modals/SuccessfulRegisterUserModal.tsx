import React, { ReactElement, useState } from 'react';
import { Button, Modal } from 'antd';
import { ISuccessRegistrationModal } from '../../interfaces/components/modal/ISuccessRegistrationModal';
import "./SuccessfulRegisterUserModal.css"
import { Link, useNavigate } from 'react-router-dom';

const SuccessfulRegisterUserModal = ({ showModal, isModalOpen, handleOk, handleCancel }: ISuccessRegistrationModal): ReactElement => {

    const navigate = useNavigate()

  return (
    <>
      <Modal title="Register successfully"
        open={isModalOpen}
        onCancel={handleCancel}
        okText="Login Page"
        cancelText="New Account"
        className='succesRegistrationModalStyle'
        footer={
          <div className='footer-div'>
            <Button type="primary" className='login-button' onClick={() => navigate("/login")}>Login</Button>
            <Button type="link" className='newUser-button' onClick={handleCancel}>New User</Button>
          </div>
        }
      >
        <div className='succesRegistrationModalStyle'>
          You are now registered on this site
        </div>
      </Modal>
    </>
  );
};

export default SuccessfulRegisterUserModal;