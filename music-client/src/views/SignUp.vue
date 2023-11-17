<template>
  <!-- <yin-login-logo></yin-login-logo> -->
  <div class="sign">
    <div class="sign-head">
      <span>用户注册</span>
    </div>
    <el-form ref="signUpForm" label-width="80px" status-icon :model="registerForm" :rules="SignUpRules">
      <el-form-item prop="username" label="用户名">
        <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
      </el-form-item>

      <!-- 重写 -->
      <el-form-item prop="password" label="密码">
        <el-input type="password" placeholder="密码" v-model="registerForm.password"></el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword" label="确认密码">  
        <el-input type="password" placeholder="请再次输入密码" v-model="registerForm.confirmPassword"></el-input>  
      </el-form-item>

      <el-form-item prop="sex" label="性别">
        <el-radio-group v-model="registerForm.sex">
          <el-radio :label="0">女</el-radio>
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">保密</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="phoneNum" label="手机">
        <el-input placeholder="手机" v-model="registerForm.phoneNum"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="registerForm.email" placeholder="邮箱"></el-input>
      </el-form-item>

      <el-form-item prop="code" label="验证码" class="codestyle">
        <el-input v-model="registerForm.code" placeholder="输入5位验证码" style="width: 100px;" ></el-input>
        <el-button @click="sendcode" style="margin-left: 10px;">发送验证码</el-button>
      </el-form-item>


      <el-form-item prop="birth" label="生日">
        <el-date-picker type="date" placeholder="选择日期" v-model="registerForm.birth" style="width: 100%"></el-date-picker>
      </el-form-item>
      <el-form-item prop="introduction" label="签名">
        <el-input type="textarea" placeholder="签名" v-model="registerForm.introduction"></el-input>
      </el-form-item>
      <el-form-item prop="location" label="地区">
        <el-select v-model="registerForm.location" placeholder="地区" style="width: 100%">
          <el-option v-for="item in AREA" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="sign-btn">
        <el-button @click="goBack">忘记密码</el-button>
        <el-button type="primary" @click="handleSignUp()">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, getCurrentInstance } from "vue";
import mixin from "@/mixins/mixin";
// import YinLoginLogo from "@/components/layouts/YinLoginLogo.vue";
import { HttpManager } from "@/api";
import { getBirth } from "@/utils";
import { AREA, RouterName, NavName, SignUpRules } from "@/enums";
import axios from 'axios';

export default defineComponent({
  components: {
    // YinLoginLogo,
  },
  handleButtonClick() {
      alert('无内容');
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const { routerManager, changeIndex } = mixin();

    const registerForm = reactive({
      code:"",
      username: "",
      password: "",
      confirmPassword:"",
      sex: "",
      phoneNum: "", 
      email: "",
      birth: new Date(),
      introduction: "",
      location: "",
    });

    function sendcode(){
      // 判断是否邮箱填写
      const email = registerForm.email;
      if(email==null){
        alert("邮箱不可为空");
      }else{
        axios.post('http://127.0.0.1:8888/SendEmail?otherEmail='+email, {   
        })  
        .then(response => {  
          if(response.data['code']==200){
            alert(response.data['message']); 
          }
        })
        .catch(error => {  
          console.error(error);  
          alert(error); 
        });  
      }
    }
    
    function goBack(){
      routerManager(RouterName.FindPassword, { path: RouterName.FindPassword });
    }

    async function handleSignUp() {
      let canRun = true;
      (proxy.$refs["signUpForm"] as any).validate((valid) => {
        if (!valid) return (canRun = false);
      });
      if (!canRun) return;


      try {
        const code = registerForm.code;
        const username = registerForm.username;
        const password = registerForm.password;
        const confirmPassword = registerForm.confirmPassword;
        const sex = registerForm.sex;
        const phoneNum = registerForm.phoneNum;
        const email = registerForm.email;
        const birth = registerForm.birth;
        const introduction = registerForm.introduction;
        const location = registerForm.location;
        const result = (await HttpManager.SignUp({username,password,sex,phoneNum,email,birth,introduction,location,code})) as ResponseBody;
        (proxy as any).$message({
          message: result.message,
          type: result.type,
        });

        if (result.success) {
          changeIndex(NavName.SignIn);
          routerManager(RouterName.SignIn, { path: RouterName.SignIn });
        }
      } catch (error) {
        console.error(error);
      }
    }

    return {
      SignUpRules,
      AREA,
      registerForm,
      handleSignUp,
      goBack,
      sendcode
    };
  },
});
</script>





<style lang="scss" scoped>
@import "@/assets/css/sign.scss";
// ::v-deep .el-form-item__label {
//   width: 100px!important; /* 设置您想要的宽度 */  
// }


</style>
