<template>
  <div class="library">
    <div class="hello">
      <div class="library-item" v-for="item in items" :key="item.title" :to="item.url">
        <router-link :to="{ path: item.url }">
          <img :src="item.img" :alt="item.title + ' - book preview'">
          <div class="lib-layer">
            <span>Preview</span>
            <h6>{{item.title}}</h6>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

import eventHub from '../event-hub.js'

export default {
  name: 'library',
  props: {
    iSize: {
      type: Number,
      default: 50
    }
  },
  data() {
    return {
      itemSize: this.iSize,
      items: [
        { title: 'How to Sell a Crapload of Books', img: '/static/img/ilG6Mf.jpg', url: '/Reader/How-to-Sell-a-Crapload-of-Books' },
        { title: 'Normal Family', img: '/static/img/aDJ4nh.jpg', url: '/Reader/Normal-Family' },
        { title: 'An American Gospel', img: '/static/img/Q2Ueo0.jpg', url: '/Reader/An-American-Gospel' }
      ],
    }
  },
  created: function() {
    eventHub.$on('iSizeChanged', (newValue) => {
      this.itemSize = newValue
      var img = this.$el.querySelectorAll('a > img')
      for (var i = 0; i < img.length; i++) {
        img[i].style.width = this.itemSize + 150 + 'px'
      }
    })
  }
}
</script>
