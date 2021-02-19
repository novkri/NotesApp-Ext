import firebase from "firebase/app";

export default {
  state: {
    notes: {}
  },

  mutations: {
    setNotes(state, notes) {
      state.notes = notes;
    },
    addNote(state, note) {
      state.notes.push(note);
    }
  },

  actions: {
    async createNote({ dispatch, commit }, payload) {
      try {
        const uid = await dispatch("getUid");
        const note = await firebase
          .database()
          .ref(`/users/${uid}/notes`)
          .push(payload);
        return { ...payload, id: note.key };
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },

    async deleteNote({ dispatch, commit }, noteId) {
      try {
        const uid = await dispatch("getUid");
        console.log(noteId, uid);
        await firebase
          .database()
          .ref(`/users/${uid}/notes`)
          .child(noteId)
          .remove();
        // return { ...payload, id: note.key };
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },

    async fetchNotes({ dispatch }) {
      try {
        const uid = await dispatch("getUid");
        const notes =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/notes`)
              .once("value")
          ).val() || {};

        return Object.keys(notes).map(key => ({ ...notes[key], id: key }));
      } catch (error) {
        console.error(error);
      }
    }
  },

  getters: {
    notes: s => s.notes
  }
};
