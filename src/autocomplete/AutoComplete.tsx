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

export const AutoComplete: FC<AutoCompleteProps> = ({ name, value = "", options, placeholder }) => {
  const inputEl = useRef(null);
  const contentEl = useRef(null);
  const [isOpen, open, close] = useToggle();
  const position = usePosition(inputEl, contentEl, Placement.bottomLeft, [isOpen]);
  const [inputValue, setInputValue] = useState<string>(value);
  const [matchedOptions, setMatchedOptions] = useState(options);

  return (
    <div>
      <Input
        name={name}
        placeholder={placeholder}
        value={inputValue}
        onChange={(_, value) => {
          setInputValue(value);
          const nextOptions = options.filter((v) => v.label.includes(value));
          setMatchedOptions(nextOptions);
        }}
        onBlur={() => {
          console.log("onBlur");
          const matchedItem = options.find((v) => v.label === inputValue);
          if (matchedItem) {
            // onChange(matchedItem.value);
            // close();
          } else {
            // setInputValue("");
            // close();
          }
        }}
        ref={inputEl}
        onClick={() => {
          if (isOpen) {
            return;
          }
          open();
          setMatchedOptions(options);
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
            }}
          >
            <div>
              {matchedOptions.map((option, idx) => (
                <div
                  onClick={() => {
                    setInputValue(option.label);
                    close();
                  }}
                  key={option.id || idx}
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
