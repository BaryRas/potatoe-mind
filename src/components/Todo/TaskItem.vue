<template>
  <v-list-item class="item-custom">
    <v-list-item-action class="checkbox d-flex">
      <div class="switch">
        <input
          :id="`switch-${task.id}`"
          type="checkbox"
          v-model="task.done"
          @change="editTask(task.id, task.idCategorie, 'checkbox')"
        />
        <label :for="`switch-${task.id}`"></label>
      </div>
      <!-- </div> -->
    </v-list-item-action>

    <!-- Confirm Box -->
    <confirm ref="confirm"></confirm>

    <v-list-item-content>
      <span class="mb-2">{{ task.title }}</span>
      <v-list-item-subtitle>
        {{
          $d(new Date(parseDate(task.date)), "short", `${dateLocale}`)
        }}</v-list-item-subtitle
      >
      <v-list-item-title>{{ task.note }}</v-list-item-title>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn icon @click="editTask(task.id, task.idCategorie, 'deleteTask')">
        <v-icon>fa-trash</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { db } from "@/main";
import moment from "moment-mini";
import ConfirmBox from "@/components/Shared/ConfirmBox";
import i18n from "../../i18n";

export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
    taskItem: {
      type: Number,
      required: true,
    },
    todoItem: {
      type: Number,
      required: true,
    },
    categorie: {
      type: String,
      required: true,
    },
  },
  components: {
    confirm: ConfirmBox,
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    userAuthenticated() {
      return this.$store.getters.userAuthenticated;
    },
    dateLocale() {
      return i18n.locale == "en" ? "en-US" : "fr-FR";
    },
  },
  methods: {
    editTask(idtask, idCategorie, editType) {
      const user = this.user;
      const todos = this.$store.state.todos;
      const tasks = todos[idCategorie].tasks;
      const payload = {
        user,
        categorie: this.categorie,
        tasks,
        todoIndex: idCategorie,
      };

      if (editType === "checkbox") {
        const updateTasks = tasks.filter((task) => {
          return task.id === idtask;
        });
        updateTasks[0].done != updateTasks[0].done;

        if (this.userAuthenticated) {
          this.$store.dispatch("editTask", payload);
        } else {
          this.$store.commit("editTask", payload);
          this.$store.commit("distributeTask");
        }
      } else {
        this.$refs.confirm
          .open(
            i18n.locale == "en" ? "Delete" : "Supprimer",
            i18n.locale == "en"
              ? "Are you sure to delete this task?"
              : "Etes-vous sûr de vouloir supprimer cette tâche?"
          )
          .then((confirm) => {
            if (confirm) {
              const keepTasks = tasks.filter((task) => {
                return task.id !== idtask;
              });
              payload.tasks = keepTasks;

              if (this.userAuthenticated) {
                this.$store.dispatch("editTask", payload);
              } else {
                this.$store.commit("editTask", payload);
                this.$store.commit("distributeTask");
              }
            }
          });
      }
    },

    deletedTask(todoIndex, id) {
      if (
        this.$dialog.confirm(
          i18n.locale == "en" ? "Delete" : "Supprimer",
          i18n.locale == "en"
            ? "Are you sure to delete this task?"
            : "Etes-vous sûr de vouloir supprimer cette tâche?"
        )
      ) {
        const payload = { todoIndex, id };
        this.$store.commit("deletedTask", payload);
        this.$store.commit("distributeTask");

        if (this.userAuthenticated) {
          const todo = this.$store.state.todos;
          const tasks = todo[todoIndex].tasks;
          db.collection(this.user)
            .doc(this.categorie)
            .update({ tasks });
        }
      }
    },

    parseDate(date) {
      if (typeof date === "string") {
        return moment(date).format("dddd, D MMMM YYYY");
      } else {
        const dateMilliseconds = new Date(date.seconds * 1000);
        return moment(dateMilliseconds).format("dddd, D MMMM YYYY");
      }
    },
  },
};
</script>
<style lang="scss">
/*  SWITCH  */
.switch {
  input {
    display: none;
  }

  width: 3rem;
  label {
    display: flex;
    align-items: center;
    width: 100%;
    height: 1.5rem;
    box-shadow: 0.3rem 0.3rem 0.6rem var(--v-toggleColorShadowDark-base),
      -0.2rem -0.2rem 0.5rem var(--v-toggleColorShadowLight-base);
    background: rgba(255, 255, 255, 0);
    position: relative;
    cursor: pointer;
    border-radius: 1.6rem;

    &::after {
      content: "";
      position: absolute;
      left: 0.2rem;
      width: 1.1rem;
      height: 1.1rem;
      border-radius: 50%;
      background: #9baacf;
      transition: all 0.4s ease;
    }
    &::before {
      content: "";
      width: 100%;
      height: 100%;
      border-radius: inherit;
      background: #4666ff;
      box-shadow: inset 4px 4px 8px #3a55d4, inset -4px -4px 8px #5277ff;
      opacity: 0;
      transition: all 0.4s ease;
    }
  }
  & input:checked {
    & ~ label {
      &::before {
        opacity: 1;
      }
      &::after {
        left: 57%;
        background: #e4ebf5;
      }
    }
  }
}
.theme--light {
  .switch {
    label {
      &::after {
        background: #9baacf;
      }
      &::before {
        background: #4666ff;
        box-shadow: inset 4px 4px 8px #3a55d4, inset -4px -4px 8px #5277ff;
      }
    }
    & input:checked {
      & ~ label {
        &::after {
          background: #e4ebf5;
        }
      }
    }
  }
}
.theme--dark {
  .switch {
    label {
      &::after {
        background: #64738a;
      }
      &::before {
        background: var(--v-secondary-base);
        box-shadow: inset 5px 5px 10px #bf1b0b, inset -5px -5px 10px #ff2d13;
      }
    }
    & input:checked {
      & ~ label {
        &::after {
          background: #e4ebf5;
        }
      }
    }
  }
}
</style>
