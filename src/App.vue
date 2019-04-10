<template>
  <div>
    <router-view></router-view>
    <narbar :tabs="tabs"></narbar>
  </div>
</template>

<script>
import narbar from './components/narbar'
export default {
  name: 'app',
  data () {
    return {
      tabs: [
        { name: '电影', href: '/films', icon: 'icon-films' },
        { name: '影院', href: '/cinemas', icon: 'icon-cinemas' },
        { name: '特惠', href: '/sales', icon: 'icon-sales' },
        { name: '我的', href: '/center', icon: 'icon-center' }
      ]
    }
  },
  components: {
    narbar: narbar
  }
}
</script>

<style lang='less'>
  @import './styles/base.less';
</style>
