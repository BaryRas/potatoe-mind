import Vue from "vue";
import VueRouter from "vue-router";
import i18n from "../i18n";
import Home from "../views/Home.vue";
import Login from "../components/Register/Login.vue";
import AddTodo from "../components/Todo/AddTodo.vue";
import Todo from "../components/Todo/Todo.vue";
import NewProject from "../components/Project/NewProject.vue";
import PageNotFound from "../components/Shared/PageNotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: `/${i18n.locale}`,
  },
  {
    path: "/:lang",
    component: {
      render(c) {
        return c("router-view");
      },
    },
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
      },
      {
        path: "login",
        name: "Login",
        component: Login,
      },
      {
        path: "todo/:project",
        props: true,
        name: "Todo",
        components: { default: Todo },
        children: [
          {
            path: "/new-task",
            props: true,
            name: "AddTodo",
            component: AddTodo,
          },
        ],
      },
      {
        path: "project/new",
        name: "NewProject",
        component: NewProject,
      },
      {
        path: "*",
        name: "PageNotFound",
        component: PageNotFound,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash }; // to.hash ==> hash: '#data' we were setup
    }
    return { x: 0, y: 0 };
  },
});

export default router;
