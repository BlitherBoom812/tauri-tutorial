import React, { useState } from 'react';
import { Button, Flex, Form, Input, Tooltip, message } from 'antd';
import {
  CaretRightOutlined,
  CopyOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { Typography } from 'antd';
import { copyCodeLet } from '../helpers/myCopy';
import { replaceDot, resumeDot } from '../helpers/myReplace';
const { Paragraph } = Typography;

const { TextArea } = Input;

type FieldType = {
  message?: string;
};

const CodeBlock: React.FC<any> = (props: any) => {
  const [content, setContent] = useState(resumeDot(props.match.params.content));
  const [resultText, setResultText] = useState('');

  const onFinish = (values: FieldType) => {
    setResultText('Play...');
    // send post request to backend
    axios
      .post('http://localhost:12345/conv/chat', {
        message: values.message,
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

  const onCopyClick = () => {
    copyCodeLet(
      window.location.origin + '/codeBlock/' + encodeURIComponent(replaceDot(content)),
      "100%",
      "300"
    );
    message.success('Copied!');
  };

  return (
    <div style={{ width: '100%' }}>
      <Form
        layout="inline"
        name="basic"
        initialValues={{ message: content }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ width: '100%' }}
        onValuesChange={(values) => {
          setContent(values.message);
        }}
      >
        <Form.Item>
          <Flex vertical={true} gap="middle">
            <Tooltip title="play">
              <Button
                htmlType="submit"
                shape="circle"
                icon={<CaretRightOutlined />}
                size="middle"
              ></Button>
            </Tooltip>
            <Tooltip title="Copy URL">
              <Button
                shape="circle"
                icon={<CopyOutlined />}
                onClick={onCopyClick}
              ></Button>
            </Tooltip>
          </Flex>
        </Form.Item>

        <Form.Item<FieldType>
          name="message"
          style={{ width: '80%' }}
          rules={[{ required: true, message: 'Please input your message!' }]}
        >
          <TextArea rows={4} />
        </Form.Item>
      </Form>

      <Paragraph>
        <SmileOutlined />
        <pre style={{ textAlign: 'left' }}>{resultText}</pre>
      </Paragraph>
    </div>
  );
};

export { CodeBlock };
