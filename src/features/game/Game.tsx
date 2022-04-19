import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  sendMessage,
  selectMessage,
  gameOver,
  isGameOver,
} from "./WebSocketState";
import { Paper, Box, Alert, AlertColor } from "@mui/material";
import { Board } from "../board";
import { AppMenu } from "../appmenu";

const Game = () => {
  const message = useAppSelector(selectMessage);
  const getGameOver = useAppSelector(isGameOver);
  const dispatch = useAppDispatch();

  const [gameMesseage, setGameMesseage] = useState("");
  const [severity, setSeverity] = useState("success");

  useEffect(() => {
    if (message === "open: OK" || message === "new: OK") {
      dispatch(sendMessage("map"));
    } else if (message === "open: You lose") {
      setSeverity("error");
      setGameMesseage("You lose");
      dispatch(gameOver());
    } else if (message?.includes("win")) {
      setSeverity("success");
      setGameMesseage("You win");
      dispatch(gameOver());
    }
  }, [dispatch, message]);

  return (
    <Paper elevation={1} style={{ backgroundColor: "#abadb0" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <AppMenu />
      </Box>
      {getGameOver && (
        <Alert severity={severity as AlertColor} style={{ margin: "10px" }}>
          {gameMesseage}
        </Alert>
      )}
      <Board />
    </Paper>
  );
};

export default Game;
