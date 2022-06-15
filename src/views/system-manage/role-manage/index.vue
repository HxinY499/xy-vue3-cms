<template>
  <div>
    <table-page
      :searchConfig="{ searchFormConfig, query: queryUserList }"
      :contentConfig="{
        title: '角色列表',
        slotName: ['handler'],
        columns: columns,
        query: queryUserList,
        pageData: {
          tableData: $store.state.main.roleList,
          totalCount: $store.state.main.roleTotalCount,
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
import { defineComponent, ref, computed } from "vue";
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
      intro: "",
    };
    const store = useStore();
    const loading = ref(false);
    const drawer = ref(false);
    const formData = ref(initModalFormData);
    const modalFormConfigRef = computed(() => {
      return modalFormConfig();
    });

    const queryUserList = (queryInfo) => {
      loading.value = true;
      store
        .dispatch("main/getPageListDataAction", {
          pageName: "role",
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
        pageName: "role",
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
