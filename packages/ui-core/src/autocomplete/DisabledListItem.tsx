import { ListItem, Typography } from "@material-ui/core";
import { FC, PropsWithChildren } from "react";

export const DisabledListItem: FC<PropsWithChildren> = ({ children }) => (
  <ListItem button disabled>
    <Typography variant={"body2"} color={"textPrimary"}>
      {children}
    </Typography>
  </ListItem>
);
