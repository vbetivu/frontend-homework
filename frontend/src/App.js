import React from "react";

import StoreProvider from "./store/context";
import Preview from "./components/Preview";
import SendButton from "./components/SendButton";
import Status from "./components/Status";
import DropZone from "./components/DropZone";
import FileInput from "./components/FileInput";

const App = () => (
  <StoreProvider>
    <DropZone className="app">
      <div className="content-wrapper">
        <div className="status-wrapper">
          <Status />
        </div>
        <div className="controls-wrapper">
          <FileInput />
          <SendButton />
        </div>
        <Preview />
      </div>
    </DropZone>
  </StoreProvider>
);

export default App;
