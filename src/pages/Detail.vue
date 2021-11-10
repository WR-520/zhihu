<template>
    
  <div class="content"></div>
  <div class="nav-box">
    <a href="javascript:;">
      <van-icon name="arrow-left"></van-icon>
      <van-icon name="comment-o" badge="12"></van-icon>
      <van-icon name="good-job-o" badge="99"></van-icon> 
      <van-icon name="start-o"></van-icon>
      <van-icon name="share-o"></van-icon>
    </a>
  </div>
</template>

<script>
export default {
  name: "Detail",
};
</script>
<style lang="less" scoped>
.content {
  background: #fff;
  padding-bottom: 50px;
  margin: 0;

  /deep/ .img-place-holder {
    height: 375px;
    overflow: hidden;
    img {
      display: block;
      margin: 0;
      width: 100%;
      min-height: 100%;
    }
  }
}

.van-skeleton {
  padding: 30px 15px;
}

.nav-box {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 15px;
  width: 100%;
  height: 50px;
  background: #f4f4f4;

  .van-icon:nth-child(1) {
    position: relative;
    &::after {
      position: absolute;
      top: -10%;
      right: -15px;
      content: "";
      width: 1px;
      height: 120%;
      background: #d5d5d5;
    }
  }

  /deep/ .van-badge {
    background-color: transparent;
    border: none;
    color: #000;
    right: -5px;
  }
}
</style>
