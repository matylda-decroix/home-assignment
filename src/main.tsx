import "./index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { DraggableWrapper } from "./DraggableWrapper.tsx";

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <DraggableWrapper>
          <App />
        </DraggableWrapper>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
