export default {
  todayTasks(state) {
    return state.todayTask;
  },

  // check user id
  user(state) {
    return state.user;
  },

  // check if user is registered
  userAuthenticated(state) {
    return state.user !== null && state.user !== undefined;
  },

  loading(state) {
    return state.loading;
  },
};
