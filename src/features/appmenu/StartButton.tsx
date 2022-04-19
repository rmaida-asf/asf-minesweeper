import React from "react";
import { Button, CircularProgress, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { appLoading, sendMessage, startGame } from "../game/WebSocketState";

interface ButtonProps {
  level: string;
}

const StartButton = ({ level }: ButtonProps) => {
  const loading = useAppSelector(appLoading);
  const dispatch = useAppDispatch();

  const startNewGame = () => {
    if (!loading) {
      dispatch(startGame());
      dispatch(sendMessage(`new ${level}`));
    }
  };

  return (
    <Button variant="contained" onClick={startNewGame}>
      {loading ? (
        <Box>
          <CircularProgress size={15} color="secondary" />
          <Box component="span" sx={{ marginLeft: "5px" }}>
            Loading
          </Box>
        </Box>
      ) : (
        <Box component="span">Start</Box>
      )}
    </Button>
  );
};

export default StartButton;
