import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "firebase/app";
import "firebase/firestore";
import Alert from "./components/Shared/Alert.vue";

Vue.config.productionTip = false;
Vue.component("app-alert", Alert);

// Firebase and firestore
firebase.initializeApp({
  apiKey: "AIzaSyCAjq86_FDVfpmQeoYUKK9UHPD9xxgpQtA",
  authDomain: "todo-vuetify-e09e5.firebaseapp.com",
  databaseURL: "https://todo-vuetify-e09e5.firebaseio.com",
  projectId: "todo-vuetify-e09e5",
  storageBucket: "todo-vuetify-e09e5.appspot.com",
  messagingSenderId: "1070499049227",
  appId: "1:1070499049227:web:315dca9a0e7c0c49197c0e",
});
export const db = firebase.firestore();

/* 

   This is how to persist a logged on user in this App after a page refresh or kind of

   It has to be combine with setUser (action) to the store
*/
const persist = firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    let payload = {};
    // User is signed in.
    payload.id = user.uid;
    store.dispatch("setUser", payload);
    store.dispatch("fetchRegisterUserData", payload);
  } else {
    store.dispatch("fetchData");
  }
});

new Vue({
  router,
  store,
  vuetify,
  persist,
  render: (h) => h(App),
  created() {
    this.$store.dispatch("fetchData");
    window.addEventListener("resize", this.$store.commit("setWindowWidth"));
  },
}).$mount("#app");
