<template>
  <v-card color="var(--v-background-base)" class="card-shadow pb-2">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-3">{{ todo.name }}</h1>
    </v-card-title>

    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="var(--v-background-base)"
      hide-slider
      centered
    >
      <v-tab v-for="item in items" :key="item.label">
        {{ item.label }}
      </v-tab>
    </v-tabs>

    <!-- Tab Items -->
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.label">
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
  </v-card>
</template>

<script>
import TaskItem from "./TaskItem";
import uuid from "uuid/v4";
import i18n from "../../i18n";

export default {
  props: {
    todo: Object,
    categorie: Number,
  },
  components: {
    TaskItem,
  },
  data() {
    return {
      tab: false,
      items: [
        {
          label: `${i18n.message.bar.today}`,
          content: this.todo.items.todayTask,
          id: uuid(),
        },
        {
          label: "Upcomming",
          content: this.todo.items.upcommingTask,
          id: uuid(),
        },
        {
          label: "Out Date",
          content: this.todo.items.outDateTask,
          id: uuid(),
        },
        {
          label: "All Tasks",
          content: this.todo.items.allTasks,
          id: uuid(),
        },
      ],
    };
  },
  watch: {
    "$store.state.todos": {
      handler: function() {
        console.log("You changed me");
        this.todo = this.$store.state.todos[this.categorie];
        this.items.forEach((item) => {
          item.id = uuid();
        });
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss"></style>
