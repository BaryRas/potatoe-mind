export default {
  currentIndex: 0,
  windowWidth: window.innerWidth, // controlling mobil sidebar hide/show in created at "https://medium.com/@devdude/handling-screen-media-queries-for-js-on-a-vue-js-project-357e40fb1c77"
  user: null,
  name: "Guest",
  email: "guest@none.com",
  error: null,
  photoURL: null,
  drawer: true,
  addTodoSnackbar: false,
  displayAddTodo: false,
  confirmWarningBox: false,
  snackbar: false,
  loading: false,
  dialog: false,
  editing: null,
  todos: [],
  categories: [
    { icon: "fa-folder-o", text: "all-tasks", items: [] },
    { icon: "fa-clock-o", text: "today", items: [] },
    { icon: "fa-bullhorn", text: "upcoming", items: [] },
    { icon: "fa-refresh", text: "outdate", items: [] },
  ],
};
