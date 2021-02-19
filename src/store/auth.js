import firebase from "firebase/app";

export default {
  state: {},

  mutations: {},

  actions: {
    async register({ dispatch, commit }, { email, password, username }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch("getUid");
        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .set({
            username
          });
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },
    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },

    async login({ commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },

    async logout({ commit }) {
      await firebase.auth().signOut();
      commit("clearInfo");
    }
  },

  modules: {}
};
