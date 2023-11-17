<template>
  
    <div class="wrap" id="app" v-cloak>
      <video autoplay loop muted>
            <source src="../assets/images/back.mp4" type="video/mp4">
      </video>
      <!-- 整体播放器部分 -->
      <div class="play_wrap">
        <!-- 头部 -->
        <div class="search_bar">
          <a href="javascript:location.reload();" class="refresh">
            <p class="player_title">音乐播放器</p>
          </a>
          <input type="text" @keyup.enter="searchMusic" v-model="data.query" />
          <img src="../assets/images/zoom.png" @click="searchMusic" class="search" alt=""/>
        </div>
        <!-- 中间 -->
        <div class="center_con">
          <!-- 中间的左边 -->
          <div class="song_wrapper">
            <!-- 歌曲列表 -->
            <ul class="song_list">
              <li v-for="(item, index) in data.musicList" :key="index">
                <a href="javascript:;" @click="playMusic(item.id)"></a>
                <b>{{ item.name }}</b>
                <span
                  ><i v-if="item.mvid != 0" @click="playMv(item.mvid)"></i
                ></span>
              </li>
            </ul>
            <img src="../assets/images/line.png" class="left_line" alt="line" />
          </div>
          <!-- 中间的中间 -->
          <div class="player_con" :class="{ playing: data.isPlaying }">
            <img src="../assets/images/player_bar.png" class="play_bar" alt="bar"/>
            <img src="../assets/images/disc.png" class="disc autoRotate" alt="disc"/>
            <img :src="data.coverUrl " class="cover autoRotate" alt="" />
          </div>
          <!-- 中间的右边 -->
          <div class="comment_wrapper">
            <h5 class="title">热门留言</h5>
            <!-- 热评列表 -->
            <div class="comment_list">
              <dl v-for="(item, index) in data.comments" :key="index">
                <dt><img src="../assets/images/person.png" alt="person" /></dt>
                <dd class="name">{{ item.user.nickname }}</dd>
                <dd class="detail">{{ item.content }}</dd>
              </dl>
            </div>
            <img src="../assets/images/line.png" class="right_line" alt="" />
          </div>
        </div>
        <!-- 尾部 -->
        <div class="audio_con">
          <audio :src="data.musicUrl" @play="play" @pause="pause" ref="audios" controls autoplay loop
            class="myaudio"></audio>
        </div>
        <div class="video_con" style="display: none" v-show="data.isShowing">
          <!-- <video :src="data.mvUrl" controls></video> -->
          <div class="mask" @click="hide"></div>
        </div>
      </div>
    </div>
  
</template>
<!-- <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script> -->
<script>
import axios from "axios";
import { defineComponent, reactive, getCurrentInstance, beforeCreate } from "vue";
// import MusicBar from "../components/layouts/YinPlayBar.vue"
export default defineComponent({
    beforeCreate(){
      const oScript = document.createElement("script");
      oScript.type = "text/javascript";
      oScript.src = "https://unpkg.com/axios/dist/axios.min.js";
      document.body.appendChild(oScript);
      const oScript1 = document.createElement("script");
      oScript1.type = "text/javascript";
      oScript1.src = "https://cdn.jsdelivr.net/npm/vue/dist/vue.js";
      document.body.appendChild(oScript1);
      
    },
  setup() {
    const data = reactive({
      query: "",
      musicList: [],
      musicUrl: "",
      coverUrl: "",
      comments: [],
      isPlaying: false,
      mvUrl: "",
      isShowing: false,
    });
    
      function searchMusic() {
        axios.get("https://autumnfish.cn/search?keywords=" + data.query).then(
          function (response) {
            console.log(response);
            data.musicList = response.data.result.songs;
          },
          function (err) {
            alert("错误404");
          }
        );
      }
      function playMusic(musicId) {
        axios.get("https://autumnfish.cn/song/url?id=" + musicId).then(
          function (response) {
            // console.log(response);
            data.musicUrl = response.data.data[0].url;
            console.log(data.musicUrl);
          },
          function (err) {
            alert("错误404");
          }
        );

        axios.get("https://autumnfish.cn/song/detail?ids=" + musicId).then(
          function (response) {
            // console.log(response);
            data.coverUrl = response.data.songs[0].al.picUrl;
          },
          function (err) {
            alert("错误404");
          }
        );

        axios
          .get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId)
          .then(
            function (response) {
              // console.log(response);
              data.comments = response.data.hotComments;
            },
            function (err) {
              alert("错误404");
            }
          );
      }
      function play() {
        data.isPlaying = true;
      }
      function pause() {
        data.isPlaying = false;
      }
      function playMv(mvId) {
        axios.get("https://autumnfish.cn/mv/url?id=" + mvId).then(
          function (response) {
            // console.log(response);
            data.mvUrl = response.data.data.url;
            data.isShowing = true;
            data.$refs.audios.pause();
          },
          function (err) {
            alert("错误404");
          }
        );
      }
      function hide() {
        console.log(data.mvUrl);
        data.isShowing = false;
        data.mvUrl = "";
      }
    return {
      data,
      searchMusic,
      play,
      pause,
      playMv,
      playMusic,
      hide,
    };
  },
});
</script>

<style scoped>
.Weizhi {
  margin-top: 35%;
  margin-left: 37%;
}
[v-cloak] {
  display: none !important;
}

.wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; /* 可以让视频按比例填充容器 */
}


.play_wrap {
  width: 800px;
  height: 544px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -400px;
  margin-top: -272px;
}

.search_bar {
  height: 60px;
  position: relative;
  background-color: #1eda1e;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 11;
}

.refresh {
  text-decoration: none;
}

.player_title {
  margin-left: 23px;
  font-size: 20px;
  color: transparent;
  -webkit-text-stroke: 0.6px white;
  letter-spacing: 0.1em;
  cursor: pointer;
  text-decoration: none;
}

.search_bar input {
  margin-right: 23px;
  width: 296px;
  height: 34px;
  border-radius: 17px;
  border: 0;
  background-color: rgba(255, 255, 255, 0.45);
  /* 第一行缩进15像素 */
  text-indent: 15px;
  outline: none;
}

.search {
  position: absolute;
  right: 35px;
}

.center_con {
  height: 435px;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  position: relative;
}

.song_wrapper {
  width: 200px;
  height: 435px;
  box-sizing: border-box;
  padding: 10px;
  list-style: none;
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 1;
  border-left: 1px solid black;
}

.song_list {
  width: 180px;
  height: 415px;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: auto;
}

/* 隐藏滚动条 */
.song_list::-webkit-scrollbar {
  display: none;
}

.song_list li {
  height: 40px;
  width: 580px;
  font-size: 12px;
  color: #333;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-left: 10px;
}

/* 给奇数行的li设置背景颜色，rgba(red,green,blue,alpha透明度) */
.song_list li:nth-child(odd) {
  background-color: rgba(240, 240, 240, 0.3);
}

.song_list li a {
  display: block;
  width: 17px;
  height: 17px;
  background: url("../assets/images/play.png");
  background-size: 100%;
  margin-right: 5px;
  box-sizing: border-box;
}

.song_list li b {
  width: 122px;
  font-weight: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.song_list li span {
  width: 23px;
  height: 17px;
  margin-right: 50px;
}

.song_list li span i {
  display: block;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background: url("../assets/images/table.png") left -48px no-repeat;
}

.left_line {
  position: absolute;
  right: 0;
  top: 0;
}

.player_con {
  width: 400px;
  height: 435px;
  position: absolute;
  left: 200px;
  top: 0;
}

.disc {
  position: absolute;
  left: 73px;
  top: 60px;
  z-index: 9;
}

.cover {
  position: absolute;
  left: 125px;
  top: 112px;
  width: 150px;
  height: 150px;
  border-radius: 75px;
  z-index: 8;
}

.play_bar {
  position: absolute;
  left: 200px;
  top: -10px;
  z-index: 10;
  transform: rotate(-25deg);
  transform-origin: 12px 12px;
  transition: 1s;
}

.comment_wrapper {
  width: 180px;
  height: 435px;
  position: absolute;
  list-style: none;
  left: 600px;
  top: 0px;
  padding: 25px 10px;
  border-right: 1px solid black;
}

.comment_wrapper .title {
  position: absolute;
  top: 0;
  margin-top: 10px;
}

.comment_wrapper .comment_list {
  height: 410px;
  overflow: auto;
}

.comment_wrapper .comment_list::-webkit-scrollbar {
  display: none;
}

.comment_wrapper dl {
  padding-top: 10px;
  padding-left: 55px;
  position: relative;
  margin-bottom: 20px;
  margin-top: 0;
}

.comment_wrapper dt {
  position: absolute;
  left: 4px;
  top: 10px;
}

.comment_wrapper dt img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
}

.comment_wrapper dd {
  font-size: 12px;
}

.comment_wrapper .name {
  font-weight: bold;
  color: #333;
  padding-top: 5px;
  margin-left: 0;
}

.comment_wrapper .detail {
  color: #666;
  margin-top: 5px;
  margin-left: 0;
  line-height: 18px;
}

.right_line {
  position: absolute;
  left: 0;
  top: 0;
}

.audio_con {
  height: 50px;
  background-color: #f1f3f4;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

.myaudio {
  width: 800px;
  height: 40px;
  margin-top: 5px;
  outline: none;
  background-color: #f1f3f4;
}

.video_con video {
  position: fixed;
  width: 800px;
  height: 546px;
  left: 50%;
  top: 50%;
  margin-top: -273px;
  transform: translateX(-50%);
  z-index: 990;
}

.video_con .mask {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 980;
  background-color: rgba(0, 0, 0, 0.8);
}

@keyframes rotate {
  from {
    transform: rotateZ(0);
  }

  to {
    transform: rotateZ(360deg);
  }
}

.autoRotate {
  animation-name: rotate;
  animation-iteration-count: infinite;
  animation-play-state: paused;
  animation-timing-function: linear;
  animation-duration: 35s;
}

.player_con.playing .disc,
.player_con.playing .cover {
  animation-play-state: running;
}

.player_con.playing .play_bar {
  transform: rotate(0);
}
</style>
