<template>
  <ul class="yin-nav">
    <li v-for="(item, index) in styleList" :key="index" :class="{ active: item.name == activeName }" @click="handleChangeView(item)">
      {{ item.name }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";

export default defineComponent({
  props: {
    styleList: Array,
    activeName: String,
  },
  emits: ["click"],
  setup() {
    const { proxy } = getCurrentInstance();

    function handleChangeView(val) {
      proxy.$emit("click", val);
    }
    return {
      handleChangeView,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";


.yin-nav {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  li {  
  border-radius: 10px; /* 设置圆角大小 */  
  line-height: 3rem;  
  font-size: 1.5rem;  
  color: $color-grey;  
  border: 1px solid black; /* 设置边框为黑色实线 */  
  border-bottom: none;  
  cursor: pointer;  
    
  /* 添加阴影 */  
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);  
}
  li.active {
    color: $color-black;
    font-weight: 600;
  }
}

@media screen and (min-width: $sm) {
  .yin-nav {
    li {
      margin: 0.5rem 1rem;
    }
  }
}

@media screen and (max-width: $sm) {
  .yin-nav {
    li {
      margin: 0.3rem 0.4rem;
    }
  }
}
</style>
