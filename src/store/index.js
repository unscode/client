import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: 'gic', // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
});

export default new Vuex.Store({
  state: {
    isOffline: false,
    isAuthenticated: false,
    medals: [] // Medalha(s)
  },
  getters: {
    findMedalsById: state => id => {
      return state.medals.find(medal => medal.id === id);
    },
  },
  mutations: {
    isAuthenticated(state, payload) {
      state.isAuthenticated = payload;
    },
    medals(state, payload) {
      state.medals = payload;
    },
    insertMedal(state, medal) {
      state.medals.splice(0, 0, medal);
    },
    deleteMedalsById(state, medalId) {
      let index = state.medals.findIndex(medal => medal.id === medalId);
      console.log(index);
      state.medals.splice(index, 1);
    },
  },
  modules: {},
  plugins: [vuexLocalStorage.plugin],
});
