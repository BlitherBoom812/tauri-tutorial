import { Button, Collapse, CollapseProps, Space } from 'antd';
import React, { useState } from 'react';
import { handle_action } from '../actions/cmd_run';

type ActionInfo = {
  name: string;
  action: string;
  args: {
    program: string;
    args: string[];
  };
};

type CurriculumInfo = {
  name: string;
  action_list: ActionInfo[];
};

type CurriculumBarProps = {
  curriculum_info: CurriculumInfo;
  // children: React.ReactNode;
};

const CurriculumBar: React.FC<CurriculumBarProps> = ({ curriculum_info }) => {
  const defalut_key = '1';
  const [entered, useEntered] = useState(false);
  const content = (
    <div>
      {/* <Flex vertical={true} align="center" justify="center"> */}
        <Space direction='vertical'>
          {curriculum_info.action_list.map((action_info, i) => {
            return (
              <Button
                type="primary"
                onClick={() => handle_action(action_info)}
                shape="round"
                key={i}
              >
                {action_info.name}
              </Button>
            );
          })}
        </Space>
      {/* </Flex> */}
    </div>
  );

  const items: CollapseProps['items'] = [
    {
      key: defalut_key,
      label: curriculum_info.name,
      children: content,
      showArrow: false,
    },
  ];
  return (
    <div
      onMouseEnter={() => {
        useEntered(true);
      }}
      onMouseLeave={() => {
        useEntered(false);
      }}
    >
      <Collapse items={items} activeKey={entered ? [defalut_key] : []} style={{color: "#eeccff"}}/>
    </div>
  );
};

export { CurriculumBar };
export type { ActionInfo, CurriculumInfo };
