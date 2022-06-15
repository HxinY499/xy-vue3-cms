<template>
  <div class="xy-form">
    <div class="form-header">
      <slot name="header"></slot>
    </div>
    <el-form :labelWidth="labelWidth">
      <el-row>
        <template v-for="(field, index) in formFields" :key="index">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="field.label"
              class="form-item"
              :style="{ ...fieldStyle, ...field.style }"
              :rules="field.rules"
              v-if="!field.isHidden"
            >
              <template v-if="['input', 'password'].includes(field.type)">
                <el-input
                  v-model="data[`${field.name}`]"
                  :placeholder="field.placeHolder"
                  :show-password="field.type === 'password'"
              /></template>
              <template v-else-if="field.type === 'select'">
                <el-select
                  v-model="data[`${field.name}`]"
                  :placeholder="field.placeHolder"
                  style="width: 100%"
                >
                  <el-option
                    v-for="option in field.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.label"
                  >
                    {{ option.label }}
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="field.type === 'datepicker'">
                <el-date-picker
                  v-model="data[`${field.name}`]"
                  v-bind="field.formFieldProps"
                  style="width: 100%"
                >
                </el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="form-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, computed, watch } from "vue";
import { IFormItem } from "./type";

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
    },
    labelWidth: {
      type: String,
      default: () => "80px",
    },
    formFields: {
      type: Array as PropType<IFormItem[]>,
      required: true,
      default: () => [],
    },
    fieldStyle: {
      type: Object,
      default: () => ({ padding: "10px 10px" }),
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // ≥1920px
        lg: 8, // ≥1200px
        md: 12, // ≥992px
        sm: 24, // ≥768px
        xs: 24, // <768px
      }),
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const data = computed(() => {
      return props.modelValue;
    });

    watch(
      data,
      (newValue) => {
        emit("update:modelValue", newValue);
      },
      { deep: true }
    );

    return {
      data,
    };
  },
});
</script>

<style lang="less" scoped>
</style>
