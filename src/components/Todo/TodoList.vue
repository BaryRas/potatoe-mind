<template>
  <!-- <div class="todo-list"> -->
  <v-card
    class="d-flex flex-column justify-content-center card-shadow card-list"
    color="var(--v-background-base)"
  >
    <v-card-actions class="mt-3 ml-3 mb-auto">
      <v-btn
        color="var(--v-background-base)"
        @click.prevent="shareData(todo.name)"
      >
        <v-icon left>{{ todo.icon }}</v-icon> {{ todo.name }}
      </v-btn>
    </v-card-actions>

    <v-card-text>
      <div class="chart">
        <div class="chart-label">
          <span class="t2">{{ progress(todo) }} %</span>
          <!-- <span class="text-muted">savings</span> -->
        </div>

        <svg
          class="progress"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <circle
            r="40"
            cx="50"
            cy="50"
            stroke-width="7"
            fill="transparent"
            stroke="var(--v-toggleColorShadowDark-base)"
            class="sc"
          ></circle>
          <circle
            id="chartfill"
            r="40"
            cx="50"
            cy="50"
            stroke-width="7"
            stroke-dasharray="245"
            stroke-dashoffset="245"
            :style="progressStroke(todo)"
            fill="transparent"
            stroke="var(--v-tertiary-base)"
            stroke-linecap="round"
            class="meter"
          ></circle>
        </svg>
      </div>
    </v-card-text>

    <v-card-title class="headline"
      >{{ todo.tasks.length }} {{ $t("list-project.task") }}</v-card-title
    >

    <v-card-subtitle>{{ todo.name }}</v-card-subtitle>
    <v-card-text class="d-flex d-sm-none">
      <v-row>
        <v-col cols="8" align-self="center">
          <v-progress-linear color="tertiary" :value="progress(todo)">
          </v-progress-linear>
        </v-col>
        <v-col cols="4" align-self="center"> {{ progress(todo) }} % </v-col>
      </v-row>
    </v-card-text>
  </v-card>
  <!-- </div> -->
</template>

<script>
import Todo from "./Todo.vue";
export default {
  props: {
    todo: Object,
    categorie: Number,
  },
  components: {
    Todo,
  },
  methods: {
    progress(todo) {
      const totalCount = todo.tasks.filter((t) => !t.deleted).length;
      const doneCount = todo.tasks.filter((t) => !t.deleted && t.done).length;
      const result = Math.round((doneCount / totalCount) * 100);

      if (isNaN(result) || result === undefined) {
        return 0;
      } else {
        return result;
      }
    },

    progressStroke(todo) {
      const value = this.progress(todo);
      const valueMeter = 245 - (245 * value) / 100;
      return {
        "stroke-dashoffset": valueMeter,
      };
    },

    shareData(name) {
      this.$router.push({
        name: "Todo",
        params: {
          categorie: this.categorie,
          project: name,
        },
      });
    },
  },
};
</script>

<style lang="scss">
.chart {
  box-shadow: 10px 10px 13px var(--v-toggleColorShadowDark-base),
    -10px -10px 13px var(--v-toggleColorShadowLight-base) !important;
}
.chart::after {
  box-shadow: 2px 2px 2px 0px var(--v-toggleColorShadowDark-base) inset,
    -2px -2px 2px 0px var(--v-toggleColorShadowLight-base) inset;
}
.progress-bar-circular {
  background-color: var(--v-background-base);
  box-shadow: -5px -5px 20px var(--v-toggleColorShadowLight-base),
    5px 5px 20px var(--v-toggleColorShadowDark-base);
}
.v-progress-circular__underlay {
  box-shadow: inset 2px 2px 5px var(--v-toggleColorShadowDark-base),
    inset -5px -5px 10px var(--v-toggleColorShadowLight-base);
}

.chart {
  position: relative;
  border-radius: 50%;
  margin: 2rem;
}

.chart::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  margin: 3rem;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.chart .chart-label {
  position: absolute;
  top: 0;
  bottom: 0.5rem;
  left: 0;
  right: 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.sc {
  stroke-dashoffset: 0;
}

#chartfill {
  animation: chart 500ms linear forwards;
}

.progress-bar-circular {
  border-radius: 100%;
  padding: 10px;
  text-shadow: 1px 1px 0 #fff;
}
</style>
