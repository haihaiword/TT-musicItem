<template>
  <el-container >
    <el-header>
      <yin-header></yin-header>
    </el-header>
    <el-main>
      <router-view></router-view>
      <yin-current-play></yin-current-play>
      <yin-play-bar v-show="showPlayBar" :stata="showPlayBar"></yin-play-bar>
      <!-- <yin-scroll-top></yin-scroll-top> -->
      <yin-audio></yin-audio>
    </el-main>
    <!-- <el-footer>
      <yin-footer></yin-footer>
    </el-footer> -->
  </el-container>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref, onBeforeUnmount,inject,watch } from "vue";
import {useStore} from "vuex";
import YinHeader from "@/components/layouts/YinHeader.vue";
import YinCurrentPlay from "@/components/layouts/YinCurrentPlay.vue";
import YinPlayBar from "@/components/layouts/YinPlayBar.vue";
import YinScrollTop from "@/components/layouts/YinScrollTop.vue";
import YinFooter from "@/components/layouts/YinFooter.vue";
import YinAudio from "@/components/layouts/YinAudio.vue";


const { proxy, appContext } = getCurrentInstance();
// 获取 router 对象
const router = appContext.config.globalProperties.$router;


if (sessionStorage.getItem("dataStore")) {
  proxy.$store.replaceState(Object.assign({}, proxy.$store.state, JSON.parse(sessionStorage.getItem("dataStore"))));
}
window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("dataStore", JSON.stringify(proxy.$store.state));
});


// 使用 ref 来创建一个响应式数据
const showPlayBar = ref(true);

// 从 localStorage 中读取初始值
showPlayBar.value = localStorage.getItem('showPlayBar') === 'true';

// 创建一个 watch 监听 localStorage 的变化，以便实时更新 showPlayBar 的值
watch(() => showPlayBar.value, (newValue) => {
  localStorage.setItem('showPlayBar', newValue.toString());

});

const store = useStore();

// 路由守卫
// 在路由守卫中保存状态到localStorage
router.beforeEach((to, from, next) => {
  if (to.name === 'WhatyouLive' || to.name === 'PaiHang') {
    // 进入特定路由时隐藏播放栏
    // 从 localStorage 中读取初始值
    localStorage.setItem('showPlayBar', 'false');
    showPlayBar.value = localStorage.getItem('showPlayBar') === 'true';
    store.commit("setIsPlay", !store.state.isPlay);
  } else {
    // 离开特定路由时显示播放栏
    localStorage.setItem('showPlayBar', 'true');
    showPlayBar.value = localStorage.getItem('showPlayBar') === 'true';
  }
  next();
});


</script>






<style lang="scss" scoped>
@import "@/assets/css/var.scss";
@import "@/assets/css/global.scss";

.el-container {
  min-height: calc(100% - 60px);
  
}
.el-header {
  padding: 0;
}
.el-main {
  padding-left: 0;
  padding-right: 0;
  // 取消了两个滚动条的影响
  height: 0px;
}
</style>
