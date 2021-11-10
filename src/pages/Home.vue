<template>
  <!-- 头部 -->
  <Head :time="today" />
  <!-- 轮播图 -->
  <section class="banner-box">
    <van-swipe v-if="bannerList.length > 0" autoplay="3000" lazy-render>
      <van-swipe-item v-for="item in bannerList" :key="item.id">
        <router-link :to="`/detail/${item.id}`" class="content">
          <img :src="item.image" alt="" />
          <div class="mark">
            <h3 class="title">{{ item.title }}</h3>
            <span class="tip">{{ item.hint }}</span>
          </div>
        </router-link>
      </van-swipe-item>
    </van-swipe>
  </section>
  <!-- 新闻列表 -->
  <van-skeleton title :row="5" v-if="newsList.length === 0"></van-skeleton>
  <div v-else>
    <section class="news-box" v-for="(item, index) in newsList" :key="index">
      <van-divider content-position="left" v-if="index !== 0">
        {{ formatTime(item.date, "{1}月{2}日") }}
      </van-divider>
      <div class="content">
        <Item v-for="item2 in item.stories" :key="item2.id" :data="item2" />
      </div>
    </section>
  </div>
  <div class="lazy-more" v-show="newsList.length !== 0" ref="loadMore">
    <van-loading size="12px">小主，精彩数据准备中...</van-loading>
  </div>
</template>

<script>
import Head from "@/components/Header.vue";
import Item from "@/components/Item.vue";
import { reactive, toRefs, onBeforeMount, ref, onMounted } from "vue";
import { formatTime } from "@/assets/utils";
import api from "@/api/index";

export default {
  components: { Head, Item },
  name: "Home",
  setup() {
    let state = reactive({
      today: "",
      newsList: [],
      bannerList: [],
    });
    let loadMore = ref(null);

    // 第一次加载获取数据
    onBeforeMount(async () => {
      // 获取今日新闻
      let { date, stories, top_stories } = await api.queryNewsLatest();
      state.today = date;
      state.newsList.push(
        Object.freeze({
          date,
          stories,
        })
      );
      state.bannerList = Object.freeze(top_stories);
    });

    // 第一次渲染完:加载更多数据
    onMounted(() => {
      // 监听dom元素和可视窗口交叉
      let ob = new IntersectionObserver(async (changes) => {
        let item = changes[0];
        if (item.isIntersecting) {
          // 获取往日新闻
          let result = await api.queryNewsBefore(
            state.newsList[state.newsList.length - 1]["date"]
          );
          state.newsList.push(Object.freeze(result));
        }
      });
      ob.observe(loadMore.value);
    });

    return {
      ...toRefs(state),
      loadMore,
      formatTime,
    };
  },
};
</script>

<style lang="less" scoped>
.banner-box {
  box-sizing: border-box;
  height: 375px;
  background: #d5d5d5;

  .van-swipe {
    height: 100%;
    background: #fff;

    .content {
      position: relative;
      display: block;
      height: 100%;
      color: #fff;

      img {
        display: block;
        width: 100%;
        height: 100%;
      }

      .mark {
        position: absolute;
        bottom: 0;
        left: 0;
        box-sizing: border-box;
        padding: 10px 20px;
        width: 100%;
        height: 110px;
        background: rgba(0, 0, 0, 0.3);
        background: -webkit-linear-gradient(
          top,
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 0.5)
        );

        .title {
          padding-top: 10px;
          max-height: 50px;
          font-size: 20px;
          line-height: 25px;
          overflow: hidden;
        }

        .tip {
          font-size: 12px;
          line-height: 20px;
        }
      }
    }

    /deep/ .van-swipe__indicators {
      left: auto;
      right: 15px;
      transform: none;

      .van-swipe__indicator--active {
        width: 15px;
        border-radius: 3px;
        background: #fff;
      }
    }
  }
}

.news-box {
  padding: 0 15px;

  .van-divider {
    margin: 5px 0;
    font-size: 12px;

    &:before {
      display: none;
    }
  }
}

.van-skeleton {
  padding: 30px 15px;
}

.lazy-more {
  display: flex;
  justify-content: center;
  padding: 10px;
  background: #f4f4f4;
}
</style>