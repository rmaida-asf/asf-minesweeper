import React, { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectedMap } from "../game/WebSocketState";
import { Box } from "@mui/system";
import { Cell } from "../cell";

const Board = () => {
  const gameMap = useAppSelector(selectedMap);

  useEffect(() => {
    console.log("MAP:", gameMap);
  }, [gameMap]);

  return (
    <Box sx={{ margin: "10px" }}>
      {gameMap &&
        gameMap.split("\n").map((row, rowIndex) => (
          <Box key={rowIndex} sx={{ flexDirection: "row" }}>
            {Array.from(row).map((col, colIndex) => (
              <Box
                key={colIndex}
                sx={{ display: "inline-flex", flexDirection: "column" }}
              >
                <Cell
                  x={colIndex.toString()}
                  y={rowIndex.toString()}
                  value={col}
                />
              </Box>
            ))}
          </Box>
        ))}
    </Box>
  );
};

export default Board;
