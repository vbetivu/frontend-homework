import React, { useContext } from "react";

import { Store } from "../store/context";

const SendButton = () => {
  const { sendEmails, files } = useContext(Store);

  const handleClick = () => {
    if (files.length) {
      sendEmails(files);
    }
  };

  return <button onClick={handleClick}>Send emails</button>;
};

export default SendButton;
