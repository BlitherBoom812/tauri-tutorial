import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';

interface CodeEditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

const App: React.FC<CodeEditorProps> = ({ value = '', onChange }) => {
  const [code, setCode] = React.useState(value || '');
  const onEditorChange = React.useCallback((val: string, viewUpdate: any) => {
    console.log('val:', val);
    setCode(code);
    onChange?.(val);
  }, []);
  return (
    <CodeMirror
      value={code}
      height="100px"
      extensions={[python()]}
      onChange={onEditorChange}
      style={{ textAlign: 'left' }}
    />
  );
};
export default App;
