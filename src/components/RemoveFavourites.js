import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

const RemoveFavourites = ({ onClick }) => {
  return (
    <Tooltip title="Remove from Watchlist">
      <IconButton color="error" onClick={onClick}>
        <CancelIcon />
      </IconButton>
    </Tooltip>
  );
};

export default RemoveFavourites;
