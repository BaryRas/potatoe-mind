<template>
  <v-card color="var(--v-background-base)" class="pa-5 card-shadow">
    <v-card-title class="headline"
      >What tasks are you planning to perform?</v-card-title
    >

    <v-card-subtitle>Add note and plan your potatoes recipe!</v-card-subtitle>

    <v-card-text class="mt-12 mb-8">
      <v-form class="full-width">
        <v-text-field
          label="Your task"
          name="Your task"
          v-model="task"
          type="texte"
          :rules="taskRules"
          color="secondary"
        >
        </v-text-field>
        <v-text-field
          label="Add note"
          name="Add note"
          v-model="note"
          single-line
          type="texte"
          color="secondary"
        >
        </v-text-field>
      </v-form>

      <!-- <p>Plan your Task</p> -->
      <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            prepend-icon="fa-calendar"
            readonly
            color="#babecc"
            v-bind="attrs"
            v-on="on"
            class="align-form"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          @input="menu2 = false"
          color="primary"
          locale
        ></v-date-picker>
      </v-menu>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click.prevent="uploadTasks" color="var(--v-background-base)">
        <v-icon left>fa-check-square-o</v-icon>
        Add Task
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>

    <!-- Find out if it's necessary  -->
    <!-- SnackBar -->
    <success-snackbar :text="text" />
  </v-card>
</template>

<script>
import { mapMutations } from "vuex";
import TaskItem from "./TaskItem";
import { db } from "@/main";
import uuid from "uuid/v4";

export default {
  props: {
    categorie: Number,
    categorieName: String,
  },
  components: {
    TaskItem,
  },
  data() {
    return {
      close: false,
      note: "",
      text: "Tasks added successfully",
      date: new Date().toISOString().substr(0, 10),
      menu2: false,
      task: "",
      newTasks: [],
      taskRules: [(v) => !!v || "Task is required"],
    };
  },

  methods: {
    ...mapMutations(["addNewTask"]),

    // Push tasks to firebase
    uploadTasks() {
      const item = {
        id: uuid(),
        title: this.task,
        date: this.date,
        done: false,
        note: this.note,
        idCategorie: this.categorie,
      };
      this.addNewTask({ index: this.categorie, newTasks: item });
      this.$store.commit("distributeTask");
      this.task = "";
      this.note = "";
      const todo = this.$store.state.todos[this.categorie].tasks;

      const id = this.$store.state.user;

      if (id !== null && id !== undefined) {
        // upload to firebase
        db.collection(id)
          .doc(this.categorieName)
          .update({ tasks: todo });
      }
      this.$store.commit("switchAddTodoSnackbar");
      setTimeout(() => {
        this.$store.commit("switchAddTodo");
      }, 3000);
    },

    closeDialog() {
      this.newTasks = [];
      this.close = false;
    },
  },
};
</script>

<style lang="scss">
.v-picker__body {
  background-color: var(--v-background-base) !important;
}
.v-btn--active {
  box-shadow: inset 7px 7px 14px var(--v-toggleColorShadowDark-base),
    inset -7px -7px 14px var(--v-toggleColorShadowLight-base) !important;
}

.full-width {
  width: 100%;
}

.align-form {
  margin-left: 16px;
}
</style>
