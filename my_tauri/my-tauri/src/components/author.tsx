import '../styles/shining_txt.css';
import { WebviewWindow, appWindow } from '@tauri-apps/api/window';

const window_list = {
  searchbar_name: 'searchbar'
}

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
    height: 100,
    center: true,
  });
  // since the webview window is created asynchronously,
  // Tauri emits the `tauri://created` and `tauri://error` to notify you of the creation response
  webview.once('tauri://created', function () {
    // webview window successfully created
    console.log('window created!');
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
  webview.push(createWindow());
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
        <span key={i}>{item} </span>
      ))}
    </div>
  );
}

export default Author;
export {
  window_list
}
