<template>
  <v-dialog
    v-model="dialog"
    :max-width="options.width"
    :style="{ zIndex: options.zIndex }"
    @keydown.esc="cancel"
    color="var(--v-background-base)"
  >
    <v-card color="var(--v-background-base)">
      <v-toolbar class="text-center" dense flat>
        <v-toolbar-title>{{ title }} </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon color="textColor">fa-exclamation-triangle</v-icon>
      </v-toolbar>
      <v-card-text v-show="!!message" class="pa-4">
        {{ message }}
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click.native="agree">{{
          $t("confirm-box.yes-confirm")
        }}</v-btn>
        <v-btn color="green darken-1" text @click.native="cancel">{{
          $t("confirm-box.no-confirm")
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// https://gist.github.com/eolant/ba0f8a5c9135d1a146e1db575276177d : Hack trick for confirm box

export default {
  data: () => ({
    dialog: false,
    resolve: null,
    reject: null,
    message: null,
    title: null,
    options: {
      width: 290,
      zIndex: 200,
    },
  }),
  methods: {
    open(title, message, options) {
      this.dialog = true;
      this.title = title;
      this.message = message;
      this.options = Object.assign(this.options, options);
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    agree() {
      this.resolve(true);
      this.dialog = false;
    },
    cancel() {
      this.resolve(false);
      this.dialog = false;
    },
  },
};
</script>
