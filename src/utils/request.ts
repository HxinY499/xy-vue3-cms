import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ElNotification } from "element-plus";
import router from "@/router";
import storage from "./storage";
// import { useUserStore } from "/@/store/modules/user";

class Request {
  private instance: AxiosInstance;

  private readonly options: AxiosRequestConfig;

  constructor(options: AxiosRequestConfig) {
    this.options = options;
    this.instance = axios.create(options);

    this.instance.interceptors.request.use(
      (config) => {
        const token = storage.get("vue3-token");
        if (token) {
          config.headers!.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (err) => {
        return err;
      }
    );

    this.instance.interceptors.response.use(
      (res) => {
        // 拦截响应的数据
        return res.data;
      },
      (err) => {
        console.log("网络请求出错", err.response);
        if (err.response.data === "无效的token~") {
          router.push("/login");
          ElNotification({
            title: "登录信息已过期，请重新登录",
            type: "warning",
          });
        }
        return err;
      }
    );
  }

  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, AxiosResponse<T>>(config)
        .then((res) => {
          resolve(res as unknown as Promise<T>);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  get<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: "GET" });
  }

  post<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: "POST" });
  }

  patch<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: "PATCH" });
  }

  delete<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: "DELETE" });
  }
}

export default Request;
