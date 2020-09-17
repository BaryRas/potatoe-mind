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

  // SignUp with email
  async signUserUp({ commit }, payload) {
    commit("setLoading", true);
    const todos = [
      {
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
      },
    ];
    let newUser = {};
    Object.assign(newUser, { todos });

    // New DB for new user
    const newDBCollection = (userInfos, todo) => {
      db.collection(userInfos.id)
        .doc("Work")
        .set(todo);

      db.collection("users")
        .doc(userInfos.id)
        .set({
          email: userInfos.email,
          name: userInfos.name,
          photoURL: userInfos.photoURL,
        });
      commit("setUser", userInfos);
    };

    // A verifier
    if (payload.social === "facebook" || payload.social === "google") {
      const provider =
        payload.social === "google"
          ? new firebase.auth.GoogleAuthProvider()
          : new firebase.auth.FacebookAuthProvider();

      const cred = await firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          newUser.photoURL = result.user.photoURL;
          newUser.id = result.user.uid;
          newUser.name = result.user.displayName;
          newUser.email = result.user.email
            ? result.user.email
            : "No email register";

          commit("setLoading", false);

          return newUser;
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

          // ...
        });
      newDBCollection(cred, todos[0]);
    } else {
      const cred = await firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          newUser.id = user.user.uid;
          newUser.name = payload.name;
          newUser.email = payload.email;
          newUser.photoURL = null;
          commit("setLoading", false);

          return newUser;
        })
        .catch((err) => {
          commit("setLoading", false);

          commit("setError", err);
          console.log(err);
        });
      newDBCollection(cred, todos[0]);
    }
  },

  // Sign in to firestore
  signUserIn({ commit }, payload) {
    commit("setLoading", true);
    if (payload.social) {
      return new Promise((resolve, reject) => {
        const provider =
          payload.social === "google"
            ? new firebase.auth.GoogleAuthProvider()
            : new firebase.auth.FacebookAuthProvider();

        firebase
          .auth()
          .signInWithPopup(provider)
          .then((result) => {
            const usernew = result.additionalUserInfo.isNewUser;
            if (usernew == true) {
              commit("setError", {
                message: "New User, please signup and join our team!",
              });
              result.user.delete();
              commit("setLoading", false);

              resolve();
            } else {
              const id = result.user.uid;
              commit("setUser", id);
              commit("setLoading", false);

              resolve();
            }
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

            // ...
            reject();
          });
      });
    } else {
      return new Promise((resolve, reject) => {
        firebase
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password)
          .then((user) => {
            let id = user.user.uid;
            commit("setUser", id);
            commit("setLoading", false);

            resolve();
            // commit("setLoading", false);
          })
          .catch((err) => {
            // commit("setLoading", false);
            commit("setError", err);
            commit("setLoading", false);

            reject();
          });
      });
    }
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
