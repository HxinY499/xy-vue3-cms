import { watch, reactive } from "vue";
import { useStore } from "vuex";

export function useUserData() {
  const store = useStore();
  const { userLoading, userMenus } = store.state.user;
  const menusData = reactive({
    loading: userLoading,
    menus: userMenus,
  });
  watch(store.state.user, () => {
    menusData.loading = store.state.user.userLoading;
    menusData.menus = store.state.user.userMenus;
  });
  return menusData;
}
