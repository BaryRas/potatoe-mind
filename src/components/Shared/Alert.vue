<template>
  <v-alert
    @input="onClose"
    close-text="Close Alert"
    color="secondary"
    id="alert-custom"
    type="error"
    :value="true"
    dismissible
    rounded
  >
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  props: {
    text: String,
  },
  methods: {
    onClose() {
      this.$emit("dismissed");
    },
  },
};
</script>

<style lang="scss">
.v-alert > .v-alert__wrapper > .v-alert__content {
  color: #fff !important;
  text-shadow: 1px 1px 1px #000;
}
.theme--light,
.theme--dark {
  .v-alert {
    button {
      color: #fff !important;

      box-shadow: -2px -2px 10px #d91f0d, 2px 2px 10px #ff2911;

      &:hover {
        box-shadow: -1px -1px 2px #d91f0d, 1px 1px 2px #ff2911;
      }

      &:active {
        box-shadow: inset 1px 1px 2px #ff2911, inset -1px -1px 2px #d91f0d;
      }
    }
  }
}
</style>
