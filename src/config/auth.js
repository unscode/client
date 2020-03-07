export default {
  baseUrl: process.env.VUE_APP_AUTHORIZATION_BASE_URL,
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
    console.log(process.env);
    const tokenHeader = $auth.options.tokenHeader;
    $auth.$http.interceptors.request.use((config) => {
      // Gambiarra, hehehe ...
      if (config.url === `${process.env.VUE_APP_AUTHORIZATION_BASE_URL}/oauth/token`) {
        config.data['grant_type'] = 'VUE_APP_AUTHORIZATION_code';
        config.data['client_secret'] = '7z52qZYM5ydXZ5p90oOSxTlYP7yH2gDoNBwkKWv4';
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
      url: `${process.env.VUE_APP_AUTHORIZATION_BASE_URL}/oauth/token`,
      clientId: process.env.VUE_APP_AUTHORIZATION_CLIENT_ID,
      redirectUri: `${process.env.VUE_APP_AUTHORIZATION_BASE_URL}/auth/callback`,
      authorizationEndpoint: `${process.env.VUE_APP_AUTHORIZATION_BASE_URL}/oauth/authorize`,
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
        clientId: process.env.VUE_APP_AUTHORIZATION_CLIENT_ID,
        redirectUri: process.env.VUE_APP_AUTHORIZATION_REDIRECT_URI
      }
    }
  },
};
