// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn my_read_file(path: std::path::PathBuf) -> String {
    // print
    println!("{:?}", path);
    // 读取文件内容，以文本字符串形式返回
    std::fs::read_to_string(path).unwrap()
}

mod setup;

fn main() {
    tauri::Builder::default()
        .setup(setup::init)
        .invoke_handler(tauri::generate_handler![greet, my_read_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

