<template>
  <div class="home">
    <app-header />

    <!-- <todo-list /> -->
    <div class="container-concav">
      <todo-list
        v-for="(todo, index) in todos"
        :key="todo.name"
        :todo="todo"
        :categorie="index"
      />
    </div>

    <!-- Resume tasks -->
    <v-card
      color="var(--v-background-base)"
      class="card-shadow pb-2 mx-10 mb-10"
    >
      <v-card-title class="text-center justify-center pt-10 pb-8">
        <h1 class="font-weight-bold ">
          {{ $t("tabs.tab-title") }}
        </h1>
      </v-card-title>

      <v-tabs
        v-model="classes"
        background-color="transparent"
        color="var(--v-background-base)"
        hide-slider
        show-arrows
        centered
      >
        <v-tab v-for="(item, i) in categories" :key="i" :id="item.icon">
          {{ $t(`bar.${item.text}`) }}
        </v-tab>
      </v-tabs>

      <!-- Tab Items -->
      <v-tabs-items v-model="classes">
        <v-tab-item v-for="(item, i) in categories" :key="i">
          <v-card color="var(--v-background-base)" flat>
            <v-card-text
              v-if="item.items.length === 0"
              class="text-center my-15"
            >
              <!-- If no Task -->
              {{ $t("tabs.tab-message") }}
            </v-card-text>

            <!-- If Array is not umpty -->
            <v-card-text v-else>
              <v-list color="var(--v-background-base)" dense>
                <task-item
                  v-for="(task, i) in item.items"
                  :key="i"
                  :task="task"
                  :taskItem="i"
                  :todoItem="task.idCategorie"
                  :categorie="task.name"
                />
              </v-list>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Header from "@/components/Header.vue";
import TodoList from "@/components/Todo/TodoList.vue";
import TaskItem from "../components/Todo/TaskItem";

export default {
  name: "Home",
  components: {
    "app-header": Header,
    TodoList,
    TaskItem,
  },
  data() {
    return {
      classes: this.$route.params.class ? this.$route.params.class : 0,
    };
  },
  computed: {
    ...mapState(["todos", "categories"]),
  },
  watch: {
    $route(to, from) {
      this.classes = to.params.class; // go to this params id (change my tab key)
    },
  },
};
</script>

<style lang="scss" scoped>
.container-concav {
  padding: 20px;
  border-radius: 20px;
  background: var(--v-background-base);

  margin: 30px 20px;

  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(225px, 265px)
  ); // auto-fit: auto responsive with max and min width
  grid-gap: 20px;
  align-items: start; // remove strech on each feat grid, title has no big white space in its bottom
}

@media screen and (max-width: 650px) {
  .container-concav {
    grid-template-columns: repeat(auto-fit, minmax(245px, 1fr));
  }
}
</style>
