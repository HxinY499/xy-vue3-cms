export interface IColumn {
  prop?: string;
  label?: string;
  minWidth?: number | string;
  slotName?: "status" | "time" | "operate";
  align?: "left" | "center" | "right";
  headerAlign?: "left" | "center" | "right";
  fixed?: true | "left" | "right";
  render?: ({ row: any, name: string }) => number | string;
}
