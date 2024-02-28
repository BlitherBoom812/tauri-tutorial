import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl} from 'react-bootstrap';
import { handle_action } from '../actions/cmd_run';
function SearchBox() {
    const [searchText, setSearchText] = useState('');

    // 定义处理搜索框变化的回调函数
    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        var search_value = event.target.value;
        console.log(event.target.value);
        // 使用正则表达式检测输入中是否含有 <xxxx> 格式的内容
        var match = search_value.match(/<([^>]+)>/);
        if (match) {
            var commandToExecute = match[1];
            console.log("命令:", commandToExecute);
            // 执行 xxxx 命令
            try {
                // 执行命令，并将结果c设置回输入框
                const commandToExecuteArray = commandToExecute.split(" ")
                var result = "";
                if (commandToExecuteArray.length > 0) {
                  const prefix = commandToExecuteArray[0].toLowerCase()
                  var args: string[] = []
                  if (commandToExecuteArray.length > 1) {
                    args = commandToExecuteArray.slice(1)
                  } else {
                    args = ['']
                  }
                  switch (prefix) {
                    case "文件目录":
                    case "explorer":
                      const action_info = {
                        name: "default",
                        action: 'handle_action',
                        args: {
                          program: 'explorer.exe',
                          args: [''],
                        },
                      }
                      handle_action(action_info)
                      result = prefix + "(Success)"
                      break;
                    case "chrome":
                      const action_info2 = {
                        name: "default",
                        action: 'handle_action',
                        args: {
                          program: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
                          args: args,
                        },
                      }
                      handle_action(action_info2)
                      result = prefix + "(Success)"
                      break;
                    case "exit":
                      result = prefix + "(Success)"
                      break;
                    default:
                      result = eval(commandToExecute);
                      break;
                  }
                }
                // const result = eval(commandToExecute);
                console.log("执行结果:", result);
                search_value = search_value.replace("<" + commandToExecute + ">", result);
            } catch (error) {
                console.error("执行命令时发生错误:", error);
            }
        }
        setSearchText(search_value);
  };


  return (
    <Container>
      <InputGroup className="mb-3">
        <FormControl
            className='search-bar'
            placeholder="Spell here..."
            aria-label="Search..."
            aria-describedby="basic-addon2"
            value={searchText} // 将搜索文本绑定到输入框的值
            onChange={handleSearchInputChange} // 监听输入框变化
        />
        {/* <InputGroup.Append>
          <Button variant="outline-secondary" onClick={handleSearchButtonClick}>Search</Button>
        </InputGroup.Append> */}
      </InputGroup>
    </Container>
  );
}

export default SearchBox;
