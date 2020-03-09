import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueAuthenticate from 'vue-authenticate';
import VueLodash from 'vue-lodash';
import lodash from 'lodash';
import { Snackbar, Toast } from 'buefy';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { auth } from './config';

Vue.use(VueAxios, axios);
Vue.use(Snackbar);
Vue.use(Toast);
Vue.use(VueAuthenticate, auth);
Vue.use(VueLodash,  { name: 'custom' , lodash: lodash });
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

// Configurações do Axios
axios.defaults.baseURL = `${process.env.VUE_APP_API_BASE_URL}`;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// Add a response interceptor
/*axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});*/

