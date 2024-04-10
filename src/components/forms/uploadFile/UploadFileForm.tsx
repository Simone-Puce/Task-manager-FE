import { Form, Upload, Button, Typography, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import { uploadFile } from '../../../services/AttachmentService';
import { IUploadFileForm } from '../../../interfaces/components/forms/IUploadFileForm';

const { Title } = Typography;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const UploadFileForm = ({ taskId, resetTaskDetails, isEditor, isUserAssociatedWithTask }: IUploadFileForm) => {
  const [form] = Form.useForm()
  const token: string = Cookies.get("jwt-token")!

 const refusedUploadNotification = () => {
    notification.open({
      type: "warning",
      message: "Can't upload because you are either not associated to this task or the file extention is not supported",
      duration: 3
    })
  }

  const uploadSuccessfull = () => {
    notification.open({
      type: "success",
      message: "File uploaded successfully",
      duration: 3
    })
  }

  const maxSizeErrorNotification = () => {
    notification.open({
      type: "error",
      message: `File size should not exceed ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
      duration: 3
    })
  }

  const handleSubmit = async () => {
    const formValues = form.getFieldsValue()
    const formData: FormData = new FormData()
    const formDataValue = formValues.file.fileList[0]
    formData.append('file', formDataValue.originFileObj)
    if (taskId) {
      if (isEditor || isUserAssociatedWithTask) {
        const uploadResponse = await uploadFile(formData, token, taskId)
        console.log(uploadResponse.data)
        if (uploadResponse.data.success === true) {
          uploadSuccessfull()
          resetTaskDetails()
          form.resetFields()
        } else {
          refusedUploadNotification()
          form.resetFields()
        }
      } else {
        refusedUploadNotification()
        resetTaskDetails()
        form.resetFields()
      }
    }
  }

  const beforeUpload = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      maxSizeErrorNotification()
      form.resetFields()
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