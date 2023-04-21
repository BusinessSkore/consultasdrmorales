import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://nwt8fu19m1.execute-api.us-east-1.amazonaws.com/dev/",
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});
export default axiosInstance;
