<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="collapse ? '60px' : '210px'">
        <nav-menu :collapse="collapse" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-header @foldChange="foldChange" />
        </el-header>
        <el-main class="page-content">
          <div class="content">
            <div v-if="userData.loading">加载中</div>
            <router-view v-else-if="permission === true" />
            <not-found v-else-if="permission === false" />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useUserData } from "@/utils/hooks";
import { routeMapToMenu } from "@/utils/menu";
import NavMenu from "@/components/nav-menu";
import NavHeader from "@/components/nav-header";
import NotFound from "../not-found/index.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  components: {
    NavMenu,
    NavHeader,
    NotFound,
  },
  setup() {
    const route = useRoute();
    const userData = useUserData();
    const collapse = ref(false);
    const foldChange = (fold) => {
      collapse.value = fold;
    };

    // 权限控制
    const permission = computed(() => {
      if (
        [
          "/main",
          "/main/workplace",
          "/main/user-info",
          "/main/settings",
        ].includes(route.path)
      ) {
        return true;
      } else {
        const findMenu = routeMapToMenu(
          userData?.value?.menus || [],
          route.path
        );
        return !!findMenu;
      }
    });

    return {
      foldChange,
      collapse,
      permission,
      userData,
    };
  },
});
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 48px);

  .content {
    overflow: auto;
    background-color: #fff;
  }
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
</style>