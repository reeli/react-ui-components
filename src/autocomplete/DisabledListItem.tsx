import { ListItem, Typography } from "@material-ui/core";
import React from "react";

export const DisabledListItem: React.FC = ({ children }) => (
  <ListItem button disabled>
    <Typography variant={"body2"} color={"textPrimary"}>
      {children}
    </Typography>
  </ListItem>
);
