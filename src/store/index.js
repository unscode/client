import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
  },
  mutations: {
    isAuthenticated(state, payload) {
      state.isAuthenticated = payload.isAuthenticated;
    }
  },
  actions: {
    // Perform VueAuthenticate login using Vuex actions
    login(context, payload) {
      vueAuth.login(payload.user, payload.requestOptions)
        .then((response) => {
          context.commit('isAuthenticated', {
            isAuthenticated: vueAuth.isAuthenticated()
          });
        });
    }
  },
  modules: {},
  getters: {
    isAuthenticated() {
      return this.$auth.isAuthenticated();
    }
  }
});
