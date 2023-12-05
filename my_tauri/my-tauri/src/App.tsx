import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { Button, Flex } from 'antd';

function App() {



  // useEffect(() => {
  //   // ✅  初始化，加载 wasm 文件
  //   init();
  // }, [])

  // var def
  const button_list = [
    "下载",
    "量筒",
    "通网",
    '随机过程',
    "DSP",
    '计网',
    '启动',
  ]

  async function open_file(name: string) {
    const content = await invoke("handle_action", {name: name});
    // 注: `/etc/hosts` 为自定义路径，而非基本目录之一
    console.log(content);
  }
  

  return (
    <div className="container">
    
      {/* now, it is the time to build antd components */}
      <Flex vertical={false} align="center" justify="center">
        {button_list.map((name) => (
          <Button type="primary" onClick={() => open_file(name)} shape="round">
            {name}
          </Button>
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
