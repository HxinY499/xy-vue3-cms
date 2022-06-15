export interface IPagePayload {
  pageName:
    | "users"
    | "department"
    | "role"
    | "menu"
    | "category"
    | "goods"
    | "story";
  queryInfo: any;
  id?: number;
}
