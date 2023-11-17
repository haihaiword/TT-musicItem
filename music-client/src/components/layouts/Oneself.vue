<template>
    <div class="selfbox">
        <div class="userinfo" v-if="token">
            <img src="../../assets/images/user.jpg" alt="头像">
            <a href="#" @click.prevent="showtoken">姓名：{{ personalInfo.username }}</a>
            <a href="#" @click.prevent="showtoken">
              性别：
              <span v-if="personalInfo.userSex == '1'">男</span>
              <span v-else-if="personalInfo.userSex == '0'">女</span>
              <span v-else-if="personalInfo.userSex == '2'">保密</span>
            </a>
            <a href="#" @click.prevent="showtoken">生日：{{ formattedBirth }}</a>
            <a href="#" @click.prevent="showtoken">地址：{{ personalInfo.location }}</a>
            <a href="#" @click.prevent="showtoken">介绍：
              
              <span v-if="personalInfo.introduction != ''">{{ personalInfo.introduction }}</span>
              <span v-else>主人没有介绍</span>
            </a>
        </div>
        <div class="SongListShow">
            <span style="font-size: 30px;"> 歌手</span>
            <ul class="play-body" style="margin-top: 15px;">
                <li class="card-frame" v-for="(item, index) in playList" :key="index">
                    <div class="card" @click="goAblum(item)">
                        <el-image class="card-img" fit="contain" :src="attachImageUrl(item.pic)" />
                        <div class="mask" @click="goAblum(item)">
                            <!-- <yin-icon class="mask-icon" :icon="BOFANG"></yin-icon> -->
                        </div>
                    </div>
                    <!-- <p class="card-name">{{ item.name || item.title }}</p> -->
                    <p class="card-name">{{ item.name || item.title }}</p>
                </li>
            </ul>


            
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance, computed, watch, toRefs,reactive,nextTick } from "vue";
import { HttpManager } from "@/api";
import mixin from "@/mixins/mixin";
import { Icon } from "@/enums";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    title: String,
    playList: Array,
    path: String,
  },
  setup(props) {
    const store = useStore();
    const token = computed(() => store.getters.token);
    const { proxy } = getCurrentInstance();
    const { routerManager } = mixin();
    const { path } = toRefs(props);

    //个人信息
    const personalInfo = reactive({
      username: "",
      userSex: "",
      birth: "",
      location: "",
      introduction: "",
    });
    const userId = computed(() => store.getters.userId);

    const formattedBirth = computed(() => {
      const timestamp = Number(personalInfo.birth);
      const date = new Date(timestamp); // 将时间戳转换为毫秒
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1，并且补齐为两位数
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    });
 

    function goAblum(item) {
      console.log("item"+JSON.stringify(item));
      proxy.$store.commit("setSongDetails", item);
      routerManager(path.value, { path: `/${path.value}/${item.id}` });
    }

    function showtoken(event){
      event.preventDefault(); // 阻止默认跳转行为
      console.log(token)
    }

    async function getUserInfo(id) {
      const result = (await HttpManager.getUserOfId(id)) as ResponseBody;
      personalInfo.username = result.data[0].username;
      personalInfo.userSex = result.data[0].sex;
      personalInfo.birth = result.data[0].birth;
      personalInfo.introduction = result.data[0].introduction;
      personalInfo.location = result.data[0].location;
    }

    nextTick(() => {
      getUserInfo(userId.value);
    });
    

    return {
        BOFANG: Icon.BOFANG,
        goAblum,
        attachImageUrl: HttpManager.attachImageUrl,
        token,
        showtoken,
        personalInfo,
        formattedBirth
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";
@import "@/assets/css/global.scss";

.selfbox{
  margin: 0 auto;
  justify-content: center;
  align-items: center; /* 垂直居中 */
    // background-color: red;
}



.userinfo{
  flex: 1;
    justify-content: center;
    height: auto;
    margin-left:5px;
    margin-right: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid green;
    border-radius: 5%;
}
.userinfo img{
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    margin: 0 auto;
    width: 100px;
    height: 100px;
    border-radius: 50%;
}
.userinfo a{
    display: flex;
    flex: 1;
    justify-content: center; /* 水平居中 */
    width: 100%;
    height: 30px;
    text-decoration: none;
}

.span{
  font-family: 'Rainbow Party',
}

.play-body{
    width: 100%;
    height: auto;
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
    height: 50px;
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
    width: 40%;
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
