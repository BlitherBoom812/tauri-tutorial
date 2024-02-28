use tauri::{App, Manager};
// use window_vibrancy::{self, NSVisualEffectMaterial};

/// setup
pub fn init(app: &mut App) -> std::result::Result<(), Box<dyn std::error::Error>> {
    let window = app.get_window("main").unwrap();

    // 仅在 macOS 下执行
    #[cfg(target_os = "macos")]
    window_vibrancy::apply_vibrancy(&win, NSVisualEffectMaterial::FullScreenUI)
        .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

    // 仅在 windows 下执行
    // #[cfg(target_os = "windows")]
    // window_vibrancy::apply_blur(&win, Some((100, 100, 100, 100)))
    //     .expect("Unsupported platform! 'apply_blur' is only supported on Windows");
    #[cfg(windows)]
    use windows::Win32::Foundation::HWND;
    let hwnd = window.hwnd().unwrap().0;
    let hwnd = HWND(hwnd);
    unsafe {
        let mut style_ex = WINDOW_EX_STYLE(GetWindowLongW(hwnd, GWL_EXSTYLE) as u32);
        style_ex |= WS_EX_APPWINDOW // for taskbar
        | WS_EX_COMPOSITED
        | WS_EX_LAYERED
        // | WS_EX_TRANSPARENT
        | WS_EX_TOPMOST;
        use windows::Win32::UI::WindowsAndMessaging::*;
        let nindex = GWL_EXSTYLE;
        let _pre_val = SetWindowLongA(hwnd, nindex, style_ex.0 as i32);
    }

    Ok(())
}
