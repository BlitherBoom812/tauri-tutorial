import {
  CodeOutlined,
  CopyOutlined,
  InfoCircleOutlined,
  MonitorOutlined,
} from '@ant-design/icons';
import { Button, Flex, Input, Tooltip, message } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { copyCodeLet } from '../helpers/myCopy';

const WebButton: React.FC<any> = (props: any) => {
  console.log(props);
  const [editing, setEditing] = useState(false);
  const decoded_action = decodeURIComponent(props.match.params.action);
  const [action, setAction] = useState(decoded_action);
  const decoded_name = decodeURIComponent(props.match.params.name);
  const [name, setName] = useState(decoded_name);
  const onActionClick = () => {
    console.log('acting: ', action);
    axios
      .post('http://localhost:12345/conv/button', {
        action: action,
      })
      .then(function (response) {
        console.log(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  console.log(props);

  const onEditClick = () => {
    setEditing(!editing);
    console.log('edit');
  };

  const onEditCodeChange = (val: any) => {
    console.log(val.target.value);
    setAction(val.target.value);
  };

  const onEditNameChange = (val: any) => {
    console.log(val.target.value);
    setName(val.target.value);
  };
  const onCopyClick = () => {
    // copy current url
    copyCodeLet(
      window.location.origin +
        '/button/' +
        encodeURIComponent(name) +
        '/' +
        encodeURIComponent(action),
        "100%",
        "60"
    );
    message.success('Copied!');
  };

  return (
    <div>
      <Flex vertical={false}>
        {editing ? (
          <Flex vertical={false} style={{ width: '100%' }}>
            <Input
              prefix={<CodeOutlined className="site-form-item-icon" />}
              onChange={onEditCodeChange}
              defaultValue={action}
              style={{ width: '50%' }}
            ></Input>
            <Input
              prefix={<InfoCircleOutlined className="site-form-item-icon" />}
              onChange={onEditNameChange}
              defaultValue={name}
              style={{ width: '50%' }}
            ></Input>
            <Tooltip title="Copy URL">
              <Button
                shape="circle"
                icon={<CopyOutlined />}
                onClick={onCopyClick}
              ></Button>
            </Tooltip>
          </Flex>
        ) : (
          <Button onClick={onActionClick} style={{ width: '100%' }}>
            {name}
          </Button>
        )}
        <Button
          shape="circle"
          icon={<MonitorOutlined />}
          onClick={onEditClick}
        ></Button>
      </Flex>
    </div>
  );
};

export { WebButton };
