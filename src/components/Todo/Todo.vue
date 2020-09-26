<template>
  <div class="ml-8 mr-8">
    <v-row class="my-15">
      <v-col>
        <h1 class="text-center font-weight-bold mb-10">
          {{ todo.name }}
        </h1>
        <h2>{{ $t("header.quote") }}</h2>
        <span>{{ $d(new Date(), "short", `${dateLocale}`) }}</span>
      </v-col>
    </v-row>

    <!-- Confirm Box -->
    <confirm ref="confirm"></confirm>

    <v-row>
      <v-col>
        <v-card color="var(--v-background-base)" class="card-shadow pb-2">
          <v-card-actions v-if="!displayAddTodo">
            <v-btn
              @click="toggleDisplayAddTodo"
              class="ml-5 my-8"
              color="var(--v-background-base)"
            >
              <v-icon left>fa-plus</v-icon> {{ $t("todo.add-button") }}
            </v-btn>
            <v-spacer></v-spacer>
            <v-tooltip top color="var(--v-background-base)">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  @click="deleteProject(todo.name)"
                  class="mr-5"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon color="secondary">fa-times</v-icon>
                </v-btn>
              </template>
              <span>{{ $t("todo.delete-project") }}</span>
            </v-tooltip>
          </v-card-actions>

          <div class="add-todo mb-15 pa-8" v-if="displayAddTodo">
            <AddTodo
              :categorieName="this.todo.name"
              :categorie="this.categorie"
            />
          </div>

          <v-tabs
            v-model="tab"
            background-color="var(--v-background-base)"
            hide-slider
            show-arrows
            centered
          >
            <v-tab v-for="item in items" :key="item.id">
              {{ $t(`bar.${item.label}`) }}
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
                  {{ $t("tabs.tab-message") }}
                </v-card-text>

                <!-- If Array is not umpty -->
                <v-card-text v-else>
                  <v-list color="var(--v-background-base)" dense shaped>
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
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AddTodo from "./AddTodo";
import TodoTabs from "./TodoTabs";
import TaskItem from "./TaskItem";
import uuid from "uuid/v4";
import moment from "moment-mini";
import ConfirmBox from "@/components/Shared/ConfirmBox";
import i18n from "../../i18n";

export default {
  components: {
    AddTodo,
    TodoTabs,
    TaskItem,
    confirm: ConfirmBox,
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
        label: "today",
        content: this.todo.items[0],
        id: uuid(),
      },
      {
        label: "upcoming",
        content: this.todo.items[1],
        id: uuid(),
      },
      {
        label: "outdate",
        content: this.todo.items[2],
        id: uuid(),
      },
      {
        label: "all-tasks",
        content: this.todo.items[3],
        id: uuid(),
      },
    ];
  },

  computed: {
    displayAddTodo() {
      return this.$store.state.displayAddTodo;
    },
    dateLocale() {
      return i18n.locale == "en" ? "en-US" : "fr-FR";
    },
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

    toggleDisplayAddTodo() {
      this.$store.commit("switchAddTodo");
    },

    deleteProject(name) {
      const user = this.$store.getters.user;

      this.$refs.confirm
        .open(
          i18n.locale == "en" ? "Delete" : "Supprimer",
          i18n.locale == "en"
            ? "Are you sure to delete this project?"
            : "Etes-vous sûr de supprimer ce projet?"
        )
        .then((confirm) => {
          if (confirm) {
            if (user) {
              this.$store.dispatch("deleteDbProject", { name });
            } else {
              this.$store.commit("deleteProject", { name });
            }

            this.$store.commit("distributeTask");
            this.$router.push("/");
            this.confirmBox = false;
          }
        });
    },
  },
};
</script>

<style lang="scss">
h1 {
  font-size: 50px;
  text-transform: uppercase;
}
</style>
