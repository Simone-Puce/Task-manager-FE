import { Form, Upload, Button, Typography, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import { uploadFile } from '../../../services/AttachmentService';

const { Title } = Typography;
const MAX_FILE_SIZE = 5 * 1024 * 1024; 

const UploadFileForm = (taskId: any) => {
  const [form] = Form.useForm()
  const token: string = Cookies.get("jwt-token")!

  const handleSubmit = () => {
    const formValues = form.getFieldsValue()
    const formData: FormData = new FormData()
    const formDataValue = formValues.file.fileList[0]
    formData.append('file', formDataValue.originFileObj)
    if (taskId) {
      uploadFile(formData, token, taskId)
      form.resetFields()
    }
  }

  const beforeUpload = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      message.error(`File size should not exceed ${MAX_FILE_SIZE / 1024 / 1024}MB.`)
      return false
    }
    return true
  }

  return (
    <Form
      name="upload-form"
      layout="vertical"
      onFinish={handleSubmit}
      form={form}
    >
      <Title level={3}>Upload a file</Title>
      <Form.Item
        name="file"
        rules={[
          {
            required: true,
            message: 'Please select a file to upload!',
          },
        ]}
      >
        <Upload
          name="file"
          maxCount={1}
          beforeUpload={beforeUpload}
        >
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Upload
        </Button>
      </Form.Item>
    </Form>
  )
}

export default UploadFileForm;