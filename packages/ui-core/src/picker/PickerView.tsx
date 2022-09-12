import { Button } from "../button";
import  { FC, useState } from "react";
import { Picker, PickerProps } from "../picker/Picker";
import { PickerWrapper } from "../picker/PickerWrapper";

interface PickerViewProps extends PickerProps {}

const containerHeight = 300;

export const PickerView: FC<PickerViewProps> = ({ options, onChange, value }) => {
  const [val, setVal] = useState(value);

  return (
    <div>
      <PickerWrapper
        header={(open) => {
          return (
            <>
              <Button onClick={open}>Select Picker </Button>
              <div>{value}</div>
            </>
          );
        }}
      >
        {({ close }) => (
          <>
            <div>
              <Button onClick={close}>cancel</Button>
              <Button
                onClick={() => {
                  onChange(val);
                  close();
                }}
              >
                confirm
              </Button>
            </div>
            <Picker
              options={options}
              onChange={(v) => {
                setVal(v);
              }}
              value={val}
              containerHeight={containerHeight}
            />
          </>
        )}
      </PickerWrapper>
    </div>
  );
};
