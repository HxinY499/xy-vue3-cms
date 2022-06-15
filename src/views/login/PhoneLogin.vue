<template>
  <el-form
    :model="form"
    label-width="auto"
    :rules="phoneFormRule"
    ref="formRef"
  >
    <el-form-item label="手机号" prop="phoneNumber">
      <el-input v-model="form.phoneNumber" />
    </el-form-item>
    <el-form-item label="验证码" prop="verificationCode">
      <div class="code-wrapper">
        <el-input v-model="form.verificationCode" />
        <el-button
          type="primary"
          class="code-btn"
          @click="fetchVerificationCode"
          >获取验证码</el-button
        >
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { ElForm } from "element-plus";
import { phoneFormRule } from "./config";

export default defineComponent({
  setup() {
    const form = reactive({
      phoneNumber: "",
      verificationCode: "",
    });

    const formRef = ref<InstanceType<typeof ElForm>>();

    const handleLoginAction = () => {
      formRef.value?.validate(() => {
        alert("暂未实现");
      });
    };

    return {
      form,
      phoneFormRule,
      formRef,
      handleLoginAction,
    };
  },
});
</script>

<style lang="less" scoped>
.code-wrapper {
  width: 100%;
  display: flex;
  .code-btn {
    margin-left: 10px;
  }
}
</style>
