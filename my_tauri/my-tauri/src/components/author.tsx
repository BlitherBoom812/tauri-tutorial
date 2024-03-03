import '../styles/shining_txt.css';
import { WebviewWindow, appWindow } from '@tauri-apps/api/window';
// shortcuts
import {
  unregister,
  register,
  isRegistered,
} from '@tauri-apps/api/globalShortcut';
import { emit, once } from '@tauri-apps/api/event';
import { key_bindings, searchbar_show } from '../utils/key_binding';

const window_list = {
  searchbar_name: 'searchbar',
};

function createWindow() {
  const webview = new WebviewWindow(window_list.searchbar_name, {
    url: 'searchbox',
    fullscreen: false,
    resizable: false,
    visible: true,
    title: window_list.searchbar_name,
    alwaysOnTop: true,
    decorations: false,
    transparent: true,
    width: 1000,
    height: 300,
    center: true,
  });
  // since the webview window is created asynchronously,
  // Tauri emits the `tauri://created` and `tauri://error` to notify you of the creation response
  webview.once('tauri://created', function () {
    // webview window successfully created
    console.log(`window ${webview.label} created!`);
  });
  webview.once('tauri://error', function (e: any) {
    // an error occurred during webview window creation
    console.log(`error creating window:`);
    // convert e to string
    console.log(e);
  });
  return webview;
}

var webview: WebviewWindow[] = [];

if (appWindow.label === 'main') {
  // create window
  webview.push(createWindow());


  for(var i = 0;i < key_bindings.length;i++) {
    // Shortcut
    if (!(await isRegistered(key_bindings[i]))) {
      console.log('register shortcut: ' + key_bindings[i]);
      const payload = {
        content: key_bindings[i],
      }
      // console.log(`payload: ${JSON.stringify(payload)}`);
      await register(key_bindings[i], () => {
        emit('shortcut', payload);
      });
    }
  }

  once('tauri://close-requested', (event) => {
    console.log(event);
    for(var i = 0;i < key_bindings.length;i++) {
      unregister(key_bindings[i]);
      console.log('unregister shortcut: ' + key_bindings[i]);
    }
    for (let i = 0; i < webview.length; i++) {
      webview[i].close();
    }
  });
}

function Author() {
  const text = 'Made by BlitherBoom812';
  // visit every char for text
  const array = text.split(' ');

  return (
    <div
      data-tauri-drag-region
      onClick={async () => {
        for (let i = 0; i < webview.length; i++) {
          if (await webview[i].isVisible()) {
            webview[i].hide();
          } else {
            webview[i].show();
          }
        }
      }}
    >
      {array.map((item, i) => (
        <span key={i} className="shining">
          {item}{' '}
        </span>
      ))}
    </div>
  );
}

export default Author;
export { window_list };
