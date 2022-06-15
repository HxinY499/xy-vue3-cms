declare const $store: any;
declare const $filters: any;
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $filters: any;
  }
}
