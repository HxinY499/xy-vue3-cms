<template>
  <div class="nav-header">
    <el-icon class="menu-icon" @click="handleChangeFold">
      <el-fold v-if="!isFold" />
      <el-expand v-else />
    </el-icon>
    <div class="header-info-wrapper">
      <div class="history-record">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            v-for="item in breadcrumbs"
            :key="item.path"
            :to="item.path ? { path: item.path } : {}"
            >{{ item.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="user-operate">
        <el-icon class="user-operate-icon"><el-bell /></el-icon>
        <el-icon class="user-operate-icon"><el-chat-dot-round /></el-icon>
        <el-icon class="user-operate-icon"><el-star /></el-icon>
        <el-dropdown>
          <div class="user-info">
            <el-avatar
              class="avatar"
              :size="30"
              src="https://img1.baidu.com/it/u=3367183194,3011264058&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
            />
            <span class="username">{{ username }}</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>系统设置</el-dropdown-item>
              <el-dropdown-item divided @click="handleExit"
                >退出系统</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import storage from "@/utils/storage";
import { routeMapBreadcrumbs } from "@/utils/menu";

export default defineComponent({
  emits: ["foldChange"],
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    let isFold = ref(false);
    let username = computed(() => store.state.user.userInfo.name);
    const breadcrumbs = computed(() => {
      const userMenus = store.state.user.userMenus;
      const newBreadcrumbs = routeMapBreadcrumbs(userMenus, route.path);
      return newBreadcrumbs;
    });

    const handleChangeFold = () => {
      isFold.value = !isFold.value;
      emit("foldChange", isFold.value);
    };

    const handleExit = () => {
      storage.delete("vue3-token");
      storage.delete("vue3-userInfo");
      router.push("/login");
    };

    return {
      isFold,
      handleChangeFold,
      username,
      handleExit,
      breadcrumbs,
    };
  },
});
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    font-size: 28px !important;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
  .header-info-wrapper {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

    .history-record {
      font-size: 13px;
    }
    .user-operate {
      height: 100%;
      display: flex;
      align-items: center;
    }
    .user-operate-icon {
      font-size: 20px;
      padding: 0.3em;
      border-radius: 5px;
      margin-left: 10px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
    .el-dropdown {
      height: 100%;
    }
    .user-info {
      height: 100%;
      margin-left: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      .username {
        margin-left: 5px;
        font-size: 15px;
      }
    }
  }
}
</style>
