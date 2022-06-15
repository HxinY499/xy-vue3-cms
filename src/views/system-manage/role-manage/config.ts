import { IColumn } from "@/components/table/type";

export const searchFormConfig = {
  formFields: [
    {
      name: "name",
      type: "input",
      label: "角色名称",
      placeHolder: "请输入角色名称",
      rules: [],
    },
    {
      name: "intro",
      type: "input",
      label: "权限介绍",
      placeHolder: "请输入权限介绍",
      rules: [],
    },
    {
      name: "createAt",
      type: "datepicker",
      label: "创建时间",
      rules: [],
      otherOption: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        type: "daterange",
      },
    },
  ],
  labelWidth: "100px",
  // fieldStyle: { padding: "10px 40px" },
  // colLayout: { span: 8 },
};

export const modalFormConfig = () => ({
  formFields: [
    {
      name: "name",
      type: "input",
      label: "角色名称",
      placeHolder: "请输入角色名称",
    },
    {
      name: "intro",
      type: "input",
      label: "角色描述",
      placeHolder: "请输入角色描述",
    },
  ],
  colLayout: { span: 24 },
});

export const columns: IColumn[] = [
  { prop: "name", label: "角色名称", minWidth: "120" },
  { prop: "intro", label: "角色权限", minWidth: "120" },
  { prop: "createAt", label: "创建时间", minWidth: "250", slotName: "time" },
  { prop: "updateAt", label: "更新时间", minWidth: "250", slotName: "time" },
  { label: "操作", minWidth: "120", align: "center", slotName: "operate" },
];
