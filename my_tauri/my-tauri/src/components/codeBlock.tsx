import React from 'react';
import { Button, Input, Tooltip } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const CodeBlock: React.FC = () => (
  <>
    <Tooltip title="play">
      <Button shape="circle" icon={<CaretRightOutlined />} size='middle'/>
    </Tooltip>
    <br></br>
    <TextArea rows={4} />
  </>
);

export { CodeBlock };
