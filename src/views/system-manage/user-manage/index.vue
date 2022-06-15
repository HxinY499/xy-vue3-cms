<template>
  <div>
    <table-page
      :searchConfig="{ searchFormConfig, query: queryUserList }"
      :contentConfig="{
        title: '用户列表',
        slotName: ['handler'],
        columns: columns,
        query: queryUserList,
        pageData: {
          tableData: $store.state.main.userList,
          totalCount: $store.state.main.userTotalCount,
        },
      }"
      @onReset="handleReset"
      @onQuery="handleQuery"
      v-loading="loading"
    >
      <template #header-operate>
        <el-button type="primary" size="medium" @click="handleLineEdit('add')"
          >新建</el-button
        >
      </template>
      <template #operate="scopeProps">
        <el-button
          size="mini"
          type="text"
          @click="handleLineEdit('edit', scopeProps.row)"
          :icon="Edit"
          >编辑</el-button
        >
        <el-button
          size="mini"
          type="text"
          @click="handleLineDelete"
          :icon="Delete"
          >删除</el-button
        >
      </template>
    </table-page>
    <el-drawer v-model="drawer" title="编辑">
      <xy-form v-model="formData" v-bind="modalFormConfigRef" />
      <template #footer>
        <el-button @click="drawer = false">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit">确定</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import TablePage from "@/components/table-page";
import XyForm from "@/components/form";
import { searchFormConfig, columns, modalFormConfig } from "./config";
import { Delete, Edit } from "@element-plus/icons-vue";

export default defineComponent({
  components: {
    TablePage,
    XyForm,
  },
  setup() {
    const initModalFormData = {
      name: "",
      realname: "",
      cellphone: "",
      roleId: "",
      departmentId: "",
    };
    const store = useStore();
    const loading = ref(false);
    const drawer = ref(false);
    const formData = ref(initModalFormData);
    const modalFormConfigRef = computed(() => {
      return modalFormConfig({
        roleOption: store.state.main?.roleList?.map((o) => ({
          value: o.id,
          label: o.name,
        })),
        deptOption: store.state.main?.departmentList?.map((o) => ({
          value: o.id,
          label: o.name,
        })),
      });
    });

    onMounted(() => {
      store.dispatch("main/getPageListDataAction", {
        pageName: "role",
      });
      store.dispatch("main/getPageListDataAction", {
        pageName: "department",
      });
    });

    const queryUserList = (queryInfo) => {
      loading.value = true;
      store
        .dispatch("main/getPageListDataAction", {
          pageName: "users",
          queryInfo: { offset: 0, size: 10, ...queryInfo },
        })
        .finally(() => {
          loading.value = false;
        });
    };

    const handleReset = (e) => {
      console.log("reset", e);
    };
    const handleQuery = () => {};
    const handleLineEdit = (type, current = {}) => {
      formData.value = { ...initModalFormData, ...current };
      drawer.value = true;
    };
    const handleFormSubmit = async () => {
      await store.dispatch("main/editPageDataAction", {
        pageName: "users",
        queryInfo: { ...formData.value },
      });
      drawer.value = false;
    };
    const handleLineDelete = () => {};

    return {
      searchFormConfig,
      handleQuery,
      handleReset,
      columns,
      queryUserList,
      handleLineEdit,
      handleLineDelete,
      loading,
      drawer,
      Delete,
      Edit,
      formData,
      modalFormConfigRef,
      handleFormSubmit,
    };
  },
});
</script>
