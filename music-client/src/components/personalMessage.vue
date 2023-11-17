<template>
  <div class="personalMessagePersonal">
    <div id="page-container">
      <div id="header">
        <div id="indrouce">   
          <h1>
            <div style="size: a3; font-family: arial, castellar">
              <h4 class="h5">姓名：</h4><span>{{ registerForm.username }}</span><br /><br />
              <h4 class="h5">qq:</h4><span >{{ registerForm.email }}</span><br /><br />
              <h4 class="h5">现住地：</h4><span>{{ registerForm.location }}</span><br /><br />
              <h4 class="h5">描述：</h4>{{ registerForm.introduction }}<br />
            </div>
          </h1>
        </div>
       
      </div>
      <div id="content">
        <div id="sidebar-a">
          <div id="pic2" style="size: 10px">
            <br />
            <img src="../assets/images/爱心.png" width="23" height="20" border="0" align="left" />&emsp;
            <span> 个人档案 </span>Personal files<br />
            <hr
              width="90"
              align="center"
              style="
                height: 0.01px;
                border: none;
                border-top: 1px dashed #0066cc;
              "
            />
            <br />
            <img src="../assets/images/爱心.png" width="23" height="20" border="0" align="left" />&emsp;
            <span> 心情日志</span> Rloofog<br />
            <hr
              width="90"
              align="center"
              style="
                height: 0.01px;
                border: none;
                border-top: 1px dashed #0066cc;
              "
            />
            <br />
            <img src="../assets/images/爱心.png" width="23" height="20" border="0" align="left" />&emsp;
            <span> 生活记录</span> Life<br />
            <hr
              width="90"
              align="center"
              style="
                height: 0.01px;
                border: none;
                border-top: 1px dashed #0066cc;
              "
            />
            <br />
            <img src="../assets/images/爱心.png" width="23" height="20" border="0" align="left" />&emsp;
            <span> 相册</span> pic<br />
            <hr
              width="90"
              align="center"
              style="
                height: 0.01px;
                border: none;
                border-top: 1px dashed #0066cc;
              "
            />
            <br />
          </div>
        </div>

        
      </div>
    </div>
    <div class="mingyan">
      <!-- <button class="leaveWord">确定更改留言</button> -->
          <b1 style="color: burlywood" class="personSay">人生留言</b1><br />
          
            <textarea @keydown.enter="say" name="kk" id="renshengliuyan" cols="75" rows="6" class="neiRong" v-model="registerForm.personSay"></textarea>
            
        </div>
  </div>
</template>

<script  lang="ts">
import { defineComponent, computed, onMounted, getCurrentInstance, reactive } from "vue";
import { useStore } from "vuex";
import { HttpManager } from "@/api";
export default defineComponent({
  setup(){
    const registerForm = reactive({
      username: "",
      sex: "",
      phoneNum: "",
      email: "",
      birth: new Date(),
      introduction: "",
      location: "",
      userPic: "",
      personSay:''
    });
    const store = useStore();
    const userId = computed(() => store.getters.userId);
    async function getUserInfo(id) {
      const result = (await HttpManager.getUserOfId(id)) as ResponseBody;
      console.log(result);
      registerForm.username = result.data[0].username;
      registerForm.sex = result.data[0].sex;
      registerForm.phoneNum = result.data[0].phoneNum;
      registerForm.email = result.data[0].email;
      registerForm.birth = result.data[0].birth;
      console.log(registerForm.username);
      
      registerForm.introduction = result.data[0].introduction;
      registerForm.location = result.data[0].location;
      registerForm.userPic = result.data[0].avator;
    }
    onMounted(()=>{
      getUserInfo(userId.value)
      registerForm.personSay=sessionStorage.getItem('name');
    })
    function say(){
     const say=confirm('确定更改？')
     if(say){
      sessionStorage.setItem('name', registerForm.personSay);
     }  
    }
    return{
      say,
      registerForm
    }
  }
});
</script>

<style scoped>
.personalMessagePersonal {
  width: 600px;
  margin-left: 100px;
  border-radius: 14px;
  border: 1px solid black;
}

#page-container {
  width: 760px;
  margin: auto;
  display: flex;
}
#main-nav {
  background: #87ceeb;
  height: 50px;
}
#header {
  text-align: center;
  height: 200px;
  float: left;
}
#pic2 {
  width: 350px;
  height: 140px;
  text-indent: 0%;
}
#pic {
  float: right;
  width: 350px;
  height: 120px;
}

#content {
  width: 130px;
  float: right;
  margin-left: 60px;
}
#content2 {
  height: 130px;
  width: 250px;
}
#content1 {
  padding-top: 100px;
  height: 130px;
  padding-left: 10px;
}
b1 {
  font: arial;
  text-align: left;
  font-size: 14px;
}
b2 {
  font-size: 6px;
  line-height: 1px;
}
#content3 {
  font-size: 12px;
  float: right;
  width: 250px;
  height: 230px;
}
#sidebar-a {
  font-size: 12px;
  height: 120px;
}
h2 {
  float: right;
  margin-right: 2px;
  padding: 1px;
}

h1 {
  text-align: left;
  font-family: arial;
  font-size: 12px;
  color: #666666;
  margin: 0;
  padding: 0;
}
#footer {
  font-size: 10px;
  clear: both;
  background: #f0f0f0;
  height: 40px;
  border-top: 10px;
  text-align: center;
  padding: 13px 25px;
}
.mingyan {
  /* margin-top: 50px; */
  width: 600px;
}
.neiRong {
  border: 1px solid black;
  border-radius: 10px;
  width: 550px;
  margin-left: 25px;
  margin-bottom: 10px;
  height: 80px;
}
.personSay{
  margin-left: 45%;
}
.leaveWord{
  /* margin-left: 400px; */
  float: right;
  margin-right: 20px;
  border-radius: 10px;
  margin-bottom: 1px;
  
}

.h5{
  display: inline;
  color: #333;
}

#indrouce {
  padding-top: 5px;
  background: powderblue;
  height: 140px;
  width: 150px;
  margin-left: 50px;
  margin-top: 10px;
  border-radius: 10px;
}


</style>