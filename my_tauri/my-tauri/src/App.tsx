import './App.css';
import { Button, Flex } from 'antd';
import { CurriculumBar } from './components/curriculum';
import { CurriculumList } from './data/user_data';

function App() {
  // useEffect(() => {
  //   // ✅  初始化，加载 wasm 文件
  //   init();
  // }, [])

  return (
    <div className="container">
      {/* now, it is the time to build antd components */}
      <Flex vertical={false} align="center" justify="center">
        {CurriculumList.map((curriculum_dict) => (
          <CurriculumBar curriculum_info={curriculum_dict} />
        ))}
      </Flex>
    </div>
  );
}

export default App;

// 下一步
// 模块化
// 添加快捷键
// 变成虚拟桌面
// 自动拉取最新的 homework，课件，ppt
