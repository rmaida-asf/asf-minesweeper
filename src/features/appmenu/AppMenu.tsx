import React, { useState } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import StartButton from "./StartButton";

const AppMenu = () => {
  const [level, setLevel] = useState("1");

  const handleChange = (event: SelectChangeEvent) => {
    setLevel(event.target.value as string);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
        width: "350px",
        alignSelf: "center",
        alignItems: "center",
        margin: "10px",
      }}
    >
      <Typography variant="h6">Minesweeper</Typography>
      <StartButton level={level} />
      <FormControl>
        <InputLabel id="level-select-label">Level</InputLabel>
        <Select
          labelId="level-select-label"
          id="level-select"
          value={level}
          label="Level"
          onChange={handleChange}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default AppMenu;
