import React, { useState, useContext, createRef } from "react";

import { Store } from "../store/context";

const DropZone = ({ children, className }) => {
  const { uploadFiles } = useContext(Store);

  const [isDragAreaVisible, setDragAreaVisibility] = useState(false);
  const ref = createRef();

  const showDragArea = () => setDragAreaVisibility(true);
  const hideDragArea = () => setDragAreaVisibility(false);

  const classes = [isDragAreaVisible && "drop-zone", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={ref}
      className={classes}
      onDragEnter={showDragArea}
      onDragLeave={(e) => {
        if (e.target === ref.current) {
          hideDragArea();
        }
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();

        hideDragArea();

        uploadFiles(e.dataTransfer.files);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {children}
    </div>
  );
};

export default DropZone;
