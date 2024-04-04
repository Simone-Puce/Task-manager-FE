import { useState } from 'react'
import { uploadFile } from '../../../services/AttachmentService';
import Cookies from 'js-cookie';

const UploadFileForm = (taskId: any) => {
  const [file, setFile] = useState<File>()
  const token: string = Cookies.get("jwt-token")!

  const handleChange = (event: any) => {
    setFile(event.target.files[0])
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    const formData: FormData = new FormData();
    formData.append('file', file!)
    if (taskId) {
      uploadFile(formData, token, taskId)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Upload a file</h1>
      <div>
        <input type="file" onChange={handleChange} />
        <button type="submit">Upload</button>
      </div>
    </form>
  )
}

export default UploadFileForm;