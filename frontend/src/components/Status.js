import React, { useContext } from "react";

import { Store } from "../store/context";
import Loading from "./Loading";

const Status = () => {
  const { files, status } = useContext(Store);

  if (!status) return null;

  const { type, message, email, emails } = status;

  return (
    <div>
      {type === "PENDING" ? <Loading /> : <h4>{message}</h4>}
      {(email || emails) && (
        <ul className="status-list">
          {email && (
            <li>
              File: {files.find(({ value }) => value.includes(email)).name}{" "}
              -&gt; Email: {email}
            </li>
          )}
          {emails && emails.map((address) => <li key={address}>{address}</li>)}
        </ul>
      )}
    </div>
  );
};

export default Status;
