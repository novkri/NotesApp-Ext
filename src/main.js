import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuelidate from "vuelidate";
import Loader from "@/components/Loader";

import "materialize-css/dist/js/materialize.min";
import "materialize-css/dist/css/materialize.min.css";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import moment from "moment";

import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";



Vue.config.productionTip = false;

Vue.use(Vuelidate);

Vue.prototype.moment = moment;

Vue.use(VueQuillEditor, {
  modules: {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote"],
      [{ list: "ordered" }],
      [{ color: [] }, { background: [] }],
      ["link"]
    ]
  },
  theme: "snow"
});

Vue.component("Loader", Loader);

Vue.use(Toast);

firebase.initializeApp({
  apiKey: "AIzaSyAxu3i0kNI5ZjH30jtbm6De3MmJLRTPVdA",
  authDomain: "notesapp-d4a81.firebaseapp.com",
  databaseURL: "https://notesapp-d4a81-default-rtdb.firebaseio.com",
  projectId: "notesapp-d4a81",
  storageBucket: "notesapp-d4a81.appspot.com",
  messagingSenderId: "1004277289007",
  appId: "1:1004277289007:web:307aeb15f704f18c4b76da"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
