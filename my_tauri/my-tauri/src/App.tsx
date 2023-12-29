import { Button } from 'antd';
import './App.css';
import { CodeBlock } from './components/codeBlock';
import { CodeExe } from './components/code_executer';

import {
  Switch,
  Route,
  BrowserRouter,
} from 'react-router-dom';

function App() {
  return (
    <div className="container">
      {/* now, it is the time to build antd components */}
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <CodeBlock></CodeBlock>
          </Route>
          <Route path="/codeBlock">
            <CodeBlock></CodeBlock>
          </Route>
          <Route path="/codeExe">
            <CodeExe></CodeExe>
          </Route>
          <Route path="/button">
            <Button></Button>
          </Route>
        </Switch>
      </BrowserRouter>
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
