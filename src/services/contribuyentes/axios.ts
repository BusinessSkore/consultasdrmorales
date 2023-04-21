import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://ejz1kthb6d.execute-api.us-east-1.amazonaws.com/dev/",
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});
export default axiosInstance;
