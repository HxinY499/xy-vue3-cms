import { createApp } from "vue";
import { ElNotification } from "element-plus/lib/components";
import ElementPlus from "element-plus";
import registerElementPlus from "@/utils/registerElementPlus";
import registerProperties from "@/utils/registerProperties";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "normalize.css";
import "./index.less";

const app = createApp(App);

app.use(store);

registerElementPlus(app);
registerProperties(app);
app.use(ElementPlus);

app.use(router);
app.mount("#app");

// 刷新页面时可以在vuex里恢复token和用户相关的初始化信息
const userInfo = localStorage.getItem("vue3-userInfo");
const token = localStorage.getItem("vue3-token");
if (userInfo && token) {
  store.dispatch("user/getInitalUserInfoAction", {
    id: JSON.parse(userInfo).id,
    token: JSON.parse(token),
  });
} else {
  router.push("/login");
  ElNotification({
    title: "登录信息已过期，请重新登录",
    type: "warning",
  });
}
