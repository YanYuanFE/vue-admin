// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

import App from './App';
import router from './router';

Vue.use(Element);

import axios from './utils/interceptor';
Vue.prototype.$http = axios;

import store from './store/index.js';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
