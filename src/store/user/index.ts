import {
  accountLoginService,
  getUserByIdService,
  getUserMenusService,
} from "@/service/user";
import storage from "@/utils/storage";
import router from "@/router/index";

export default {
  namespaced: true,
  state: () => {
    return {
      token: "",
      userInfo: {},
      userMenus: {},
    };
  },
  mutations: {
    saveToken(state, token) {
      state.token = token;
      storage.set("vue3-token", token);
    },
    saveUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      storage.set("vue3-userInfo", userInfo);
    },
    saveUserMenus(state, userMenus) {
      state.userMenus = userMenus;
    },
  },
  actions: {
    async accountLoginAction({ dispatch }, payload: any) {
      const res = await accountLoginService({
        name: payload.account,
        password: payload.password,
      });
      if (res) {
        dispatch("getInitalUserInfoAction", {
          id: res?.data?.id,
          token: res?.data?.token,
        });
        router.push("/main");
      }
    },

    async getInitalUserInfoAction({ commit }, { id, token }) {
      // 1.保存token
      commit("saveToken", token);

      // 2.获取用户信息
      const userInfo = await getUserByIdService(id);
      commit("saveUserInfo", userInfo?.data);

      // 3.用户菜单树
      const userMenus = await getUserMenusService(userInfo?.data?.role?.id);
      commit("saveUserMenus", userMenus?.data);
    },
  },
};
