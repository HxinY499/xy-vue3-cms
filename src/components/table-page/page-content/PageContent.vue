<template>
  <div class="table-page-content-wrapper">
    <div class="header-title">
      <h3>{{ title }}</h3>
      <slot name="header-operate"></slot>
    </div>
    <xy-table :columns="columns" :data="pageData.tableData">
      <template #status="scope">
        <el-button
          :type="scope.row[scope.prop] ? 'success' : 'danger'"
          size="mini"
          plain
        >
          {{ $filters.showStatus(scope.row[scope.prop]) }}
        </el-button>
      </template>
      <template #time="scope">
        {{ $filters.formatTime(scope.row[scope.prop]) }}
      </template>
      <template #operate="scopeProps">
        <slot name="operate" v-bind="scopeProps"></slot>
      </template>
    </xy-table>
    <div class="pagination-wrapper">
      <el-pagination
        layout="sizes, prev, pager, next, total"
        v-model:currentPage="currentPage"
        v-model:pageSize="pageSize"
        @update:currentPage="handleCurrentPageChange"
        @update:pageSize="handlePageSizeChange"
        :total="pageData.totalCount"
        :page-sizes="[5, 10, 20, 100]"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import XyTable from "../../table";

export default defineComponent({
  props: {
    title: {
      type: String,
    },
    columns: {
      type: Array,
      default: () => [],
    },
    pageData: {
      type: Object,
      default: () => ({}),
    },
    query: {
      type: Function,
      default: () => new Function(),
    },
    slotName: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["onQuery"],
  components: {
    XyTable,
  },
  setup(props, { emit }) {
    const currentPage = ref(1);
    const pageSize = ref(5);
    onMounted(() => {
      emit("onQuery", {
        size: pageSize.value,
        offset: pageSize.value * (currentPage.value - 1),
      });
    });

    function handleCurrentPageChange(e) {
      queryData();
    }
    function handlePageSizeChange(e) {
      queryData();
    }
    async function queryData() {
      emit("onQuery", {
        size: pageSize.value,
        offset: pageSize.value * (currentPage.value - 1),
      });
    }
    return {
      currentPage,
      pageSize,
      handleCurrentPageChange,
      handlePageSizeChange,
    };
  },
});
</script>

<style lang="less" scoped>
.table-page-content-wrapper {
  padding: 20px;
  background-color: #fff;
  h3 {
    margin: 0;
  }
  .header-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .pagination-wrapper {
    display: flex;
    justify-content: end;
    margin-top: 5px;
  }
}
</style>
