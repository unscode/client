import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueAuthenticate from 'vue-authenticate';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

// Configurações do Axios
axios.defaults.baseURL = 'http://gic.unscode.local/api/v1/';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

Vue.use(VueAxios, axios);
Vue.use(VueAuthenticate, {
  baseUrl: 'http://gic.unscode.local',
  tokenPath: 'access_token',
  tokenName: 'token',
  tokenPrefix: 'gic',
  tokenHeader: 'Authorization',
  tokenType: 'Bearer',
  loginUrl: '/auth/login',
  registerUrl: '/auth/register',
  logoutUrl: null,
  storageType: 'cookieStorage',
  storageNamespace: 'gic',
  /*cookieStorage: {
    domain: getCookieDomainUrl(),
    path: '/',
    secure: true
  },*/
  requestDataKey: 'data',
  responseDataKey: 'data',

  /**
   * Default request interceptor for Axios library
   * @context {VueAuthenticate}
   */
  bindRequestInterceptor: function ($auth) {
    const tokenHeader = $auth.options.tokenHeader;
    $auth.$http.interceptors.request.use((config) => {

      // Gambiarra, hehehe ...
      if (config.url === 'http://gic.unscode.local/oauth/token') {
        config.data['grant_type'] = 'authorization_code';
        config.data['client_secret'] = 'HcWI2JWzv6IjQM870bGKRNWFAVbgEMDpPD74TW2M';
        if (config.data.redirectUri) {
          config.data['redirect_uri'] = config.data.redirectUri;
          delete config.data['redirectUri'];
        }
        if (config.data.clientId) {
          config.data['client_id'] = config.data.clientId;
          delete config.data['clientId'];
        }
      }

      if ($auth.isAuthenticated()) {
        config.headers[tokenHeader] = [
          $auth.options.tokenType, $auth.getToken()
        ].join(' ');
      } else {
        delete config.headers[tokenHeader];
      }
      return config;
    });
  },

  providers: {
    oauth2: {
      name: 'gic',
      url: 'http://gic.unscode.local/oauth/token',
      clientId: 4,
      redirectUri: 'http://localhost:8080/auth/callback',
      authorizationEndpoint: 'http://gic.unscode.local/oauth/authorize',
      defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
      requiredUrlParams: null,
      optionalUrlParams: ['scope'],
      scope: '*',
      scopePrefix: null,
      scopeDelimiter: null,
      state: null,
      oauthType: '2.0',
      popupOptions: {
        top: 200,
        left: 100,
        width: 700,
        height: 400
      },
      responseType: 'code',
      responseParams: {
        code: 'code',
        clientId: 4,
        redirectUri: 'http://localhost:8080/auth/callback'
      }
    }
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
