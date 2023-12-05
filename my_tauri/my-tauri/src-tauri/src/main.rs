// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

// #[tauri::command]
// async fn my_read_file(path: std::path::PathBuf) -> String {
//     // print
//     println!("{:?}", path);
//     // 读取文件内容，以文本字符串形式返回
//     std::fs::read_to_string(path).unwrap()
// }

use std::collections::HashMap;

#[tauri::command]
fn handle_action(name: &str){
    
    let mut hw_dir_dict = HashMap::new();
    hw_dir_dict.insert("下载", HashMap::from([("program", ["explorer.exe"]), ("args", ["C:\\Users\\Guo_Yun\\Downloads"])]));
    hw_dir_dict.insert("量筒", HashMap::from([("args", ["D:\\STUDY\\课程资料\\量筒\\hw"]), ("program", ["explorer.exe"])]));
    hw_dir_dict.insert("通网", HashMap::from([("args", ["D:\\STUDY\\课程资料\\通网\\hw"]), ("program", ["explorer.exe"])]));
    hw_dir_dict.insert("随机过程", HashMap::from([("args", ["D:\\STUDY\\课程资料\\随机过程\\hw"]), ("program", ["explorer.exe"])]));
    hw_dir_dict.insert("DSP", HashMap::from([("args", ["D:\\STUDY\\课程资料\\DSP"]), ("program", ["explorer.exe"])]));
    hw_dir_dict.insert("计网", HashMap::from([("args", ["D:\\STUDY\\课程资料\\计网\\hw"]), ("program", ["explorer.exe"])]));
    hw_dir_dict.insert("启动", HashMap::from([("program", ["C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"]), ("args", ["https://www.bilibili.com/video/BV1a14y1i7N4/"])]));
    

    // print
    println!("opening: {:?}", name);
    // 调用系统命令，打开 program args
    let mut cmd = std::process::Command::new(hw_dir_dict.get(name).unwrap().get("program").unwrap()[0]);
    cmd.args(hw_dir_dict.get(name).unwrap().get("args").unwrap());
    cmd.spawn().unwrap();
    

}


mod setup;
mod tray;

use windows_hotkeys::keys::{ModKey, VKey};
use windows_hotkeys::{HotkeyManager, HotkeyManagerImpl};

fn set_hotkey() {
    let mut hkm = HotkeyManager::new();

    hkm.register(VKey::A, &[ModKey::Ctrl], || {
        println!("Hotkey ALT + A was pressed");
    })
    .unwrap();

    hkm.event_loop();
}

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .menu(tauri::Menu::os_default(&context.package_info().name))
        .system_tray(tray::menu()) // ✅ 将 `tauri.conf.json` 上配置的图标添加到系统托盘
        .on_system_tray_event(tray::handler) // 添加系统托盘的 handler
        .setup(setup::init)
        .invoke_handler(tauri::generate_handler![handle_action]) // 添加传统 handler
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    set_hotkey();
}

