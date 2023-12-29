import React, { useState } from 'react';
import { Button, Form, Tooltip } from 'antd';
import { CodeOutlined } from '@ant-design/icons';
import axios from 'axios';
import CodeEditor from './code_editor';

type FieldType = {
  message?: string;
};

const CodeExe: React.FC = () => {
  const [resultText, setResultText] = useState('');

  const onFinish = (values: FieldType) => {
    setResultText('Play...');
    // send post request to backend
    axios
      .post('http://localhost:12345/conv/execution', {
        message: values.message
      })
      .then(function (response) {
        console.log(response.data.message);
        setResultText(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
        setResultText(error.message);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <div style={{ width: '100%' }}>
      <Form
        layout='inline'
        name="basic"
        initialValues={{ message: 'print("hello, notebook!")' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ width: '100%' }}
      >
        <Form.Item>
          <Tooltip title="play">
            <Button
              htmlType="submit"
              shape="circle"
              icon={<CodeOutlined />}
              size="middle"
            ></Button>
          </Tooltip>
        </Form.Item>

        <Form.Item<FieldType>
          name="message"
          style={{ width: '80%' }}
          rules={[{ required: true, message: 'Please input your message!' }]}
        >
          <CodeEditor/>
        </Form.Item>
      </Form>
      <p><CodeOutlined />{resultText}</p>
    </div>
  );
};

export { CodeExe };
