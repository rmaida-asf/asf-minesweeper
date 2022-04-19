import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";
import WebSocketReducer from '../features/game/WebSocketState';
import WebSocketSaga from '../features/game/WebSocketSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    webSocket: WebSocketReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(WebSocketSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
