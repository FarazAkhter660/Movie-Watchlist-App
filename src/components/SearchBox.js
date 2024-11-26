import React from "react";
import { TextField } from "@mui/material";

const SearchBox = (props) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      label="Search Movies"
      value={props.value}
      onChange={(event) => props.setSearchValue(event.target.value)}
      sx={{ marginBottom: 4 }}
    />
  );
};

export default SearchBox;
