import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import jquery from 'jquery';
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VueSweetalert2 from 'vue-sweetalert2';

import App from './App.vue';
import router from './router';
import store from './store';

// jquery 設定
window.$ = jquery;

// vue-axios 設定
Vue.use(VueAxios, axios);

// vue-loading-overlay 設定
Vue.component('Loading', Loading);

// vue-sweetalert2 設定
Vue.use(VueSweetalert2);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
