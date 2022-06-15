import { IPagePayload } from "../type";
import { getPageList, editPageData } from "@/service/main";

export default {
  namespaced: true,
  state: () => ({
    userList: [],
    userTotalCount: 0,
    roleList: [],
    roleTotalCount: 0,
    departmentList: [],
    departmentTotalCount: 0,
    menuList: [],
  }),
  mutations: {
    updateState(state, { key, value }) {
      state[key] = value;
    },
  },
  actions: {
    async getPageListDataAction({ commit }, payload: IPagePayload) {
      const pageName = payload.pageName;
      if (pageName.length === 0) return;
      const res = await getPageList(pageName, payload.queryInfo);
      const { totalCount, list } = res?.data;

      switch (payload.pageName) {
        case "users":
          commit("updateState", { key: "userTotalCount", value: totalCount });
          commit("updateState", { key: "userList", value: list });
          break;
        case "department":
          commit("updateState", {
            key: "departmentTotalCount",
            value: totalCount,
          });
          commit("updateState", { key: "departmentList", value: list });
          break;
        case "role":
          commit("updateState", { key: "roleTotalCount", value: totalCount });
          commit("updateState", { key: "roleList", value: list });
          break;
        case "menu":
          commit("updateState", { key: "menuList", value: list });
          break;
        case "category":
          commit("updateState", { key: "userTotalCount", value: totalCount });
          commit("updateState", { key: "userList", value: list });
          break;
        case "goods":
          commit("updateState", { key: "userTotalCount", value: totalCount });
          commit("updateState", { key: "userList", value: list });
          break;
        case "story":
          commit("updateState", { key: "userTotalCount", value: totalCount });
          commit("updateState", { key: "userList", value: list });
          break;
      }
    },

    async editPageDataAction({ dispatch }, payload: IPagePayload) {
      if (!payload.queryInfo?.id) return;
      const pageUrl = `/${payload.pageName}/${payload.queryInfo?.id}`;
      const pageData = payload.queryInfo;
      await editPageData(pageUrl, pageData);

      dispatch("getPageListDataAction", {
        pageName: payload.pageName,
        queryInfo: { offset: 0, size: 5 },
      });
    },
  },
};
