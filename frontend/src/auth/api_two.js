import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/";

export const fetchApi = async (method, url, data = null) => {
  const headers = {};

  if (data instanceof FormData) {
    headers['Content-Type'] = 'multipart/form-data';
  } else {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${url}`,
      headers,
      data
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Request failed");
  }
};
