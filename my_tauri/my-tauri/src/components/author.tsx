import '../styles/shining_txt.css';
import { WebviewWindow } from '@tauri-apps/api/window';

function createWindow() {
  const webview = new WebviewWindow('searchbox', {
    url: 'searchbox',
    fullscreen: false,
    resizable: true,
    visible: true,
    title: 'searchbox',
    alwaysOnTop: true,
    decorations: false,
    transparent: true,
    width: 1000,
    height: 1000,
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
const webview = createWindow();

function Author() {
  const text = 'Made by BlitherBoom812';
  // visit every char for text
  const array = text.split(' ');

  return (
    <div
      data-tauri-drag-region
      onClick={async () => {
        if (await webview.isVisible()) {
          webview.hide();
        } else {
          webview.show();
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

// task: 1. draggable(ok) 2. resize with content(ok) 3. shining spell(half) 4. esc exit(ok) 5. colorful!(ok)
