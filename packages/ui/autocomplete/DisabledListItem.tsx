import { ListItem, Typography } from "@material-ui/core";
import { FC } from "react";

export const DisabledListItem: FC = ({ children }) => (
  <ListItem button disabled>
    <Typography variant={"body2"} color={"textPrimary"}>
      {children}
    </Typography>
  </ListItem>
);
