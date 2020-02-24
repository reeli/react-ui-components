import { useEffect, useRef } from "react";

export const usePrevious = (value: any) => {
  const ref = useRef(null);

  useEffect(() => {
    // 赋值的时机：每一次 render 结束之后
    ref.current = value;
  });

  // 取值的时机：每一次 render 时
  // 在外部使用时，由于每一次都是在 value 变化之前(useEffect 之前)取的，因此是 previous value
  return ref.current;
};
