export const accountFormRule = {
  account: [{ required: true, message: "请输入账户", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    // { required: true, message: "请输入密码", trigger: "blur" },
  ],
};

export const phoneFormRule = {
  phoneNumber: [{ required: true, message: "请输入手机号", trigger: "blur" }],
  verificationCode: [
    { required: true, message: "请输入验证码", trigger: "blur" },
    // { required: true, message: "请输入密码", trigger: "blur" },
  ],
};
