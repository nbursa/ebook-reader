 /*jshint esversion: 6 */
 /* The Vue build version to load with the `import` command
 (runtime-only or standalone) has been set in webpack.base.conf with an alias. */


import Vue from 'vue';
import App from './App';
import router from './router';
import Vuetify from 'vuetify';
import VueShortkey from 'vue-shortkey';
import VueTouch from 'vue-touch';
// import Jquery from 'jquery';
// import Annotator from 'vue-annotator';

Vue.use(Vuetify);
Vue.use(VueShortkey);

VueTouch.config.swipe = {
  direction: 'horizontal',
  threshold: 10,
  velocity: 0.3,
  pointers: 1
};

Vue.use(VueTouch, {name: 'v-touch'});

// Vue.use(Jquery);
// Vue.use(Annotator);

Vue.config.productionTip = false;

const app = new Vue({
  el: '#app',
  data: {},
  router,
  render: h => h(App)
}).$mount('#app');

