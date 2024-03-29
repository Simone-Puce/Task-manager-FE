import React, { useState } from 'react';
import { Upload, Button, Layout } from 'antd';

const UploadButton = () => {
  const [fileList, setFileList] = useState<any[]>([]);

  const onChange = (fileList: any) => {
    setFileList(fileList);
    console.log(fileList)
  }

  const onRemove = (file: File) => {
    const index = fileList.indexOf(file);
    if (index > -1) {
      fileList.splice(index, 1)
      setFileList(fileList)
    }
  }

  return (
    <Layout>
      <Upload.Dragger
        name="file"
        fileList={fileList}
        onChange={onChange}
        //onRemove={onRemove}
        beforeUpload={() => false}
        maxCount={1}
      >
        <Button>Upload File</Button>
      </Upload.Dragger>
    </Layout>
  );
};

export default UploadButton;