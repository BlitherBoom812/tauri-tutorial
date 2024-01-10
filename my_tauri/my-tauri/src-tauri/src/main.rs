// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod setup;
mod tray;
mod my_handlers;

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
}

