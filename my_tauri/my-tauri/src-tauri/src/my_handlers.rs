use std::collections::HashMap;

#[tauri::command]
pub fn handle_action_old(name: &str){
    
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


#[tauri::command]
pub fn handle_action(program: &str, args: [&str; 1]){
    // white list?

    // print
    println!("calling: {:?}, args: {:?}", program, args);
    // 调用系统命令，打开 program args
    let mut cmd = std::process::Command::new(program);
    cmd.args(args);
    cmd.spawn().unwrap();

}
