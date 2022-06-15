import { ref, computed } from "vue";
import { useStore } from "vuex";

export function useUserData() {
  const store = useStore();
  const menusData = computed(() => ({
    loading: store.state.user.userLoading,
    menus: store.state.user.userMenus,
  }));
  return menusData;
}

interface IFormData {
  [key: string]: any;
}
export function useInitFormData(formFields) {
  const originFormData: IFormData = {};
  const fields = formFields ?? [];

  for (const field of fields) {
    originFormData[field.name] = undefined;
  }
  const formData = ref({ ...originFormData });
  return formData;
}
