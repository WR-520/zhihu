<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang="less">
   html,body{
     min-height: 100%;
     overflow: hidden;
     background: #f4f4f4;
   }
   #app {
     margin: 0 auto;
     background: #fff;
   }
</style>
