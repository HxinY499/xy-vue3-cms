import { createStore } from "vuex";
import user from "./user/index";
import main from "./main/index";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    main,
  },
});
