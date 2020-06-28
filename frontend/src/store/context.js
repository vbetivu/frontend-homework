import React, { createContext, useReducer } from "react";

import {
  ADD_FILE_CONTENT,
  REMOVE_FILE,
  CLEAR_FILES,
  SEND_EMAILS_START,
  SEND_EMAILS_SUCCESS,
  SEND_EMAILS_ERROR,
} from "./actionTypes";
import { sendEmails, removeFile, uploadFiles } from "./actions";

const Store = createContext({
  files: [],
  status: null,
  dispatch: () => {},
});

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_FILE_CONTENT:
      return {
        ...state,
        files: [...state.files, payload],
      };
    case REMOVE_FILE:
      return {
        ...state,
        files: state.files.filter(({ name }) => name !== payload),
        status: null,
      };
    case CLEAR_FILES:
      return {
        ...state,
        files: [],
      };
    case SEND_EMAILS_START:
      return {
        ...state,
        status: {
          type: "PENDING",
        },
      };
    case SEND_EMAILS_SUCCESS:
      return {
        files: [],
        status: {
          type: "SUCCESS",
          message: "Emails Sent Successfully!",
        },
      };
    case SEND_EMAILS_ERROR:
      return {
        ...state,
        status: {
          type: "ERROR",
          message: payload.error,
          emails: payload.emails,
          email: payload.email,
        },
      };

    default:
      return state;
  }
};

const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, {
    files: [],
    status: null,
  });

  return (
    <Store.Provider
      value={{
        files: store.files,
        status: store.status,
        uploadFiles: uploadFiles(dispatch),
        removeFile: removeFile(dispatch),
        sendEmails: sendEmails(dispatch),
      }}
    >
      {children}
    </Store.Provider>
  );
};

export { Store };

export default StoreProvider;
