import { el, pa } from "element-plus/lib/locale";


let password = null;

// 登录规则
export const validateName = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("用户名不能为空"));
  } else {
    callback();
  }
};

export const validatePassword = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("密码不能为空"));
  } else {
    callback();
  }
};
export const SignInRules = {
  username: [{ validator: validateName, trigger: "blur", min: 3 }],
  password: [{ validator: validatePassword, trigger: "blur", min: 3 }],
};



export const GetPassword = (rule, value, callback) => {  
  // 定义密码规则  
  const passwordRule = /^[0-9A-Za-z]{8,16}$/;  
  if (value === "") {  
    callback(new Error("密码不能为空"));  
  } else if (!passwordRule.test(value)) {  
    callback(new Error("密码为8-16长度的数字和字母组合"));  
  } else {  
    password = value;
    callback();  
  }  
};

export const validatePasswordMatch = (rule, value, callback) => {
  if (value === "" ) {
    callback(new Error("确定密码不可为空"));
  } else {
    if(value === password){
      callback();
    }
    callback(new Error("密码不匹配"));  
  }
};

// 忘记密码的校验
export const ForgetPassword = {
  email: [
    { required: true,message: "请输入邮箱地址", trigger: "blur" },
    {
      type: "email",
      message: "请输入正确的邮箱地址",
      trigger: ["blur", "change"],
    },
  ],
  ConfirmWorld: [{required: true, trigger: "blur", min: 5,max:5}],
  newPassword: [{validator: GetPassword , required: true, trigger: "blur", min: 8 ,max:16}],
  ConfirmNewPassword: [{validator: validatePasswordMatch , required: true, trigger: "blur", min: 8 ,max:16}],
}

// 注册规则
export const SignUpRules = {
  username: [{ required: true, trigger: "blur", min: 3 , message: "用户名输入错误"}],
  password: [{validator: GetPassword , required: true, trigger: "blur", min: 8 ,max:16}],
  confirmPassword: [{ validator: validatePasswordMatch , required: true, trigger: "blur", min: 3}],
  sex: [{ required: true, message: "请选择性别", trigger: "change" }],
  phoneNum: [{ essage: "请选择日期", trigger: "blur" }],
  email: [
    { message: "请输入邮箱地址", trigger: "blur" },
    {
      type: "email",
      message: "请输入正确的邮箱地址",
      trigger: ["blur", "change"],
    },
  ],
  birth: [{ required: true, type: "date", message: "请选择日期", trigger: "change" }],
  introduction: [{ message: "请输入介绍", trigger: "blur" }],
  location: [{ message: "请输入地区", trigger: "change" }],
};
