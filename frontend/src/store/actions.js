import API from "../API";
import {
  ADD_FILE_CONTENT,
  REMOVE_FILE,
  SEND_EMAILS_START,
  SEND_EMAILS_SUCCESS,
  SEND_EMAILS_ERROR,
  CLEAR_FILES,
} from "./actionTypes";

const uploadFiles = (dispatch) => (filesList) => {
  dispatch({ type: CLEAR_FILES });

  for (const file of filesList) {
    file.text().then((text) => {
      const value = text.split(/\r?\n/).filter(Boolean);

      dispatch({
        type: ADD_FILE_CONTENT,
        payload: { name: file.name, value },
      });
    });
  }
};

const removeFile = (dispatch) => (file) =>
  dispatch({
    type: REMOVE_FILE,
    payload: file,
  });

const sendEmails = (dispatch) => (files) => {
  dispatch({
    type: SEND_EMAILS_START,
  });

  const emails = [
    ...new Set(files.reduce((acc, { value }) => [...acc, ...value], [])),
  ];

  API.sendEmails(emails)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw err;
        });
      }
    })
    .then(() => dispatch({ type: SEND_EMAILS_SUCCESS }))
    .catch((err) =>
      dispatch({
        type: SEND_EMAILS_ERROR,
        payload: err?.error ? err : { error: "Network error." },
      })
    );
};

export { uploadFiles, removeFile, sendEmails };
