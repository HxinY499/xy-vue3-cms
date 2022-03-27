import Request from "../utils/request";
// import storage from "@/utils/storage";

const request = new Request({
  baseURL: "/api",
  timeout: 90000,
});

export default request;
