import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

/* 
help      - returns valid commands
new L     - starts new session, L=1|2|3|4
map       - returns the current map
open X Y  - opens cell at X,Y coordinates 
*/

export interface WebSocketState {
  value: string;
  loading: boolean;
  message: string;
  sendMessage: string;
  gameMap: string;
  stopGame: boolean;
}

const initialState: WebSocketState = {
  value: '',
  loading: false,
  message: '',
  sendMessage: '',
  gameMap: '',
  stopGame: false,
};

export const webSocketSlice = createSlice({
  name: 'websockets',
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      state.loading = true;
      state.sendMessage = action.payload;
    },
    getMessage: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    getMap: (state, action) => {
      state.loading = false;
      state.message= '';
      state.gameMap = action.payload;
    },
    startGame: (state) => {
      state.stopGame = false;
    },
    gameOver: (state) => {
      state.stopGame = true;
    },
  },
});

export const {sendMessage, getMessage, getMap, startGame, gameOver} = webSocketSlice.actions;

export const selectMessage = (state: RootState) => state.webSocket.message;
export const selectedSendMessage = (state: RootState) => state.webSocket.sendMessage;
export const selectedMap = (state: RootState) => state.webSocket.gameMap;
export const appLoading = (state: RootState) => state.webSocket.loading;
export const isGameOver  = (state: RootState) => state.webSocket.stopGame;

export default webSocketSlice.reducer;
