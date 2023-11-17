<template>
    <el-row class="image-row">
        <el-col :span="7" v-for="(item, index) in playList" :key="index" >
            <el-card @click="goAblum(item)" :body-style="{ padding: '0px' }" >
            <img :src="attachImageUrl(item.pic)" class="image">
            <div style="padding: 14px;">
                <span>{{ item.name || item.title }}</span>
                <div class="bottom clearfix">
                <time class="time"></time>
                <el-button type="text" class="button" @click="goAblum(item)">详情页</el-button>
                </div>
            </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, toRefs,ref } from "vue";

import mixin from "@/mixins/mixin";
import { Icon } from "@/enums";
import { HttpManager } from "@/api";


export default defineComponent({
    components: {
        
    },
    props: {
    title: String,
    playList: Array,
    path: String,
    },
    setup(props) {
        const currentDate = ref(new Date());
        const { proxy } = getCurrentInstance();
        const { routerManager } = mixin();

        const { path } = toRefs(props);

        function showdata(item){
            console.log("item"+JSON.stringify(item));
        }

        function goAblum(item) {
            console.log("item"+JSON.stringify(item));
            proxy.$store.commit("setSongDetails", item);
            routerManager(path.value, { path: `/${path.value}/${item.id}` });
        }

        return {
            BOFANG: Icon.BOFANG,
            goAblum,
            attachImageUrl: HttpManager.attachImageUrl,
            showdata
        };
    },
});
</script>

<style lang="scss" scoped>

.image-row {
    padding: 10px 10px;
    display: flex;
    justify-content: space-between; /* 使列均匀分布 */
    align-items: center; /* 垂直居中 */
}

.el-col{
    padding: 30px 30px;
}

.el-col img:hover{
  transform: scale(1.2); /* 1.2倍放大 */
  transform-origin: bottom center; /* 以左上角为基准放大 */
  transition: transform 0.3s ease; /* 添加过渡效果 */
}


.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

</style>
