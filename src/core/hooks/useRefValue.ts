import { useEffect, useRef } from "react";

export const useRefValue = <T>(value: T) => {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  });

  // 外部通过 ref 去获取最新的 value
  return ref;
};
