import { Action } from "@reduxjs/toolkit";
import { EventChannel, eventChannel } from "redux-saga";
import {
  put,
  call,
  take,
  takeEvery,
  all,
  fork,
  select,
} from "redux-saga/effects";
import {
  getMessage,
  selectedSendMessage,
  getMap,
} from "../game/WebSocketState";

let webSocket: WebSocket;

function initWebsocket(sendMsg: string) {
  return eventChannel((emitter) => {
    if (
      !webSocket ||
      webSocket.readyState === WebSocket.CLOSED ||
      webSocket.readyState === WebSocket.CLOSING
    ) {
      webSocket = new WebSocket("wss://hometask.eg1236.com/game1/");
      webSocket.onopen = () => {
        console.log("opening...");
        webSocket.send(sendMsg);
      };
    } else {
      webSocket.send(sendMsg);
    }

    webSocket.onerror = (error) => {
      console.log("WebSocket error " + error);
      console.dir(error);
    };
    webSocket.onmessage = (e) => {
      if (e.data) {
        const sentMsg = sendMsg.includes(" ")
          ? sendMsg.substring(0, sendMsg.indexOf(" "))
          : sendMsg;
        switch (sentMsg) {
          case "map":
            const mapMessage = e.data.replace("map:", "").trim();
            return emitter(getMap(mapMessage));
          default:
            return emitter(getMessage(e.data));
        }
      }
    };

    return () => {
      console.log("Socket off");
    };
  });
}

function* initializeWebSocketsChannel() {
  const sendMsg: string = yield select(selectedSendMessage);
  const channel: EventChannel<any> = yield call(initWebsocket, sendMsg);
  const action: Action<any> = yield take(channel);
  yield put(action);
}

export function* helpCommands() {
  yield takeEvery("websockets/sendMessage", initializeWebSocketsChannel);
}

function* WebSocketSaga() {
  yield all([fork(helpCommands)]);
}

export default WebSocketSaga;
