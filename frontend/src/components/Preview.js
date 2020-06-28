import React, { useContext } from "react";

import { Store } from "../store/context";

const Preview = () => {
  const { files, removeFile } = useContext(Store);

  return (
    <ul className="files-list">
      {files.length ? (
        files.map(({ name, value }, index) => (
          <li className="list-item" key={index}>
            <p>
              {name} - {new Set(value).size} unique entries
            </p>
            <button onClick={() => removeFile(name)}>Remove</button>
          </li>
        ))
      ) : (
        <li className="list-item">Choose or drop &quot;.txt&quot; files</li>
      )}
    </ul>
  );
};

export default Preview;
