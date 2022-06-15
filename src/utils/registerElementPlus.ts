import "element-plus/dist/index.css";
import {
  ElButton,
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElButtonGroup,
  ElCol,
  ElRow,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElConfigProvider,
  ElDialog,
  ElImage,
  ElTree,
  ElDescriptions,
  ElDescriptionsItem,
  ElTag,
  ElCard,
  ElTooltip,
  ElNotification,
  ElIcon,
  ElEmpty,
  ElDrawer,
} from "element-plus/lib/components";
import {
  Fold,
  Expand,
  Notebook,
  HomeFilled,
  Bell,
  ChatDotRound,
  Star,
  Search,
  Refresh,
} from "@element-plus/icons-vue";

const icons = [
  Fold,
  Expand,
  Notebook,
  HomeFilled,
  Bell,
  ChatDotRound,
  Star,
  Search,
  Refresh,
];
icons.forEach((icon) => {
  // 改变来自element的icon名称
  // eslint-disable-next-line
  // @ts-ignore
  icon.name = `El${icon.name}`;
});
const components = [
  ElButton,
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElLink,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElButtonGroup,
  ElCol,
  ElRow,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElConfigProvider,
  ElDialog,
  ElImage,
  ElTree,
  ElDescriptions,
  ElDescriptionsItem,
  ElTag,
  ElCard,
  ElTooltip,
  ElNotification,
  ElIcon,
  ElEmpty,
  ElDrawer,
];

const registerElementPlus = (app) => {
  for (const cpn of components) {
    app.component(cpn.name, cpn);
  }
  for (const icon of icons) {
    app.component(icon.name, icon);
  }
};

export default registerElementPlus;
