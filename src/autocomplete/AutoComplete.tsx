import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import { Input } from "src/input/Input";
import { Placement, usePosition, usePrevious, useToggle } from "src/core";
import { Portal } from "src/portal";
import { Option } from "src/picker/Picker";

interface AutoCompleteProps {
  name: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  options: Option[];
}

// 在 input 里面输入一些字符，click option(选中某个 item) 之后，会触发 input 的 blur，blur 时我们需要销毁弹窗，弹窗销毁之后，option 的点击事件自然也无法触发，
// 导致我们无法选中某个 item

// 解决的办法是，点击 item 时阻止 input 失去焦点
// mouseover 的默认事件会让 input 失去焦点，只需要通过 evt.preventDefault 阻止 input 失去焦点即可
// mouseenter 默认不会让 input 的焦点丢失，自然也就不会 trigger input 的 blur 事件
// click 默认也不会让 input 的焦点丢失，因此只需要阻止 mousedown 的默认事件就能够阻止 input 的焦点丢失

// input blur 是一个被动行为，因为焦点只有一个，如果其他元素成为焦点，那么 input 就会失去焦点，失去焦点时会触发 blur 事件回调。因此，只要保证焦点不丢失，就能够保证 blur 事件不被触发。

// Tips: 在 item 点击之后再让 input 失去焦点（也就是让 item 本身获得焦点），这样就可以在 blur 时统一处理 onChange, 关闭弹窗等逻辑
// 恰好其他元素成为焦点，input 被踢掉了。在 click option 之后把焦点设置到自身，就能够 trigger blur，然后在 blur 里面统一处理逻辑，在 blur 的时候又可以把焦点重新设置给 input
// ref: https://github.com/mui-org/material-ui/blob/next/packages/mui-core/src/AutocompleteUnstyled/useAutocomplete.js#L914

export const AutoComplete: FC<AutoCompleteProps> = ({ name, value = "", options, onChange, placeholder }) => {
  const inputEl = useRef<HTMLInputElement>(null);
  const contentEl = useRef(null);
  const [isOpen, open, close] = useToggle();
  const position = usePosition(inputEl, contentEl, Placement.bottomLeft, [isOpen]);
  const [inputValue, setInputValue] = useState<string>(value);
  const [matchedOptions, setMatchedOptions] = useState(options);
  const optionsRef = useRef(options);
  //
  // useOutSideClick([inputEl,contentEl], ()=>{
  //   close();
  // });

  useEffect(() => {
    optionsRef.current = options;
  });

  const prevIsOpen = usePrevious(isOpen);

  useEffect(() => {
    if (prevIsOpen && !isOpen) {
      // console.log("on blur");
      const matchedItem = optionsRef.current.find((v) => v.label === inputValue);
      if (matchedItem) {
        // console.log("should notify");
        onChange(matchedItem.value);
        close();
      } else {
        setInputValue("");
        close();
      }
    }
  }, [isOpen]);

  const handleBlur = () => {
    // console.log("on blur");

    // console.log(document.activeElement, "active element");
    // setTimeout(() => {
    //   close();
    // }, 100);
    close();
  };

  const handleInputChange = (_: unknown, value: string) => {
    setInputValue(value);
    // inputValueRef.current = value;
    const nextOptions = options.filter((v) => v.label.includes(value));
    setMatchedOptions(nextOptions);
  };

  const handleInputClick = () => {
    if (isOpen) {
      return;
    }
    open();
    setMatchedOptions(options);
  };

  const handleItemClick = (_: MouseEvent<HTMLDivElement>, option: Option) => {
    // console.log("on click");
    // inputValueRef.current = option.label;
    setInputValue(option.label);
    inputEl.current && (inputEl.current as HTMLInputElement).blur();
    // close();
  };

  // const handleMouseDown = (option: Option) => {
  //   console.log("on mousedown");
  //   // inputValueRef.current = option.label;
  //   setInputValue(option.label);
  //   // close();
  // };

  return (
    <div css={{ width: "100%" }}>
      <Input
        ref={inputEl}
        name={name}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onClick={handleInputClick}
        onEnter={(evt) => {
          console.log(evt.key, "evt.key");
          inputEl.current && inputEl.current.blur();
        }}
      />
      {isOpen && (
        <Portal>
          <div
            ref={contentEl}
            style={{
              position: "absolute",
              left: position.left,
              top: position.top,
              width: "100%",
            }}
          >
            <div
              css={{
                border: "1px solid #ccc",
                borderTop: "none",
                maxHeight: 200,
                overflow: "auto",
              }}
            >
              {matchedOptions.map((option, idx) => (
                <div
                  key={option.id || idx}
                  onClick={(evt) => handleItemClick(evt, option)}
                  onMouseDown={(evt) => {
                    // (evt.target as HTMLDivElement).focus();
                    evt.preventDefault();
                    // handleMouseDown(option)
                    // console.log(document.activeElement,'on mousedown')
                  }}
                  // onTouchStart={(evt)=>evt.preventDefault()}
                  // onMouseEnter={(evt) => {
                  //   // evt.preventDefault();
                  //   // (evt.target as HTMLDivElement).focus();
                  //   console.log("mouse enter")
                  // }}
                  css={{
                    padding: 10,
                    marginTop: 10,
                    cursor: "pointer",
                    borderTop: "1px solid #ccc",
                    width: "100%",
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
            {matchedOptions.length == 0 && <div>No options</div>}
          </div>
        </Portal>
      )}
    </div>
  );
};
