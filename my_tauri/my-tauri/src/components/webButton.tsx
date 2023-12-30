import { CodeOutlined, CopyOutlined, MonitorOutlined } from '@ant-design/icons';
import { Button, Flex, Input, Tooltip, message } from 'antd';
import axios from 'axios';
import { useState } from 'react';

const WebButton: React.FC = (props: any) => {
  const [editing, setEditing] = useState(false);
  const decoded_action = decodeURIComponent(props.match.params.action);
  const [action, setAction] = useState(decoded_action);
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

  const onEditChange = (val: any) => {
    console.log(val.target.value);
    setAction(val.target.value);
    props.match.params.action = val.target.value;
  };
  const onCopyClick = () => {
    console.log('copy');
    // copy current url
    navigator.clipboard.writeText(window.location.origin + '/button/' + props.match.params.name +  '/' + encodeURIComponent(action));
    message.success('Copied!');
  };

  return (
    <div>
      <Flex vertical={false}>
        {editing ? (
          <Flex vertical={false} style={{ width: '100%' }}>
            <Input
              prefix={<CodeOutlined className="site-form-item-icon" />}
              onChange={onEditChange}
              defaultValue={action}
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
            {props.match.params.name}
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
