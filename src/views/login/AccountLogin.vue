<template>
  <el-form
    :model="form"
    label-width="auto"
    :rules="accountFormRule"
    ref="formRef"
  >
    <el-form-item label="账号" prop="account">
      <el-input v-model="form.account" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" show-password />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import { ElForm } from "element-plus";
import storage from "@/utils/storage";
import { accountFormRule } from "./config";

export default defineComponent({
  setup() {
    const store = useStore();

    const form = reactive({
      account: "",
      password: "",
    });

    const formRef = ref<InstanceType<typeof ElForm>>();

    const handleLoginAction = (cachePassword: boolean) => {
      const account = {
        account: form.account,
        password: form.password,
      };
      formRef.value?.validate(() => {
        if (cachePassword) {
          // TODO 虚假的记住密码，具体逻辑暂不实现
          storage.set("account", account);
        } else {
          storage.delete("account");
        }
        store.dispatch("user/accountLoginAction", account);
      });
    };

    return {
      form,
      accountFormRule,
      formRef,
      handleLoginAction,
    };
  },
});
</script>
