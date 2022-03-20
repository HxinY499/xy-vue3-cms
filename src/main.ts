import { createApp } from "vue";
import {
  ElButton,
  ElTable,
  ElAlert,
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElBacktop,
  ElBadge,
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
  ElTable,
  ElAlert,
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElBacktop,
  ElBadge,
];

for (const cpn of components) {
  app.component(cpn.name, cpn);
}

app.use(store);
app.use(router);
app.mount("#app");
