import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = "http://localhost:5000/api/";

export const fetchWithAuth = async (method, url, data = null) => {
  let accessToken = Cookies.get('accessToken');
  while (!accessToken) {
    await new Promise(resolve => setTimeout(resolve, 100));
    accessToken = Cookies.get('accessToken');
  }
  const headers = {
    "Authorization": `Bearer ${accessToken}`,
  };

  if (method.toUpperCase() !== 'DELETE') {
    if (data instanceof FormData) {
      headers['Content-Type'] = 'multipart/form-data';
    } else {
      headers['Content-Type'] = 'application/json';
    }
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







