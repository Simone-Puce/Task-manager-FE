import { ReactElement } from 'react';
import { Button, Form, Input, Modal, Select, SelectProps } from 'antd';
import { ISuccessRegistrationModal } from '../../../interfaces/components/modal/ISuccessRegistrationModal';
import "./CreateBoardModal.css"


const CreateBoardModal = ({ isModalOpen, handleCancel }: ISuccessRegistrationModal): ReactElement => {

  const selectOptions: SelectProps['options'] =
    [
      {
        label: "To do",
        value: "To do"
      },
      {
        label: "Work in progress",
        value: "Work in progress"
      },
      {
        label: "Review",
        value: "Review"
      },
      {
        label: "Done",
        value: "Done"
      }
    ]

    const handleChange = (value: string[]) => {
      console.log(value);
    };

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
              label="Insert the name of the board"
              rules={[{ required: true, message: 'Please input the title of the board' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Select
                mode="multiple"
                allowClear
                placeholder="Please select"
                onChange={handleChange}
                options={selectOptions}
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};


export default CreateBoardModal;