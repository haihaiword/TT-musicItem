<template>
  <div>
    <div class="sign">
      <div class="sign-head">
        <span>忘记密码</span>
      </div>
      <el-form
        ref="signUpForm"
        label-width="70px"
        status-icon
        :model="registerForm"
        :rules="ForgetPassword"
      >
    <el-form-item prop="email" label="邮箱">
        <el-input v-model="registerForm.email" placeholder="邮箱"></el-input>
    </el-form-item>

    <el-form-item prop="code" label="验证码" class="codestyle">
        <el-input v-model="registerForm.ConfirmWorld" placeholder="输入5位验证码" style="width: 100px;" ></el-input>
        <el-button @click="sendcode" style="margin-left: 10px;">发送验证码</el-button>
    </el-form-item>


        <el-form-item prop="newPassword" label="新密码">
          <el-input type="password" v-model="registerForm.newPassword" placeholder="新密码"></el-input>
        </el-form-item>
        <el-form-item prop="ConfirmNewPassword" label="新密码">
          <el-input type="password" v-model="registerForm.ConfirmNewPassword" placeholder="确认新密码"></el-input>
        </el-form-item>
        <el-form-item class="sign-btn">
          <el-button type="primary" @click="handleover">重置</el-button>
          <el-button type="primary" @click="handleSignUp">确定</el-button>
        </el-form-item>
      </el-form>
      
    </div>
    
  </div>
</template>
  
  <script lang="ts">
import { defineComponent, reactive, getCurrentInstance } from "vue";
import mixin from "@/mixins/mixin";
import { HttpManager } from "@/api";
import { getBirth } from "@/utils";
import { AREA, RouterName, NavName, ForgetPassword } from "@/enums";
import { ElButton } from "element-plus";
import axios from 'axios';
export default defineComponent({
  components: {
    ElButton,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const { routerManager, changeIndex } = mixin();

    const registerForm = reactive({
      email: "",
      ConfirmWorld:'',
      newPassword:'',
      ConfirmNewPassword:''
    });

    async function handleSignUp() {
      let canRun = true;
      (proxy.$refs["signUpForm"] as any).validate((valid) => {
        if (!valid) return (canRun = false);
      });
      if (!canRun) return;

      try {
        const email = registerForm.email;
        const ConfirmWorld = registerForm.ConfirmWorld;
        const newPassword = registerForm.newPassword;
        const ConfirmNewPassword = registerForm.ConfirmNewPassword;
        const result = (await HttpManager.changePassword({
          email,
          ConfirmWorld,
          newPassword,
          ConfirmNewPassword,
        })) as ResponseBody;
        (proxy as any).$message({
          message: result.message,
          type: result.type,
        });

        if (result.success) {
          changeIndex(NavName.SignUp);
          routerManager(RouterName.SignIn, { path: RouterName.SignIn });
        }
      } catch (error) {
        console.error(error);
      }
    }
    function goBack() {
      routerManager(RouterName.FindPassword, { path: RouterName.FindPassword });
    }

    function handleover(){
      registerForm.email = '';  
      registerForm.ConfirmWorld = '';  
      registerForm.newPassword = '';  
      registerForm.ConfirmNewPassword = '';  
    }

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
    return {
    ForgetPassword,
      AREA,
      registerForm,
      handleSignUp,
      goBack,
      sendcode,
      handleover
    };
  },
});
</script>
  
<style lang="scss" scoped>

@import "@/assets/css/sign.scss";
.btn{
  width: 420px;
}

</style>