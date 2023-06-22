import axios from "axios";
import Cookies from "js-cookie";
export const BASE_URL = "http://192.168.0.12:3495/api";

const AxiosCall = async (method, url, params) => {
  try {
    const token = Cookies.get("ac_t");
    const headers = {
      token: token,
    };

    const response = await axios({
      url: `${BASE_URL}${url}`,
      method: method,
      data: params,
      headers: headers,
    });

    return response.data;
  } catch (error) {
    if (error.response?.status === 403) {
      window.location.assign("/login");
      localStorage.removeItem("user");
    }
    throw error;
  }
};

export default AxiosCall;
