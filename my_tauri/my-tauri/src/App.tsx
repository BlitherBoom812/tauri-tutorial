import './App.css';
import { CodeBlock } from './components/codeBlock';
import { CodeExe } from './components/codeExecuter';

import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { WebButton } from './components/webButton';

function App() {
  return (
    <div className="container">
      {/* now, it is the time to build antd components */}
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={CodeBlock}>
          </Route>
          <Route path="/codeBlock/:content" component={CodeBlock}>
          </Route>
          <Route path="/codeExe/:content" component={CodeExe}>
          </Route>
          <Route path="/button/:name/:action" component={WebButton}>
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
