import { ReactElement } from 'react';
import { Button, Form, Input, Modal, Radio } from 'antd';
import { ISuccessRegistrationModal } from '../../../interfaces/components/modal/ISuccessRegistrationModal';
import "./CreateBoardModal.css"


const CreateBoardModal = ({ isModalOpen, handleCancel }: ISuccessRegistrationModal): ReactElement => {


  return (
    <>
      <Modal title="Create a new board"
        open={isModalOpen}
        onCancel={handleCancel}
        className='createBoardModalStyle'
        footer={
          <div className='footer-div'>
            <Button type="primary" className='create-Button' onClick={handleCancel}>Create Board</Button>
            <Button type="link" className='cancel-button' onClick={handleCancel}>Cancel</Button>
          </div>
        }
      >
        <div className='createBoardModalStyle'>
          <Form layout="vertical">
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: 'Please input the title of collection!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input type="textarea" />
            </Form.Item>
            <Form.Item name="modifier" className="collection-create-form_last-form-item">
              <Radio.Group>
                <Radio value="public">Public</Radio>
                <Radio value="private">Private</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};


export default CreateBoardModal;