<template>

<div v-loading="loading">
  <el-carousel style="height: 400px;" v-if="swiperList.length" :interval="5000" class="swiper-container" arrow="none">
    <el-carousel-item style="height: 400px;"  v-for="(item, index) in swiperList" :key="index">
      <img  :src="HttpManager.attachImageUrl(item.pic)" @click="ToSingList(index)"/>
    </el-carousel-item>
  </el-carousel>

  <el-container >
    <el-aside width="70%">
      <play-list class="play-list-container show" title="歌单" path="song-sheet-detail" :playList="songList"></play-list>
      <!-- <play-list class="play-list-container" title="歌手" path="singer-detail" :playList="singerList"></play-list> -->
    </el-aside>
    <el-main>
      <Oneself title="歌手" path="singer-detail" :playList="singerList"></Oneself>
    </el-main>
  </el-container>
</div>
  <!-- 热门歌手 -->
  


</template>

<script lang="ts" setup>
import { ref, onMounted,getCurrentInstance } from "vue";

import PlayList from "@/components/PlayList.vue";
import {  NavName } from "@/enums";
import Oneself from "@/components/layouts/Oneself.vue"
import { HttpManager } from "@/api";
import mixin from "@/mixins/mixin";
const loading =  ref(true);
const songList = ref([]); // 歌单列表
const singerList = ref([]); // 歌手列表
const swiperList = ref([]);// 轮播图 每次都在进行查询
const { changeIndex } = mixin();
const { routerManager } = mixin();
const { proxy } = getCurrentInstance();



try {

  Promise.all([
    HttpManager.getBannerList().then((res) => {
      swiperList.value = (res as ResponseBody).data.sort();
    }),
    HttpManager.getSongList().then((res) => {
      songList.value = (res as ResponseBody).data.sort().slice(0, 24);
    }),
    HttpManager.getAllSinger().then((res) => {
      singerList.value = (res as ResponseBody).data.sort().slice(0, 10);
    })
  ]).then(() => {
    loading.value = false;
  });
  

  onMounted(() => {
    changeIndex(NavName.Home);
  });

  

  
} catch (error) {
  console.error(error);
}

function ToSingList(index){
  let item = songList.value[index];
  console.log("点击了"+index);
  console.log("item"+JSON.stringify(item));
  proxy.$store.commit("setSongDetails", item);
  routerManager("song-sheet-detail", { path: `/song-sheet-detail/${item.id}` });
  }


</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";




.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    // line-height: 200px;
  }
  
  .el-main {
    
    margin: 0 auto;
    width: 50%;
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    // line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

.container_center{
  // background-color: red;
  height: auto;
  width: 100%;
}


// 音乐歌单部分


.oneself{
  float: left;
  // background-color: gray;
  height: 100%;
  width: 15%;
  margin-left: 50px;
  margin-top: 70px;
  border-left: 2px solid black; /* 添加黑色虚线边框 */
  border-radius: 10px; /* 添加圆角 */
}


/*轮播图*/
.el-carousel-item{
}

  .el-carousel__container{
  height: 1000px!important;
}
.swiper-container img{
  width: 100%;
  height: 100%;
}

.el-carousel-con{
  height: 800px !important;
}

.el-carousel__item img {
  color: #475669;
  opacity: 0.75;
  line-height: 500px;
}
  
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.swiper-container:deep(.el-carousel__indicators.el-carousel__indicators--outside) {
  display: inline-block;
  transform: translateX(30vw);
}

.el-slider__runway {
  background-color: $color-blue;
}

::v-deep .el-carousel__arrow{
    width: 50px!important;
    height: 50px!important;
    font-size: 30px!important;
    top: 70%!important;
}
::v-deep .el-main{
  --el-main-padding: 0px!important;
  margin-top: 0px!important;
}
</style>
