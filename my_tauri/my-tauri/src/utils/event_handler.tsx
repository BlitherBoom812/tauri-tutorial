import { appWindow } from '@tauri-apps/api/window';
import { listen } from '@tauri-apps/api/event';
// listening event

switch (appWindow.label) {
    case 'main':
        const unlisten = await listen('event', (event) => {
            console.log(event);
        });
        break;

    default:
        break;
}