import { Slider } from "../Slider";
import { SliderMark } from "../SliderMark";
import { useState } from "react";

export const SliderDemo = () => {
  const [value, setValue] = useState(50);
  const max = 600;
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
          value={value}
          onChange={(e) => {
            setValue(Number(e.target.value));
          }}
          type={"number"}
        />
        <Slider
          sliderValue={value}
          min={0}
          max={600}
          step={100}
          onChange={(v) => {
            setValue(v!);
          }}
        >
          <SliderMark value={0} max={max} label={"R0"} showDot={false} />
          <SliderMark value={100} max={max} label={"R100"} />
          <SliderMark value={200} max={max} label={"R200"} />
          <SliderMark value={300} max={max} label={"R300"} />
          <SliderMark value={400} max={max} label={"R400"} />
          <SliderMark value={500} max={max} label={"R500"} />
          <SliderMark value={600} max={max} label={"R600"} showDot={false} />
        </Slider>
      </div>
    </>
  );
};
