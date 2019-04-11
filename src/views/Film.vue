<template>
  <div>
    <banner :banners='bannerList'></banner>
  </div>
</template>

<script>
import banner from '../components/banner'
import axios from 'axios'

export default {
  data () {
    return {
      bannerList: []
    }
  },
  components: {
    banner
  },
  methods: {
    getBanner () {
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
    }
  },
  created () {
    this.getBanner()
  }
}
</script>
