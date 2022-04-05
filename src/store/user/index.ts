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
      userLoading: false,
      userInfo: storage.get("vue3-userInfo") || {},
      userMenus: {},
      publicMenu: [
        {
          id: "publicMenu-1",
          name: "系统功能",
          type: 1,
          children: [
            {
              id: "publicMenu-1-1",
              name: "工作台",
              type: 2,
              url: "/main/workplace",
              parentId: "publicMenu-1",
            },
            {
              id: "publicMenu-1-2",
              name: "系统设置",
              type: 2,
              url: "/main/settings",
              parentId: "publicMenu-1",
            },
            {
              id: "publicMenu-1-3",
              name: "个人信息",
              type: 2,
              url: "/main/user-info",
              parentId: "publicMenu-1",
            },
          ],
        },
      ],
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
    updateState(state, { key, value }) {
      state[key] = value;
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

    async getInitalUserInfoAction({ commit, state }, { id, token }) {
      commit("updateState", { key: "userLoading", value: true });
      // 1.保存token
      commit("saveToken", token);

      // 2.获取用户信息
      const userInfo = await getUserByIdService(id);
      commit("saveUserInfo", userInfo?.data);

      // 3.用户菜单树
      const userMenus = await getUserMenusService(userInfo?.data?.role?.id);
      const menus = state.publicMenu.concat(userMenus.data || []);
      commit("updateState", { key: "userMenus", value: menus });
      commit("updateState", { key: "userLoading", value: false });
    },
  },
};
