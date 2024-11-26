import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AddFavourite = ({ onClick }) => {
  return (
    <Tooltip title="Add to Watchlist">
      <IconButton color="secondary" onClick={onClick}>
        <FavoriteIcon />
      </IconButton>
    </Tooltip>
  );
};

export default AddFavourite;
