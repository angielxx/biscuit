import axios from "axios";

const instance = axios.create({
  baseURL: "j8a706.p.ssafy.io/",
})

instance.defaults.withCredentials = true;

export default instance;