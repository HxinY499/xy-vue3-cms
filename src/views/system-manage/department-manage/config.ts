import { IColumn } from "@/components/table/type";

export const searchFormConfig = {
  formFields: [
    {
      name: "name",
      type: "input",
      label: "部门名称",
      placeHolder: "请输入部门名称",
      rules: [],
    },
    {
      name: "leader",
      type: "input",
      label: "部门领导",
      placeHolder: "请输入部门领导",
      rules: [],
    },
    {
      name: "createAt",
      type: "datepicker",
      label: "创建时间",
      rules: [],
      formFieldProps: {
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

export const modalFormConfig = ({ deptOption }) => ({
  formFields: [
    {
      name: "name",
      type: "input",
      label: "部门名称",
      placeHolder: "请输入部门名称",
    },
    {
      name: "parentId",
      type: "select",
      label: "上级部门",
      placeHolder: "请选择上级部门",
      options: deptOption,
    },
    {
      name: "leader",
      type: "input",
      label: "领导名称",
      placeHolder: "请输入领导名称",
    },
  ],
  colLayout: { span: 24 },
});

export const columns: IColumn[] = [
  { prop: "name", label: "部门名称", minWidth: "120" },
  { prop: "leader", label: "部门领导", minWidth: "120" },
  { prop: "parentId", label: "上级部门", minWidth: "120" },
  { prop: "createAt", label: "创建时间", minWidth: "250", slotName: "time" },
  { prop: "updateAt", label: "更新时间", minWidth: "250", slotName: "time" },
  { label: "操作", minWidth: "120", align: "center", slotName: "operate" },
];
