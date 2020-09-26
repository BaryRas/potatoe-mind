<template>
  <v-dialog v-model="dialog" max-width="490">
    <v-card color="var(--v-background-base)">
      <v-card-title class="headline">{{
        $t("recover.recover-title")
      }}</v-card-title>

      <v-card-text>
        <v-form>
          <v-text-field
            label="Email"
            name="Email"
            v-model="email"
            type="email"
            :rules="emailRules"
            color="secondary"
          >
          </v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="red darken-1" text @click.prevent="switchDialog">
          {{ $t("recover.cancel") }}
        </v-btn>

        <v-btn
          color="green darken-1"
          text
          @click.prevent="sendPasswordResetEmail"
        >
          {{ $t("recover.reset") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from "firebase";
import i18n from "../../i18n";

export default {
  data() {
    return {
      email: "",
      emailRules: [
        (v) =>
          !!v || i18n.locale == "en"
            ? "E-mail is required"
            : "E-mail est requis",
        (v) =>
          /.+@.+\..+/.test(v) || i18n.locale == "en"
            ? "E-mail must be valid"
            : "E-mail doit-être valide",
      ],
    };
  },
  computed: {
    dialog() {
      return this.$store.state.dialog;
    },
  },
  methods: {
    switchDialog() {
      this.$store.commit("switchDialog");
    },
    sendPasswordResetEmail() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.email = "";
          this.switchDialog();
        })
        .catch(function(error) {
          // An error happened.
        });
    },
  },
};
</script>
