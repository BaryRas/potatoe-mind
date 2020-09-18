import moment from "moment-mini";
import { Date } from "core-js";

export default {
  switchDrawer(state) {
    state.drawer = !state.drawer;
  },

  switchAddTodoSnackbar(state) {
    console.log("comming soon");
    state.addTodoSnackbar = !state.addTodoSnackbar;
    setTimeout(() => {
      state.addTodoSnackbar = false;
    }, 3000);
  },

  switchDialog(state) {
    state.dialog = !state.dialog;
  },

  switchConfirmWarningBox(state) {
    state.confirmWarningBox = !state.confirmWarningBox;
  },

  switchAddTodo(state) {
    state.displayAddTodo = !state.displayAddTodo;
  },

  // Transform datas date for static state (Guest)
  fetchData(state, payload) {
    // state.user = null;
    state.todos = [];

    payload.todos.forEach((todo) => {
      state.todos.push(todo);
    });

    state.name = payload.name;
    state.email = payload.email;
    const t1 = new Date();
    const t2 = t1.setDate(t1.getDate() + 3);
    const t3 = t1.setDate(t1.getDate() + 8);

    const timeSet = [
      new Date().toISOString(),
      new Date(t2).toISOString(),
      new Date(t3).toISOString(),
    ];
    state.todos.forEach((todo, index) => {
      todo.tasks[0].date = timeSet[index];
    });
  },

  // Take data return from firebase
  signUser(state, payload) {
    if (payload === null) {
      state.user = null;
    } else {
      state.name = payload.name;
      state.email = payload.email;
      state.photoURL = payload.photoURL;
      state.todos = payload.todos;
    }
  },

  addNewTask(state, payload) {
    state.todos[payload.index].tasks.push(payload.newTasks);
  },

  addNewProject(state, payload) {
    state.todos.push(payload);
  },

  distributeTask(state) {
    const allTasks = [];
    const todayTask = [];
    const upcommingTask = [];
    const outDateTask = [];

    state.todos.forEach((todo, index) => {
      const allTasksEachTodo = [];
      const todayTaskEachTodo = [];
      const upcommingTaskEachTodo = [];
      const outDateTaskEachTodo = [];

      todo.tasks.forEach((task) => {
        task.icon = todo.icon;
        task.name = todo.name;
        task.idCategorie = index;

        allTasks.push(task);
        allTasksEachTodo.push(task);
        let date;

        /***
         * Check if Date is string or Timestamp
         * Firebase Date is timestamp
         * ***/
        if (typeof task.date === "string") {
          date = task.date;
        } else {
          date = task.date.seconds * 1000;
        }

        if (moment().isSame(date, "day")) {
          todayTask.push(task);
          todayTaskEachTodo.push(task);
        } else if (moment().isBefore(date, "day")) {
          upcommingTask.push(task);
          upcommingTaskEachTodo.push(task);
        } else if (moment().isAfter(date, "day")) {
          outDateTask.push(task);
          outDateTaskEachTodo.push(task);
        }
      });
      todo.items = [
        todayTaskEachTodo,
        upcommingTaskEachTodo,
        outDateTaskEachTodo,
        allTasksEachTodo,
      ];
    });
    const categoriesTodo = [allTasks, todayTask, upcommingTask, outDateTask];
    categoriesTodo.forEach((cat, index) => {
      state.categories[index].items = cat;
    });
  },

  // toggle checkbox item or delete item
  editTask(state, payload) {
    state.todos[payload.todoIndex].tasks = payload.tasks;
  },

  deletedTask(state, payload) {
    const keepTasks = state.todos[payload.todoIndex].tasks.filter(
      (task) => task.id !== payload.id
    );
    state.todos[payload.todoIndex].tasks = keepTasks;
  },
  deleteProject(state, payload) {
    const keepTodos = state.todos.filter((todo) => todo.name !== payload.name);
    state.todos = keepTodos;
  },

  setUser(state, payload) {
    state.user = payload.id;
    if (payload.name) {
      state.name = payload.name;
    }
    if (payload.email) {
      state.email = payload.email;
    }
  },

  resetPhotoURL(state) {
    state.photoURL = null;
  },

  // controlling mobil sidebar hide/show in created
  setWindowWidth(state) {
    state.windowWidth = window.innerWidth;
  },

  setLoading(state, payload) {
    state.loading = payload;
  },

  setError(state, payload) {
    state.error = payload;
  },
  clearError(state) {
    state.error = null;
  },
};
