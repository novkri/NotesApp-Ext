import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import notes from "./notes";
import info from "./info";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {},
  getters: {
    error: s => s.error
  },
  modules: {
    auth,
    notes,
    info
  }
});
