import { Box } from "@ui/base";
import { FC } from "react";

interface IconProps {
  path: string;
  placement?: "start" | "end";
}

export const Icon: FC<IconProps> = ({ path, placement = "end" }) => {
  return (
    <Box sx={{ width: "1.2em", height: "1.2em" }} component={"span"} data-icon={true} data-placement={placement}>
      <svg viewBox={"0 0 24 24"}>
        <path d={path} />
      </svg>
    </Box>
  );
};
