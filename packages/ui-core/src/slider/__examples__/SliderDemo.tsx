import { Slider } from "../Slider";
import { SliderMark } from "../SliderMark";
import { useState, useMemo, ChangeEvent } from "react";

const max = 6500;
const min = 1000;
export const SliderDemo = () => {
  const [value, setValue] = useState("1000");
  const [inputValue, setInputValue] = useState("1000");

  const { handleOnChange } = useMemo(() => {
    return {
      handleOnChange: (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        setInputValue(e.target.value);
      },
    };
  }, []);

  return (
    <>
      <div css={{ width: 500, padding: 50 }}>
        <Slider
          defaultValue={0}
          onChange={(v) => {
            console.log(v, "v1");
          }}
        >
          <SliderMark value={0} label={"R0"} showDot={false} />
          <SliderMark value={100} label={"R0100"} showDot={false} />
        </Slider>
      </div>
      <div css={{ width: 500, padding: 50 }}>
        <input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onBlur={handleOnChange}
          type={"text"}
        />
        <Slider
          value={Number(value)}
          min={min}
          max={max}
          step={1000}
          onChange={(v) => {
            setValue(`${v || ""}`);
            setInputValue(`${v || ""}`);
          }}
        >
          <SliderMark value={1000} max={max} min={min} label={"R1000"} showDot={false} />
          <SliderMark value={2000} max={max} min={min} label={"R2000"} />
          <SliderMark value={3000} max={max} min={min} label={"R3000"} />
          <SliderMark value={4000} max={max} min={min} label={"R4000"} />
          <SliderMark value={5000} max={max} min={min} label={"R5000"} />
          <SliderMark value={6000} max={max} min={min} label={"R6000"} />
          <SliderMark value={6500} max={max} min={min} label={"R6500"} />
        </Slider>
      </div>
    </>
  );
};
