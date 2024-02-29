import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Button,
  Container,
  Dropdown,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import { handle_spell, spell_set } from '../actions/cmd_run';
import { LogicalSize, appWindow } from '@tauri-apps/api/window';
import { grip_vertical } from '../assets/icons';
/*
 * 已知 bug: 多个 spell 同时执行时 会将执行结果同时替换
 */

function SearchBox() {
  const spell_reg = /<([^>]+)>/;
  const spell_prefix = /<([^>]+)/;
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestionField, setSuggestionField] = useState(''); // record the field to be replaced
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1); // 新状态，用于跟踪当前选中的建议项的索引
  const [searchText, setSearchText] = useState('');

  const onSuggestionHandler = (text: string) => {
    const suggestionMatch = match_rules_all(text);
    const condition = suggestionMatch ? suggestionMatch[0].length > 0 : false;
    setSuggestionField(suggestionMatch ? suggestionMatch[0] : '');
    setShowDropdown(condition);
  };

  const resizeWindow = async () => {
    const factor = await appWindow.scaleFactor();
    const size = await appWindow.innerSize();
    const logical_size = size.toLogical(factor);
    const height = document.body.scrollHeight + 70;
    const width = logical_size.width;
    await appWindow.setSize(new LogicalSize(width, height));
  };

  const onSelectHandler = (value: any) => {
    // if (suggestionField && suggestionField.length > 0) {
    //   const suggested_text = searchText.replace(suggestionField, value);
    //   console.log(`search text: ${searchText}`);
    //   console.log(`suggestion field: ${suggestionField}`);
    //   console.log(`suggested_text: ${suggested_text}`);
    //   setSearchText(suggested_text);
    // }

    const match = match_rules_all(searchText);
    if (match && match.length > 0) {
      const to_be_matched = match[match.length - 1];
      var suggestionTemplate = '';
      if (to_be_matched.startsWith('<')) {
        suggestionTemplate = '<{content}';
        to_be_matched.replace('<', '');
      } else {
        suggestionTemplate = '{content}';
      }
      const new_value = suggestionTemplate.replace('{content}', value);
      console.log(`suggestionTemplete: ${suggestionTemplate}`);
      console.log(`new value: ${new_value}`);
      const search_array = searchText.split(' ');
      search_array.pop();
      search_array.push(new_value);
      const suggested_text = search_array.join(' ');
      setSearchText(suggested_text);
      setShowDropdown(false);
    }
  };

  const match_rules_all = (text: string) => {
    // const match = text.toLowerCase().match(spell_prefix);
    const match_list = text.split(' ');
    if (match_list) {
      return match_list;
    } else {
      return null;
    }
  };

  const match_rules = (text: string) => {
    const match = match_rules_all(text);
    if (match) {
      // console.log('matching: ' + match);
      const to_be_matched = match[match.length - 1].replace('<', '');
      return to_be_matched;
    } else {
      return '';
    }
  };

  const filteredSuggestions = spell_set.filter((item) =>
    item.toLowerCase().includes(match_rules(searchText))
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowDown') {
        // 下箭头
        setSelectedSuggestionIndex((prevIndex) =>
          prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : prevIndex
        );
      } else if (e.code === 'ArrowUp') {
        // 上箭头
        setSelectedSuggestionIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : 0
        );
      } else if (e.code === 'Enter') {
        // 回车键
        const suggestion = filteredSuggestions[selectedSuggestionIndex];
        if (suggestion) onSelectHandler(suggestion);
      } else if (e.code === 'Escape') {
        // Esc 键
        setShowDropdown(false);
        setSelectedSuggestionIndex(-1); // 重置选中的建议项索引
      } else if (e.code === 'Backspace') {
        // 删除键
        // emit('searchbox', {
        //   content: "searchbox-backspace"
        // });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [filteredSuggestions, selectedSuggestionIndex, onSelectHandler]);

  useEffect(() => {
    resizeWindow();
  });

  // 定义处理搜索框变化的回调函数
  const handleSearchInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    var search_value = event.target.value;
    // 使用正则表达式检测输入中是否含有 <xxxx> 格式的内容
    var match = search_value.match(spell_reg);
    if (match) {
      var commandToExecute = match[1];
      console.log('命令:', commandToExecute);
      // 执行 xxxx 命令
      try {
        const running_command = '[running ' + commandToExecute + ']';
        const running_value = search_value.replace(
          '<' + commandToExecute + '>',
          running_command
        );
        console.log('running value: ' + running_value);
        setSearchText(running_value);
        // 执行命令，并将结果c设置回输入框
        const result = await handle_spell(commandToExecute);
        console.log('执行结果:', result);
        search_value = running_value.replace(running_command, result);
        console.log('update search_value: ' + search_value);
      } catch (error) {
        console.error('执行命令时发生错误:', error);
      }
    }
    setSearchText(search_value);
    onSuggestionHandler(search_value);
  };

  return (
    <Container className="search-bar-container">
      <div className="d-inline-flex">
        <Button className="drag-button mb-3" data-tauri-drag-region>
          {grip_vertical}
        </Button>
        <InputGroup className="mb-3">
          <FormControl
            className="search-bar"
            placeholder="Spell here..."
            aria-label="Search..."
            aria-describedby="basic-addon2"
            value={searchText} // 将搜索文本绑定到输入框的值
            onChange={handleSearchInputChange} // 监听输入框变化
          />
        </InputGroup>
      </div>
      <Dropdown
        show={showDropdown}
        onToggle={() => setShowDropdown(!showDropdown)}
      >
        <Dropdown.Menu className="custom-dropdown-menu">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((suggestion, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => onSelectHandler(suggestion)}
                className={`custom-dropdown-item ${
                  index === selectedSuggestionIndex ? 'selected' : ''
                }`}
              >
                {suggestion}
                <br />
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item>No Matches</Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  );
}

export default SearchBox;
