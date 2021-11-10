<template>
  <div>
    <!-- 所有路由匹配的组件 在router-view显示 -->
    <router-view v-slot="{ Component} ">
      <keep-alive include="Home"> 
        <component :is="Component"/>
      </keep-alive>
    </router-view>
  </div>
</template>
<script>
export default {
  name: "App",
};
</script>
<style lang="less">
html,
body {
  min-height: 100%;
  overflow: hidden;
  background: #f4f4f4;
}
#app {
  margin: 0 auto;
  background: #fff;
}
</style>
