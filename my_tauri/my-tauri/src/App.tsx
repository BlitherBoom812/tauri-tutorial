import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import React from 'react';
import { Button, Flex } from 'antd';

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");



  // useEffect(() => {
  //   // ✅  初始化，加载 wasm 文件
  //   init();
  // }, [])

  // var def
  const button_list = [
    "量筒",
    "通网",
    '随机过程',
    "DSP",
    '计网',
    '启动'
  ]

  async function open_file(name: string) {
    const content = await invoke("handle_action", {name: name});
    // 注: `/etc/hosts` 为自定义路径，而非基本目录之一
    console.log(content);
  }
  

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>

      <p>{greetMsg}</p>
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
