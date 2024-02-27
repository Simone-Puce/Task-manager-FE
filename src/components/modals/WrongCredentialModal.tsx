import { Button, Modal, Space } from 'antd';


const config = {
  title: 'Wrong credential, please check again',
  content: (
    <>
      <p>CARLO</p>
    </>
  ),
};

const WrongCredentialModal = () => {
  const [modal] = Modal.useModal();

  return (

    <Space>

      <Button
        onClick={async () => {
          modal.error(config);
        }}
      >
        Error
      </Button>

    </Space>

  );
};

export default WrongCredentialModal;