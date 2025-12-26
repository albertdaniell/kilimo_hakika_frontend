
const axios = require("axios");

export const AxiosGetService = async (url, isOpenUrl = false) => {
  let headers = {
    "Content-Type": "application/json",
  };

  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("access_token");
  }

  if (token && !isOpenUrl) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await axios.get(url, { headers });
  return response;
};

const AxiosPostService = async (url, data, isOpenUrl = false) => {
  let headers = {
    "Content-Type": "application/json",
  };

  // ✅ Get token safely (Next.js safe)
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("access_token");
  }

  // ✅ Attach token if required
  if (token && !isOpenUrl) {
    headers.Authorization = `Bearer ${token}`;
  }

  // ✅ Single axios call
  const response = await axios.post(url, data, { headers });
  return response;
};

export const AxiosPutService = async (url, data, isOpenUrl = false) => {
  let headers = {
    "Content-Type": "application/json",
  };

  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("access_token");
  }

  if (token && !isOpenUrl) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await axios.put(url, data, { headers });
  return response;
};

export const AxiosDeleteService = async (url, isOpenUrl = false) => {
  let headers = {
    "Content-Type": "application/json",
  };

  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("access_token");
  }

  if (token && !isOpenUrl) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await axios.delete(url, { headers });
  return response;
};

export {
  AxiosGetService,
  AxiosPostService,
  AxiosPutService,
  AxiosDeleteService,
};
