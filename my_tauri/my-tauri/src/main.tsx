import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

import { PhysicalSize, WebviewWindow } from '@tauri-apps/api/window';

const webview = new WebviewWindow('theUniqueLabel', {
  url: 'index.html',
  "fullscreen": false,
  "resizable": false,
  "visible": true,
  "title": "SpellMagic",
  "alwaysOnTop": true,
  "decorations": false,
  "transparent": true,
  "width": 800,
  "height": 500
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


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
