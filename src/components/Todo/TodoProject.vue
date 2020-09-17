<template>
  <div class="todo">
    <div class="header-todo d-flex mt-10">
      <div class="head-title d-flex align-center mr-10">
        <div class="icon-title">
          <v-icon class="mr-5">fa-user</v-icon>
        </div>
        <h1>Personnal</h1>
      </div>
      <div class="progress-bar-circular">
        <v-progress-circular
          rotate="360"
          size="100"
          width="15"
          value="55"
          color="teal"
        >
          55
        </v-progress-circular>
      </div>
    </div>
    <v-divider class="mt-10"></v-divider>
    <div class="item-list">
      <div class="item-task">
        <v-switch></v-switch>
      </div>
    </div>
  </div>
</template>

<script>
import TaskItem from "./TaskItem";
export default {
  components: {
    TaskItem,
  },
  computed: {
    todosItems() {
      return this.$store.state.allTasks;
    },
  },
};
</script>
