export interface IBreadcrumb {
  name: string;
  path?: string;
}

export function routeMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = [];
  routeMapToMenu(userMenus, currentPath, breadcrumbs);
  return breadcrumbs;
}

/**
 * @description:
 */
/**
 * @description: 根据路由找到对应菜单，以及给面包屑加入当前路由数据
 * @param {array} userMenus 用户所有菜单数据
 * @param {string} currentPath 当前路径
 * @param {array} breadcrumbs 面包屑数据
 * @return {}
 */
export function routeMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: any[]
): any {
  const menus = userMenus.length > 0 ? userMenus : [];
  for (const menu of menus) {
    if (menu.type === 1) {
      const findMenu = routeMapToMenu(menu.children ?? [], currentPath);
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name });
        breadcrumbs?.push({ name: findMenu.name, path: findMenu.url });
        return findMenu;
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu;
    }
  }
}
