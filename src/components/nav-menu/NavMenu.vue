<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/logo.png" alt="logo" />
      <span v-show="!collapse" class="title">HEXINYU-CMS</span>
    </div>
    <div v-if="menusData.loading" class="loading">加载中...</div>
    <el-menu
      v-else
      :collapse="collapse"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :collapse-transition="false"
      :default-active="currentMenuId"
    >
      <template v-for="item in menusData.menus" :key="item.id">
        <!-- 判断二级菜单 -->
        <template v-if="item.children?.length > 0">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon><el-home-filled /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuClick(subitem)"
              >
                <!-- <el-icon><el-notebook /></el-icon> -->
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.id + ''">
            <!-- <el-icon><el-notebook /></el-icon> -->
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { routeMapToMenu } from "@/utils/menu";
import { useUserData } from "@/utils/hooks";

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    let menusData = useUserData();

    // 获取当前路由对应的菜单id
    let currentMenuId = computed(() => {
      const currentMenu = routeMapToMenu(menusData.menus, route.path);
      currentMenuId = currentMenu?.id + "";
      return currentMenuId;
    });

    const handleMenuClick = (route) => {
      currentMenuId = route.id;
      router.push(route.url);
    };

    return {
      menusData,
      handleMenuClick,
      currentMenuId,
    };
  },
});
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;
  .loading {
    color: #fff;
    text-align: center;
  }

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 5px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  // 目录
  .el-menu {
    border: none;
    .el-sub-menu {
      background-color: #001529 !important;
      // 二级菜单 ( 默认背景 )
      .el-menu-item {
        padding-left: 50px !important;
        background-color: #0c2135 !important;
      }
    }
    ::v-deep .el-sub-menu__title {
      padding-left: 15px !important;
      background-color: #001529 !important;
    }

    .el-icon {
      padding-right: 15px;
    }

    // hover 高亮
    .el-menu-item:hover {
      color: #fff !important; // 菜单
      background-color: #0a60bd !important;
    }

    .el-menu-item.is-active {
      color: #fff !important;
      background-color: #0a60bd !important;
    }
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
