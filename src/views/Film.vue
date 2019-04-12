<template>
  <div class="film-list">
    <banner :banners='bannerList'></banner>
    <div class="tabs-bar-wrapper" :class="{fixed: isFixedTabs}">
      <div class="tabs-bar">
        <ul class="tabs-nav">
          <li style="width: 50%;"
          v-for='item in filmTypes'
          :key='item.id'
          @click='changeType(item)'
          :calss='{ active : curType === item.id }' >
            <span>{{ item.name }}</span>
          </li>
          <!-- <li calss='' style="width: 50%;">
            <span>即将上映</span>
          </li> -->
         <!-- <div class="tab-ink-bar-wrapper"
              style="transform: translate3d(0%, 0px, 0px);width: 50%;">
              <span class="tab-ink-bar" style="width: 56px;"></span>
            </div> -->
            <div
            class="tab-ink-bar-wrapper"
            :style="tabInkBarStyle">
            <span class="tab-ink-bar" style="width: 56px;"></span>
          </div>
        </ul>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import banner from '../components/banner'
import axios from 'axios'

export default {
  data () {
    return {
      filmTypes: [
        { id: 'nowPlaying', name: '正在热映', href: '/films/nowPlaying' },
        { id: 'comingSoon', name: '即将上映', href: '/films/comingSoon' }
      ],
      curType: this.$route.path.substring(7), // 这块默认让他根据url地址来做
      bannerList: [],
      isFixedTabs: false// 是否滚动那个正在热映与即将上映的那个东西。
    }
  },
  computed: {
    tabInkBarStyle () { // 这个计算属性根据curtype的值改变，curtype的值又是根据当时的url地址改变，所以就决定了'正在热映'或'即将上映'下面的红横线到底在哪个下面
      let obj = {
        transform: 'translate3d(0%, 0px, 0px)',
        width: '50%'
      }
      if (this.curType === 'comingSoon') {
        obj.transform = 'translate3d(100%, 0px, 0px)'
      }
      return obj
    }
  },
  components: {
    banner
  },
  methods: {
    getBanner () { // 获取轮播图的数据的方法
      axios.get('https://m.maizuo.com/gateway?type=2&cityId=440300&k=9463487', {
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"1.0.0","e":"1554895699231928234249"}',
          'X-Host': 'mall.cfg.common-banner'
        }
      }).then(res => {
        // console.log(res.data);
        let data = res.data
        if (data.status === 0) {
          this.bannerList = data.data
        } else {
          alert(data.msg)
        }
      })
    },
    changeType (item) { // 改变影片类型的方法
      this.curType = item.id
      this.$router.push(item.href)
    },
    onScoll () { // 滚动时固定影片类型的选择元素
      // console.log(11111)
      // 计算滚动条距离顶部的距离
      let scrollTop = document.documentElement.scrollTop
      if (scrollTop >= 210) {
        this.isFixedTabs = true
      } else {
        this.isFixedTabs = false
      }
    }
  },
  created () {
    this.getBanner()
    // this.onScoll()
  },
  activated () {
    window.addEventListener('scroll', this.onScoll)
  },

  deactivated () {
    // console.log('deactivated')
    window.removeEventListener('scroll', this.onScoll)
  }
}
</script>

<style lang="less">
@import '../styles/common/mixins.less';

.film-list {
  padding-bottom: 50px;
  .city-fixed {
    position: absolute;
    top: 18px;
    left: 7px;
    color: #fff;
    z-index: 10;
    font-size: 13px;
    background: rgba(0,0,0,.2);
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    text-align: center;
    padding: 0 5px;

    i {
      font-size: 10px;
    }
  }
}

.tabs-bar-wrapper {
  position: relative;
  top: 0;
  z-index: 100;
  width: 100%;
  overflow-x: hidden;
  background: #fff;
  -webkit-tap-highlight-color: rgba(0,0,0,0);

  &.fixed {
    position: fixed;
    top: 0;
  }

  .tabs-bar {
    .border-1-bottom;
    height: 49px;
    display: flex;
    align-items: center;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    transition: transform .2s cubic-bezier(.35,0,.25,1);
    position: relative;

    .tabs-nav {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      width: 100%;

      li {
        flex-shrink: 0;
        color: #191a1b;
        text-align: center;
        height: 16px;
        line-height: 16px;
        font-size: 14px;
        cursor: pointer;
        -webkit-tap-highlight-color: rgba(0,0,0,0);

        &.active {
          color: #ff5f16;
        }
      }

      .tab-ink-bar-wrapper {
        position: absolute;
        margin: auto;
        top: 30px;
        left: 0;
        transform: translateZ(0);
        transition: transform .2s cubic-bezier(.35,0,.25,1);

        .tab-ink-bar {
          border-bottom: 2px solid #ff5f16;
          border-radius: 20px;
          display: block;
          margin: auto;
        }
      }
    }
  }
}
</style>
