import './App.css';
import { Flex, Space } from 'antd';
import { CurriculumBar } from './components/curriculum';
import { CurriculumList } from './data/user_data';
import Draggable from 'react-draggable';

function App() {
  return (
    <div className="container">
      {/* now, it is the time to build antd components */}
      <Flex vertical={false} align="center" justify="center">
        <Space>
          {CurriculumList.map((curriculum_dict, i) => (
            <div key={i}>
              <Draggable>
                <div className="drag-handler">
                  <CurriculumBar curriculum_info={curriculum_dict} />
                </div>
              </Draggable>
            </div>
          ))}
        </Space>
      </Flex>
    </div>
  );
}

export default App;

// // 下一步
// // 模块化
// // 添加快捷键
// // 变成虚拟桌面
// // 自动拉取最新的 homework，课件，ppt
// // 添加折叠菜单（ok)

// import Draggable from 'react-draggable';
// import './App.css';

// const Box = () => {
//   return (
//     <div className="box">
//       <div className="drag-handler">拖这里可以</div>
//       <div>box 正文，拖这里拖不动</div>
//     </div>
//   );
// };
// function App() {
//   return (
//     <div className="App">
//       <Draggable>
//       <div>
//         <Box></Box>
//       </div>
//       </Draggable>
//     </div>
//   );
// }

// export default App;
