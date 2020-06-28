const API = {};

API.sendEmails = (emails) => {
  if (emails.length) {
    return fetch("https://frontend-homework.togglhire.vercel.app/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emails,
      }),
    });
  }

  return Promise.reject({ error: "Uploaded files are empty." });
};

export default API;
