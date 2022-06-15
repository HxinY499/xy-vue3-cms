<template>
  <div class="page-search-wrapper">
    <xy-form v-bind="searchFormConfig" v-model="formData">
      <template #footer>
        <div class="btns">
          <el-button
            size="medium"
            :icon="`el-refresh`"
            @click="handlePageSearchReset"
          >
            重置
          </el-button>
          <el-button
            type="primary"
            size="medium"
            :icon="`el-search`"
            @click="handlePageSearchQuery"
          >
            查询
          </el-button>
        </div>
      </template>
    </xy-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import XyForm from "@/components/form";
import { useInitFormData } from "@/utils/hooks";
import { IForm } from "../../form";

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object as PropType<IForm>,
      required: true,
    },
    query: {
      type: Function,
      default: () => new Function(),
    },
  },
  components: {
    XyForm,
  },
  emits: ["onQuery", "onReset"],
  setup(props, { emit }) {
    const formData = useInitFormData(props.searchFormConfig?.formFields);

    const handlePageSearchReset = () => {
      for (const field of props.searchFormConfig?.formFields ?? []) {
        formData.value[field.name] = undefined;
      }
      emit("onReset");
    };

    const handlePageSearchQuery = () => {
      emit("onQuery", formData.value);
    };

    return {
      formData,
      handlePageSearchReset,
      handlePageSearchQuery,
    };
  },
});
</script>

<style lang="less" scoped>
.page-search-wrapper {
  padding: 20px;
  padding-top: 30px;
  background-color: #fff;
}
.btns {
  text-align: right;
  padding: 0 50px 0 0;
}
</style>
