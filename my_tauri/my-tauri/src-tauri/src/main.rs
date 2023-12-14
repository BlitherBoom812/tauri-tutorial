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

mod setup;
mod tray;
mod my_handlers;

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
        .invoke_handler(tauri::generate_handler![my_handlers::handle_action]) // 添加传统 handler
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    set_hotkey();
}

