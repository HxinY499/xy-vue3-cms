<template>
  <div class="table-page-wrapper">
    <page-search
      class="table-page-search"
      v-bind="searchConfig"
      @onQuery="handleTablePageQuery"
      @onReset="handleTablePageReset"
    />
    <page-content v-bind="contentConfig" @onQuery="handleTablePageQuery">
      <template #header-operate="scopeProps"
        ><slot name="header-operate" v-bind="scopeProps"></slot
      ></template>
      <template #operate="scopeProps">
        <slot name="operate" v-bind="scopeProps"></slot>
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import PageSearch from "./page-search";
import PageContent from "./page-content";

export default defineComponent({
  props: {
    searchConfig: {
      type: Object,
      required: true,
    },
    contentConfig: {
      type: Object,
      required: true,
    },
  },
  components: {
    PageContent,
    PageSearch,
  },
  setup(props, { emit }) {
    let queryParams = reactive({});
    const handleTablePageReset = (event) => {
      emit("onReset", event);
    };

    const handleTablePageQuery = (event) => {
      emit("onQuery", event);
      Object.assign(queryParams, event);
      props.searchConfig.query({ ...queryParams });
    };

    return {
      handleTablePageReset,
      handleTablePageQuery,
    };
  },
});
</script>

<style lang="less" scoped>
.table-page-wrapper {
  background-color: #f0f2f5;
}
.table-page-search {
  margin-bottom: 20px;
}
</style>
