<template>
  <div class="ml-8 mr-8">
    <v-row class="my-15">
      <v-col>
        <h2>Progress is progress, no matter how small</h2>
        <span>{{ date }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="add-todo">
          <AddTodo
            :categorieName="this.todo.name"
            :categorie="this.categorie"
          />
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card color="var(--v-background-base)" class="card-shadow pb-2">
          <v-card-title class="text-center justify-center py-6">
            <h1 class="font-weight-bold">
              {{ todo.name }}
            </h1>
          </v-card-title>

          <v-tabs
            v-model="tab"
            background-color="var(--v-background-base)"
            hide-slider
            show-arrows
            centered
          >
            <v-tab v-for="item in items" :key="item.id">
              {{ item.label }}
            </v-tab>
          </v-tabs>

          <!-- Tab Items -->
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in items" :key="item.id">
              <v-card color="var(--v-background-base)" flat>
                <v-card-text
                  v-if="item.content.length === 0"
                  class="text-center my-15"
                >
                  <!-- If no Task -->
                  No Longer Task, You are Good
                </v-card-text>

                <!-- If Array is not umpty -->
                <v-card-text v-else>
                  <v-list color="var(--v-background-base)" dense>
                    <task-item
                      v-for="(task, i) in item.content"
                      :key="i"
                      :task="task"
                      :taskItem="i"
                      :todoItem="categorie"
                      :categorie="todo.name"
                    />
                  </v-list>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
          <v-card-actions>
            <v-tooltip top color="var(--v-background-base)">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  @click="deleteProject(todo.name)"
                  class="ml-5"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon color="secondary">fa-exclamation</v-icon>
                </v-btn>
              </template>
              <span>Delete Project</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col> </v-col>
    </v-row>
  </div>
</template>

<script>
import AddTodo from "./AddTodo";
import TodoTabs from "./TodoTabs";
import TaskItem from "./TaskItem";
import uuid from "uuid/v4";
import moment from "moment-mini";

export default {
  components: {
    AddTodo,
    TodoTabs,
    TaskItem,
  },
  data() {
    return {
      todo: {},
      categorie: "",
      confirmBox: false,
      tab: false,
      items: [],
      widgets: false,
      menu2: false,
      addTodo: false,
      componentKey: 0,
      date: moment().format("dddd, D MMMM YYYY"),
    };
  },

  created() {
    if (localStorage.todo) {
      this.todo = JSON.parse(localStorage.todo);
      this.categorie = JSON.parse(localStorage.categorie);
    } else {
      const indexTodo = this.$route.params.categorie;
      this.todo = this.$store.state.todos[indexTodo];
      localStorage.todo = JSON.stringify(this.todo);
      this.categorie = indexTodo;
      localStorage.categorie = this.categorie;
    }

    this.items = [
      {
        label: "Today",
        content: this.todo.items[0],
        id: uuid(),
      },
      {
        label: "Upcomming",
        content: this.todo.items[1],
        id: uuid(),
      },
      {
        label: "Out Date",
        content: this.todo.items[2],
        id: uuid(),
      },
      {
        label: "All Tasks",
        content: this.todo.items[3],
        id: uuid(),
      },
    ];
  },

  watch: {
    "$store.state.todos": {
      handler: function() {
        this.todo = this.$store.state.todos[this.categorie];
        this.items.forEach((item, index) => {
          item.content = this.todo.items[index];
        });
      },
      deep: true,
      immediate: true,
    },
    $route(to, from) {
      this.categorie = to.params.categorie; // go to this params (change my component)
      localStorage.categorie = this.categorie;
      this.todo = this.$store.state.todos[this.categorie];
      localStorage.todo = JSON.stringify(this.todo);
      this.items.forEach((item, index) => {
        item.content = this.todo.items[index];
      });
    },
  },

  methods: {
    checkbox() {
      this.widgets != this.widgets;
    },

    deleteProject(name) {
      const user = this.$store.getters.user;
      if (user) {
        this.$store.dispatch("deleteDbProject", { name });
      } else {
        this.$store.commit("deleteProject", { name });
      }

      this.$store.commit("distributeTask");
      this.$router.push("/");
      this.confirmBox = false;
    },
  },
};
</script>
