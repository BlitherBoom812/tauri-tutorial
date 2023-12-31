function copyToClipboard(text: any) {
  var textarea = document.createElement('textarea');
  textarea.value = text;

  // 使textarea不可见
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  textarea.style.top = '-9999px';

  document.body.appendChild(textarea);
  textarea.select();

  // 执行复制命令
  document.execCommand('copy');

  document.body.removeChild(textarea);
}

function copyCodeLet(text: string, width: any, height: any) {
  copyToClipboard(
    `<embed type="text/html" src="${text}" width="${width}" height="${height}">`
  );
}

export { copyToClipboard, copyCodeLet };
