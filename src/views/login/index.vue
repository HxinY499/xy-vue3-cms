<template>
  <div class="login-wrapper">
    <h1 class="login-title">XY-CMS LOGIN</h1>
    <el-tabs type="border-card" stretch v-model="activeKey">
      <el-tab-pane label="账号登录" name="1">
        <account-login ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane label="手机号登录" name="2">
        <phone-login ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="login-config">
      <el-checkbox v-model="cachePassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleLogin"
      >立即登录</el-button
    >
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, watch } from "vue";
import AccountLogin from "./AccountLogin.vue";
import PhoneLogin from "./PhoneLogin.vue";

export default defineComponent({
  components: {
    AccountLogin,
    PhoneLogin,
  },
  setup() {
    const cachePassword = ref(false);
    const accountRef = ref<InstanceType<typeof AccountLogin>>();
    const phoneRef = ref<InstanceType<typeof PhoneLogin>>();
    const activeKey = ref<string | number>("1");

    watch(activeKey, (newValue) => {
      // 切换tab页时清空上一个tab表单的内容和校验状态
      const ref = newValue === "1" ? phoneRef.value : accountRef.value;
      ref?.formRef?.resetFields();
    });

    const handleLogin = () => {
      const ref = activeKey.value === "1" ? accountRef.value : phoneRef.value;
      ref?.handleLoginAction(cachePassword.value);
    };

    return {
      cachePassword,
      activeKey,
      phoneRef,
      accountRef,
      handleLogin,
    };
  },
});
</script>

<style scoped lang='less'>
.login-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 400px;
  height: 300px;
  margin: auto;
  h1.login-title {
    text-align: center;
  }

  .login-config {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    margin-bottom: 5px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>