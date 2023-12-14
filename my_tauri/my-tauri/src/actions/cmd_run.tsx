import { invoke } from '@tauri-apps/api/tauri';
import { ActionInfo } from '../components/curriculum';

async function open_file(name: string) {
    const content = await invoke('handle_action_old', { name: name });
    // 注: `/etc/hosts` 为自定义路径，而非基本目录之一
    console.log(content);
  }

async function handle_action(param_dict: ActionInfo) {
    const content = await invoke(param_dict.action, param_dict.args);
    // 注: `/etc/hosts` 为自定义路径，而非基本目录之一
    console.log(content);
  }

export {
    open_file,
    handle_action
}

