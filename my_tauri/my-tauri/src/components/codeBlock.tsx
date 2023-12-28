import React, { useState } from 'react';
import { Button, Input, Result, Tooltip } from 'antd';
import { CaretRightOutlined, SmileOutlined } from '@ant-design/icons';
import axios from 'axios';

const { TextArea } = Input;

const CodeBlock: React.FC = () => {
  const [resultText, setResultText] = useState('');
  return (
    <>
      <Tooltip title="play">
        <Button
          shape="circle"
          icon={<CaretRightOutlined />}
          size="middle"
          onClick={() => {
            setResultText('Play...');
            // send post request to backend
            axios
              .post('http://localhost:12345/conv/test', {
                firstName: 'Fred',
                lastName: 'Flintstone',
              })
              .then(function (response) {
                console.log(response.data.message);
                setResultText(response.data.message);
              })
              .catch(function (error) {
                console.log(error);
                setResultText(error.message);
              });
              

          }}
        />
      </Tooltip>
      <br></br>
      <TextArea rows={4} />
      <Result
        icon={<SmileOutlined />}
        title={resultText}
      />
    </>
  );
};

export { CodeBlock };
