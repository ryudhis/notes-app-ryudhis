import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

instance.defaults.headers.common["Content-Type"] = "application/json";

export default instance;
