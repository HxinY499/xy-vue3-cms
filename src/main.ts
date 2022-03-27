import { createApp } from "vue";
import {
  ElButton,
  ElTabs,
  ElTabPane,
  ElForm,
  ElInput,
  ElFormItem,
  ElCheckbox,
  ElLink,
  ElNotification,
} from "element-plus";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "normalize.css";
import "element-plus/dist/index.css";
import "./index.less";

const app = createApp(App);

const components = [
  ElButton,
  ElTabs,
  ElTabPane,
  ElForm,
  ElInput,
  ElFormItem,
  ElCheckbox,
  ElLink,
];

for (const cpn of components) {
  app.component(cpn.name, cpn);
}

app.use(store);
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
