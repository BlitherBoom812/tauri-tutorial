import React, { useEffect, useRef, useState } from 'react';
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
import '../styles.css';
import { GradientText } from './gradient';
import { window_list } from './author';
import { listen } from '@tauri-apps/api/event';
import { searchbar_focus } from '../utils/key_binding';

/*
 * 已知 bug: 多个 spell 同时执行时 会将执行结果同时替换
 * 先解决单 spell 执行的问题。
 */

console.log(`appWindow.label: ${appWindow.label}`);
console.log(`window_list.searchbar_name: ${window_list.searchbar_name}`);

const checkCurrentWindow = async () => {
  return (
    'searchbar_name' in window_list &&
    appWindow.label === window_list.searchbar_name
  );
};

if (await checkCurrentWindow()) {
  console.log('current searchbar name: ' + window_list.searchbar_name);
  await appWindow.setIgnoreCursorEvents(false);
}

const unlisten = async (event_name: string, callback: (event: any) => void) => {
  return await listen(event_name, (event) => {
    callback(event);
  });
};

const subscribers: { callback: (event: any) => void; subscriber_id: string }[] =
  [];
unlisten('shortcut', (event) => {
  for (const subscriber of subscribers) {
    subscriber.callback(event);
  }
});

const subscribe = (callback: (event: any) => void, subscriber_id: string) => {
  // if not exist, then push
  if (
    subscribers.find((subscriber) => subscriber.subscriber_id === subscriber_id)
  ) {
    return;
  }
  subscribers.push({
    callback: callback,
    subscriber_id: subscriber_id,
  });
};

const SpellText: React.FC<{ text: string; spell_prefix: RegExp }> = ({
  text,
  spell_prefix,
}) => {
  // match text
  const text_array = text.split(' ');
  var spell_status = false;
  const display_array: { text: string; isSpell: boolean }[] = [];
  for (var i = 0; i < text_array.length; i++) {
    if (spell_prefix.test(text_array[i])) {
      spell_status = true;
    }
    display_array.push({ text: text_array[i], isSpell: spell_status });
  }

  return (
    <div className="display-div font-style">
      {display_array.map((item, index) =>
        item.isSpell ? (
          <strong key={index} className="token">
            <GradientText
              text={item.text}
              svg_class="gradient-text-svg"
              font_style="font-style"
              from_style="red-style"
              to_style="blue-style"
            />{' '}
          </strong>
        ) : (
          <strong key={index} className="token">
            <GradientText
              text={item.text}
              svg_class="gradient-text-svg"
              font_style="font-style"
              from_style="black-style"
              to_style="black-style"
            />{' '}
          </strong>
        )
      )}
    </div>
  );
};

function SearchBox() {
  const spell_reg = /<([^>]+)>/;
  const spell_prefix = /<([^>]+)/;
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1); // 新状态，用于跟踪当前选中的建议项的索引
  const [searchText, setSearchText] = useState('');

  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const InputRef = useRef<null | any>(null);

  const shortcut_function = (event: any) => {
    // route to proper shortcut
    if (event.payload.content === searchbar_focus) {
      // set focus on search bar
      appWindow.isMinimized().then(async (res) => {
        if (res) {
          await appWindow.unminimize();
        }
        await appWindow.setFocus();
        document.getElementById('searchbar-input')?.focus();
      });
    }
  };

  subscribe(shortcut_function, 'searchbar');

  const getScrollTop = () => {
    const localScrollTop =
      (document ? document.documentElement.scrollTop : false) ||
      window.pageYOffset ||
      (document ? document.body.scrollTop : 0);
    return localScrollTop;
  };

  // window.addEventListener('scroll', bindHandleScroll);

  const onSuggestionHandler = (text: string) => {
    const suggestionMatch = match_rules_all(text);
    const condition = suggestionMatch ? suggestionMatch[0].length > 0 : false;
    setShowDropdown(condition);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
  };

  const resizeWindow = async () => {
    const factor = await appWindow.scaleFactor();
    const size = await appWindow.innerSize();
    const logical_size = size.toLogical(factor);
    var height = document.body.scrollHeight;
    const width = logical_size.width;
    const interval = 10;
    const max_resize_time = 1000 / interval;
    var resize_count = 0;
    var scrollTop = 0;
    do {
      scrollTop = getScrollTop();
      await appWindow.setSize(new LogicalSize(width, height));
      height = height + interval;
      resize_count++;
    } while (scrollTop > 0 && resize_count < max_resize_time);
  };

  const onSelectHandler = (value: any) => {
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
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [filteredSuggestions, selectedSuggestionIndex, onSelectHandler]);

  // auto scrollToBottom
  useEffect(() => {
    scrollToBottom();
  });

  // auto resize window when text change
  useEffect(() => {
    resizeWindow();
  }, [searchText]);

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
    <div className="d-flex flex-column">
      <Container className="search-bar-container">
        <div className="d-flex">
          <Button
            className="drag-button"
            data-tauri-drag-region
            onClick={() => {
              console.log(InputRef.current.focus);
              InputRef.current.focus();
            }}
          >
            {grip_vertical}
          </Button>
          <div className="parent-div">
            <SpellText
              text={searchText}
              spell_prefix={spell_prefix}
            ></SpellText>
            <InputGroup>
              <FormControl
                ref={InputRef}
                id="searchbar-input"
                className="search-bar font-style"
                placeholder="Spell here..."
                aria-label="Search..."
                aria-describedby="basic-addon2"
                value={searchText} // 将搜索文本绑定到输入框的值
                onChange={handleSearchInputChange} // 监听输入框变化
              />
            </InputGroup>
          </div>
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
              <Dropdown.Item className="custom-dropdown-item">
                No Matches
              </Dropdown.Item>
            )}
            <div
              ref={messagesEndRef}
              style={{
                color: 'white',
                clear: 'both',
                height: '1px',
                width: '100%',
                float: 'left',
              }}
            ></div>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </div>
  );
}

export default SearchBox;
