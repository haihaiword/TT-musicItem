<template>
      <div class="play-list">
        <!-- 标签标题歌单 -->
        <div class="play-title" v-if="title">{{ title }}   </div>
        <!-- 歌单大盒子 -->
        <ul class="play-body">
          <!-- 容器小盒子配点击跳转 -->
          <li class="card-frame" v-for="(item, index) in playList" :key="index">
            <div class="card" @click="goAblum(item)">
              <el-image class="card-img" fit="contain" :src="attachImageUrl(item.pic)" />
              <div class="mask" @click="goAblum(item)">
                <YinIcon class="mask-icon" :icon="BOFANG"></YinIcon>
              </div>
            </div>
            <span class="card-name">{{ item.name || item.title }}</span>
          </li>
        </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, toRefs } from "vue";

import YinIcon from "@/components/layouts/YinIcon.vue";
import mixin from "@/mixins/mixin";
import { Icon } from "@/enums";
import { HttpManager } from "@/api";
import { it } from "element-plus/lib/locale";

export default defineComponent({
  components: {
    YinIcon,
  },
  props: {
    title: String,
    playList: Array,
    path: String,
  },
  setup(props) {
    const { proxy } = getCurrentInstance();
    const { routerManager } = mixin();

    const { path } = toRefs(props);


    function goAblum(item) {
      console.log("item"+JSON.stringify(item));
      proxy.$store.commit("setSongDetails", item);
      routerManager("song-sheet-detail", { path: `/song-sheet-detail/${item.id}` });
      
    }

    return {
      BOFANG: Icon.BOFANG,
      goAblum,
      attachImageUrl: HttpManager.attachImageUrl,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";
@import "@/assets/css/global.scss";



.smallbox{
  
  height: auto;
  width: 100%;
  margin: 0 auto;
  position: relative;
}
.smallbox2{
  float: left;
  height: 100px;
  width: 100px;
  background-color: red;
  float: left;
}



.play-list-container{
  margin: 0 0px 0px 100px !important;
}

.play-list {
  padding: 0 1rem;

  .play-title {
    position: relative;
    height: 60px;
    line-height: 60px;
    font-size: 28px;
    font-weight: 500;
    text-align: left;
    padding-left: 10px;
    // color: $color-black;
    box-sizing: border-box;
    // text-decoration: underline; /* 将文字添加下划线 */
  }


.play-title::after {
  content: ""; /* 伪元素内容为空 */
  position: absolute;
  bottom: -2px; /* 控制下划线位置，根据需要调整 */
  left: 0;
  width: 100%; /* 下划线宽度占据整个容器的宽度 */
  height: 2px; /* 下划线的高度（粗细） */
  background-color: black; /* 下划线的颜色 */
}


  .play-body {
    @include layout(flex-start, stretch, row, wrap);
  }
}

.card-frame {
  .card {
    position: relative;
    height: 0;
    padding-bottom: 100%;
    overflow: hidden;
    border-radius: 5px;

    .card-img {
      width: 100%;
      transition: all 0.4s ease;
    }
  }

  .card-name {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    margin: 0.5rem 0;
  }

  &:hover .card-img {
    transform: scale(1.2);
  }
}

.mask {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 5px;
  background-color: rgba(52, 47, 41, 0.4);
  @include layout(center, center);
  transition: all 0.3s ease-in-out;
  opacity: 0;

  .mask-icon {
    @include icon(2em, rgba(240, 240, 240, 1));
  }

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
}

@media screen and (min-width: $sm) {
  .card-frame {
    width: 20%;
    margin: 0.5rem 1%;
  }
}

@media screen and (max-width: $sm) {
  .card-frame {
    width: 46%;
    margin: 0.5rem 2%;
  }
}
</style>
