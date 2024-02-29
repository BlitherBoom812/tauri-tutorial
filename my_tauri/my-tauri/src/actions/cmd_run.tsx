import { invoke } from '@tauri-apps/api/tauri';
import { ActionInfo } from '../components/curriculum';
import { appWindow } from '@tauri-apps/api/window';
async function open_file(name: string) {
  const content = await invoke('handle_action_old', { name: name });
  // 注: `/etc/hosts` 为自定义路径，而非基本目录之一
  console.log(content);
}

async function handle_action(param_dict: ActionInfo) {
  // sleep 1s
  const content = await invoke(param_dict.action, param_dict.args);
  // 注: `/etc/hosts` 为自定义路径，而非基本目录之一
  console.log(content);
}

const spell_set = [
  '文件目录',
  'explorer',
  'chrome',
  'date',
  'exit',
  'Fig',
  'Grape',
  'Honeydew',
];

async function handle_spell(spell: string) {
  const commandToExecuteArray = spell.split(' ');
  var result = '';
  if (commandToExecuteArray.length > 0) {
    const prefix = commandToExecuteArray[0].toLowerCase();
    var args: string[] = [];
    if (commandToExecuteArray.length > 1) {
      args = commandToExecuteArray.slice(1);
    } else {
      args = [''];
    }
    switch (prefix) {
      case '文件目录':
      case 'explorer':
        const action_info = {
          name: 'default',
          action: 'handle_action',
          args: {
            program: 'explorer.exe',
            args: [''],
          },
        };
        await handle_action(action_info);
        result = prefix + '(Success)';
        break;
      case 'chrome':
        const action_info2 = {
          name: 'default',
          action: 'handle_action',
          args: {
            program:
              'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
            args: args,
          },
        };
        await handle_action(action_info2);
        result = prefix + '(Success)';
        break;
      case 'exit':
        appWindow.hide();
        result = "";
        break;
      case 'date':
        result = new Date().toLocaleString();
        break;
      default:
        result = eval(spell);
        break;
    }
  }
  return result;
}

export { open_file, handle_action, handle_spell, spell_set };
