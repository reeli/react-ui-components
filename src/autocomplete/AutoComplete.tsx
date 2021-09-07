import { FC, useRef, useState } from "react";
import { Input } from "src/input/Input";
import { Placement, usePosition, useToggle } from "src/core";
import { Portal } from "src/portal";
import { Option } from "src/picker/Picker";

interface AutoCompleteProps {
  name: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  options: Option[];
}

export const AutoComplete: FC<AutoCompleteProps> = ({ name, value = "", options, onChange, placeholder }) => {
  const inputEl = useRef(null);
  const contentEl = useRef(null);
  const [isOpen, open, close] = useToggle();
  const position = usePosition(inputEl, contentEl, Placement.bottomLeft, [isOpen]);
  const [inputValue, setInputValue] = useState<string>(value);
  const inputValueRef = useRef(inputValue);
  const [matchedOptions, setMatchedOptions] = useState(options);
  const optionsRef = useRef(options);

  const handleBlur = () => {
    setTimeout(() => {
      console.log("on blur");
      const matchedItem = optionsRef.current.find((v) => v.label === inputValueRef.current);
      if (matchedItem) {
        console.log("should notify");
        onChange(matchedItem.value);
        close();
      } else {
        setInputValue("");
        close();
      }
    }, 100);
  };

  const handleInputChange = (_: unknown, value: string) => {
    setInputValue(value);
    inputValueRef.current = value;
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

  const handleItemClick = (option: Option) => {
    console.log("on clicked");
    inputValueRef.current = option.label;
    setInputValue(option.label);
  };

  return (
    <>
      <Input
        ref={inputEl}
        name={name}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onClick={handleInputClick}
      />
      {isOpen && (
        <Portal>
          <div
            ref={contentEl}
            style={{
              position: "absolute",
              left: position.left,
              top: position.top,
            }}
          >
            <div>
              {matchedOptions.map((option, idx) => (
                <div key={option.id || idx} onClick={() => handleItemClick(option)}>
                  {option.label}
                </div>
              ))}
            </div>
            {matchedOptions.length == 0 && <div>No options</div>}
          </div>
        </Portal>
      )}
    </>
  );
};
