<template>
  <v-snackbar
    :value="addTodoSnackbar"
    color="var(--v-background-base)"
    outlined
    :timeout="timeout"
  >
    <v-icon left x-large color="secondary">fa-thumbs-up</v-icon>
    <span class="text-size">{{ text }}</span>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      timeout: 3000,
    };
  },
  computed: {
    addTodoSnackbar() {
      return this.$store.state.addTodoSnackbar;
    },
  },
};
</script>

<style>
span {
  font-size: 20px;
}
</style>
