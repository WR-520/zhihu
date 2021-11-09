<template>  
<Header time="20221208"/>

</template>

<script>
import Header from "../components/Header.vue";
import {reactive,toRefs,onBeforeMount, onBeforeUnmount} from 'vue';
import {queryNewsLatest} from "@/api/index";
export default {
  name: "Home",
  components: { 
    Header,  
  },
  setup(){
     let state = reactive({
       today: '',
      //  新闻信息
       newsList: [],
      //  轮播图
       bannerList: [],
     })
     
    //  第一次加载获取数据
    onBeforeMount( async () => {
      let {date, stories, top_stories} = await queryNewsLatest();
      state.today = date;
      state.newsList.push({
        date,
        stories,
      })
      state.bannerList = top_stories; 
    })
     

     return {
       ...toRefs(state)
     }
  }
};
</script>
<style lang="less" scoped>
</style>
