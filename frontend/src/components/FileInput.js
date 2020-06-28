import React, { useContext } from "react";

import { Store } from "../store/context";

const FileInput = () => {
  const { uploadFiles } = useContext(Store);

  return (
    <input
      type="file"
      multiple
      accept=".txt"
      onChange={({ target }) => {
        uploadFiles(target.files);
        target.value = null;
      }}
    />
  );
};

export default FileInput;
