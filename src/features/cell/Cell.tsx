import React, { useState, useEffect } from "react";
import { Paper, Box, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { isGameOver, sendMessage } from "../game/WebSocketState";

interface CellProps {
  x: string;
  y: string;
  value?: string;
}

const Cell = ({ x, y, value }: CellProps) => {
  const dispatch = useAppDispatch();
  const gameOver = useAppSelector(isGameOver);

  const [elevation, setElevation] = useState(3);
  const [color, setColor] = useState("#ebeff5");

  useEffect(() => {
    if (!gameOver && value !== "□") {
      setElevation(0);
      setColor("#d3d6db");
    } else {
      setElevation(3);
      setColor("#ebeff5");
    }
  }, [gameOver, value]);

  const onClickCell = () => {
    if (elevation > 0 && !gameOver) {
      console.log(x, y);
      dispatch(sendMessage(`open ${x} ${y}`));
      setElevation(0);
      setColor("#d3d6db");
    }
  };

  return (
    <Paper
      style={{
        margin: "2px",
        padding: "1px",
        background: color,
        width: "30px",
        height: "30px",
        justifyContent: "center",
        alignItems: "center",
      }}
      elevation={elevation}
      onClick={onClickCell}
    >
      <Typography
        sx={{ userSelect: "none", fontSize: "20px"}}
      >
        {value !== "□" ? value : " "}
      </Typography>
    </Paper>
  );
};

export default Cell;
