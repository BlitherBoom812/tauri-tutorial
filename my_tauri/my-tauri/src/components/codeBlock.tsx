import React, { useState } from 'react';
import { Button, Form, Input, Result, Tooltip, message } from 'antd';
import { CaretRightOutlined, SmileOutlined } from '@ant-design/icons';
import axios from 'axios';

const { TextArea } = Input;

type FieldType = {
  message?: string;
};

const CodeBlock: React.FC = () => {
  const [resultText, setResultText] = useState('');

  const onFinish = (values: FieldType) => {
    setResultText('Play...');
    // send post request to backend
    axios
      .post('http://localhost:12345/conv/chat', {
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
        initialValues={{ remember: true }}
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
              icon={<CaretRightOutlined />}
              size="middle"
            ></Button>
          </Tooltip>
        </Form.Item>

        <Form.Item<FieldType>
          name="message"
          style={{ width: '80%' }}
          rules={[{ required: true, message: 'Please input your message!' }]}
        >
          <TextArea rows={4} />
        </Form.Item>
      </Form>
      <Result icon={<SmileOutlined />} title={resultText}/>
    </div>
  );
};

export { CodeBlock };
