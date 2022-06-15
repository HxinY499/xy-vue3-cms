<template>
  <el-table
    :data="data"
    stripe
    style="width: 100%"
    highlight-current-row
    border
  >
    <el-table-column
      v-for="(column, index) in columns"
      :key="index"
      :prop="column.prop"
      :label="column.label"
      :width="column.width"
      :min-width="column.minWidth"
      :align="column.align || 'left'"
      :header-align="
        (column.headerAlign ? column.headerAlign : column.align) || 'left'
      "
      :fixed="column.fixed"
    >
      <template #default="scope">
        <template v-if="column.render">
          {{ column.render({ row: scope.row, name: column.prop }) }}
        </template>
        <slot
          v-else-if="column.slotName"
          :name="column.slotName"
          :row="scope.row"
          :prop="column.prop"
        >
          {{ scope.row[column.prop] }}
        </slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IColumn } from "./type";

export default defineComponent({
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array as PropType<IColumn[]>,
      default: () => [],
    },
  },
  setup() {},
});
</script>
