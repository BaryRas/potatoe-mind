import firebase from "firebase";
import { db } from "@/main";
import uuid from "uuid/v4";

export default {
  // Fetch guest data to firebase (no user signin)
  fetchData({ commit }) {
    commit("setLoading", true);
    db.collection("users")
      .doc("guest")
      .get()
      .then((docs) => {
        const data = docs.data();
        commit("fetchData", data);
        commit("distributeTask");
        commit("setLoading", false);
      });
  },

  // Create BD for a new user
  createNewUserDB({ commit }, payload) {
    const todos = {
      icon: "fa-briefcase",
      name: "Work",
      tasks: [
        {
          id: uuid(),
          title: "Create my first Todo",
          note: "I have to do it now",
          date: new Date(),
          done: false,
          deleted: false,
        },
      ],
    };
    // New DB for new user
    db.collection(payload.id)
      .doc("Work")
      .set(todos);

    db.collection("users")
      .doc(payload.id)
      .set({
        email: payload.email,
        name: payload.name,
        photoURL: payload.photoURL,
      });
    commit("setUser", payload);
  },

  // Sign In/Up user with Popup
  signUserWithPopup({ commit }, payload) {
    console.log(payload.social);
    return new Promise((resolve, reject) => {
      commit("setLoading", true);
      const provider =
        payload.social === "google"
          ? new firebase.auth.GoogleAuthProvider()
          : new firebase.auth.FacebookAuthProvider();
      let userInfos = {};

      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          userInfos.isNewUser = result.additionalUserInfo.isNewUser;
          userInfos.photoURL = result.user.photoURL;
          userInfos.id = result.user.uid;
          userInfos.name = result.user.displayName;
          userInfos.email = result.user.email
            ? result.user.email
            : "No email register";

          resolve(userInfos);
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          const credential = error.credential;
          commit("setLoading", false);

          commit("setError", error);
          reject();
          // ...
        });
    });
  },

  // SignUp with email
  signUpWithEmail({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("setLoading", true);

      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          let newUser = {};
          newUser.id = user.user.uid;
          newUser.name = payload.name;
          newUser.email = payload.email;
          newUser.photoURL = null;
          resolve(newUser);
        })
        .catch((err) => {
          commit("setLoading", false);
          commit("setError", err);
          console.log(err);
          reject();
        });
    });
  },

  // SIGN IN with email
  signInWithEmail({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit("setLoading", true);

      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          let id = user.user.uid;
          commit("setUser", id);
          resolve();
        })
        .catch((err) => {
          commit("setError", err);
          commit("setLoading", false);

          reject();
        });
    });
  },

  // Fetching Register User Datas
  fetchRegisterUserData({ commit, state }) {
    commit("setLoading", true);

    const id = state.user;
    db.collection("users")
      .doc(id)
      .get()
      .then((docs) => {
        const data = docs.data();
        const newUser = {
          id,
          name: data.name,
          email: data.email,
          photoURL: data.photoURL,
        };
        db.collection(id)
          .get()
          .then((docs) => {
            let todos = [];
            docs.forEach((doc) => {
              todos.push(doc.data());
            });

            Object.assign(newUser, { todos });
            commit("signUser", newUser);
            commit("distributeTask");
            commit("setLoading", false);
          });
      });
  },

  // Logout
  logout({ commit }) {
    commit("setLoading", true);

    firebase
      .auth()
      .signOut()
      .catch((err) => {
        // commit("setLoading", false);
        commit("setError", err);
        console.log(err);
      });
    commit("setUser", { id: null });
    commit("setLoading", false);
  },

  createNewProject({ state }, payload) {
    const id = state.user;
    db.collection(id)
      .doc(payload.name)
      .set({
        icon: payload.icon,
        tasks: payload.tasks,
        name: payload.name,
      })
      .catch((err) => {
        // commit("setLoading", false);
        commit("setError", err);
        console.log(err);
      });
  },

  deleteDbProject({ commit, state }, payload) {
    const id = state.user;

    db.collection(id)
      .doc(payload.name)
      .delete()
      .then(() => {
        commit("deleteProject", { name: payload.name });
        commit("distributeTask");
      })
      .catch((err) => {
        // commit("setLoading", false);
        commit("setError", err);
        console.log(err);
      });
  },
  setUser({ commit }, payload) {
    commit("setUser", payload);
  },

  clearError({ commit }) {
    commit("clearError");
  },

  editTask({ commit }, payload) {
    const tasks = payload.tasks;

    db.collection(payload.user)
      .doc(payload.categorie)
      .update({ tasks })
      .then(() => {
        commit("editTask", payload);
        commit("distributeTask");
      });
  },
};
