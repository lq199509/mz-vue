<template>
  <div class="swiper-container billboards">
    <div class="swiper-wrapper">
      <div class="swiper-slide"
        v-for="item in banners"
        :key="item.bannerId">
        <img :src="item.imgUrl" alt="">
      </div>
    </div>
    <!-- 分页器 -->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
  data () {
    return {
      swiper: null
    }
  },
  props: {
    banners: {
      type: Array
    }
  },
  updated () {
    if (!this.swiper) {
      this.swiper = new Swiper('.swiper-container', {
        loop: true, // 无缝轮播
        autoplay: 1000,
        initialSlide: 2,
        autoplayDisableOnInteraction: false,
        pagination: {
          el: '.swiper-pagination'
        }
      })
    }
  }
}
</script>

<style lang="less">
.swiper-container {
  width: 100%;
  height: 210px;

  img {
    width: 100%;
  }

  .swiper-pagination-bullet {
    background: #fff;
    opacity: 1;
  }
  .swiper-pagination-bullet-active {
    background: red;
  }
}
</style>
