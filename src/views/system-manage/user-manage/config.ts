import { IColumn } from "@/components/table/type";

export const searchFormConfig = {
  formFields: [
    {
      name: "name",
      type: "input",
      label: "用户名",
      placeHolder: "请输入用户名",
      rules: [],
    },
    {
      name: "realname",
      type: "input",
      label: "真实姓名",
      placeHolder: "请输入真实姓名",
      rules: [],
    },
    {
      name: "cellphone",
      type: "input",
      label: "手机号码",
      placeHolder: "请输入手机号码",
      rules: [],
    },
    {
      name: "enable",
      type: "select",
      label: "状态",
      placeHolder: "请选择状态",
      rules: [],
      options: [
        { label: "启用", value: 1 },
        { label: "禁用", value: 0 },
      ],
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

export const modalFormConfig = ({ roleOption, deptOption }) => ({
  formFields: [
    {
      name: "name",
      type: "input",
      label: "用户名",
      placeHolder: "请输入用户名",
      rules: [],
    },
    {
      name: "realname",
      type: "input",
      label: "真实姓名",
      placeHolder: "请输入真实姓名",
      rules: [],
    },
    {
      name: "cellphone",
      type: "input",
      label: "手机号码",
      placeHolder: "请输入手机号码",
      rules: [],
    },
    {
      name: "roleId",
      type: "select",
      label: "选择角色",
      placeHolder: "请选择角色",
      options: roleOption,
    },
    {
      name: "departmentId",
      type: "select",
      label: "选择部门",
      placeHolder: "请选择部门",
      options: deptOption,
    },
  ],
  colLayout: { span: 24 },
});

export const columns: IColumn[] = [
  {
    prop: "name",
    label: "用户名",
    minWidth: "100",
    render: ({ row, name }) => {
      return row[name];
    },
  },
  { prop: "realname", label: "真实名", minWidth: "120" },
  { prop: "cellphone", label: "手机号码", minWidth: "150" },
  {
    prop: "enable",
    label: "状态",
    minWidth: "100",
    slotName: "status",
    align: "center",
  },
  {
    prop: "createAt",
    label: "创建时间",
    minWidth: "250",
    slotName: "time",
    align: "center",
  },
  {
    prop: "updateAt",
    label: "更新时间",
    minWidth: "250",
    slotName: "time",
    align: "center",
  },
  {
    label: "操作",
    minWidth: "120",
    slotName: "operate",
    align: "center",
  },
];
