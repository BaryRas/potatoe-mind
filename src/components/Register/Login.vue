<template>
  <div class="mt-12">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card class="card-shadow" max-width="950px">
          <!-- ****** -->
          <!-- SIGNIN WINDOW -->
          <!-- ****** -->
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12" md="8" class="background">
                  <v-card-text class="mt-12">
                    <h1 class="text-center display-2 red-custom">
                      {{ $t("sign.signIn-title") }}
                    </h1>
                    <div class="text-center mt-4">
                      <v-btn
                        class="mx-2"
                        fab
                        color="blue-grey lighten-2"
                        outlined=""
                        @click="signUserWithSocial('facebook')"
                      >
                        <v-icon> fa-facebook-f</v-icon>
                      </v-btn>
                      <v-btn
                        class="mx-2"
                        fab
                        color="blue-grey lighten-2"
                        outlined=""
                        @click="signUserWithSocial('google')"
                      >
                        <v-icon> fa-google</v-icon>
                      </v-btn>
                    </div>
                    <h4
                      class="text-center mt-4 blue-grey--text text--lighten-2"
                    >
                      {{ $t("sign.signIn-sub-title") }}
                    </h4>
                    <v-form>
                      <v-text-field
                        label="email*"
                        name="email*"
                        v-model="email"
                        type="email"
                        :rules="emailRules"
                        color="secondary"
                      >
                      </v-text-field>

                      <v-text-field
                        :label="`${$t('input.password')}`"
                        :name="`${$t('input.password')}`"
                        v-model="password"
                        type="password"
                        :rules="passRules"
                        color="secondary"
                        request
                      >
                      </v-text-field>
                    </v-form>
                    <h3
                      class="text-center mt-3 blue-grey--text text--lighten-2"
                      @click.stop="switchDialog"
                      style="cursor: pointer;"
                    >
                      {{ $t("sign.forget-password") }}
                    </h3>
                    <recover-password />
                  </v-card-text>
                  <div class="text-center my-3">
                    <v-btn @click="onSignIn" color="primary">{{
                      $t("sign.log-in")
                    }}</v-btn>
                  </div>
                </v-col>
                <v-col cols="12" md="4" class="gradient">
                  <v-card-text class="white--text mt-12">
                    <h1 class="text-center display-1 p-dark">
                      {{ $t("sign.signIn-side-title") }}
                    </h1>
                    <h5 class="text-center p-dark">
                      {{ $t("sign.signIn-side-sub-title") }}
                    </h5>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn
                      @click="step++"
                      class="b-dark custom-btn-login"
                      color="quartery"
                    >
                      {{ $t("sign.sign-up") }}</v-btn
                    >
                  </div>
                </v-col>
              </v-row>
            </v-window-item>

            <!-- ****** -->
            <!-- SIGNUP WINDOW -->
            <!-- ****** -->
            <v-window-item :value="2">
              <v-row class="fill-height">
                <v-col class="gradient" cols="12" md="4">
                  <v-card-text class="white--text mt-12">
                    <h1 class="text-center display-1 p-dark">
                      {{ $t("sign.signUp-side-title") }}
                    </h1>
                    <h5 class="text-center p-dark">
                      {{ $t("sign.signUp-side-sub-title") }}
                    </h5>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn
                      @click="step--"
                      class="b-dark custom-btn-login"
                      color="quartery"
                      >{{ $t("sign.log-in") }}</v-btn
                    >
                  </div>
                </v-col>
                <v-col cols="12" md="8" class="background">
                  <v-card-text class="mt-12">
                    <h1 class="text-center display-2 custom-2">
                      {{ $t("sign.signUp-title") }}
                    </h1>
                    <div class="text-center mt-4">
                      <v-btn
                        class="mx-2"
                        fab
                        color="blue-grey lighten-2"
                        outlined=""
                        @click="signUserWithSocial('facebook')"
                      >
                        <v-icon>fa-facebook-f</v-icon>
                      </v-btn>
                      <v-btn
                        class="mx-2"
                        fab
                        color="blue-grey lighten-2"
                        outlined=""
                        @click="signUserWithSocial('google')"
                      >
                        <v-icon> fa-google</v-icon>
                      </v-btn>
                    </div>
                    <h4
                      class="text-center mt-4 blue-grey--text text--lighten-2"
                    >
                      {{ $t("sign.signIn-sub-title") }}
                    </h4>
                    <v-form @submit.prevent="onSignUp">
                      <v-text-field
                        :label="`${$t('input.name')}`"
                        :name="`${$t('input.name')}`"
                        v-model="name"
                        :rules="nameRules"
                        type="texte"
                        color="secondary"
                      >
                      </v-text-field>
                      <v-text-field
                        label="email*"
                        name="email*"
                        v-model="email"
                        type="email"
                        :rules="emailRules"
                        color="secondary"
                      >
                      </v-text-field>
                      <v-text-field
                        :label="`${$t('input.password')}`"
                        :name="`${$t('input.password')}`"
                        v-model="password"
                        type="password"
                        :rules="passRules"
                        color="secondary"
                        request
                      >
                      </v-text-field>
                      <v-text-field
                        :label="`${$t('input.confirm')}`"
                        :name="`${$t('input.confirm')}`"
                        v-model="confirmPassword"
                        type="password"
                        :rules="[comparePasswords]"
                        color="secondary"
                        request
                      >
                      </v-text-field>
                    </v-form>
                  </v-card-text>
                  <div class="text-center mt-n5">
                    <v-btn
                      v-if="
                        this.name != '' &&
                          /.+@.+\..+/.test(this.email) &&
                          this.password.length >= 6 &&
                          this.password === this.confirmPassword
                      "
                      color="primary"
                      @click.prevent="onSignUp"
                    >
                      {{ $t("sign.sign-up") }}
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import uuid from "uuid/v4";
import firebase from "firebase";
import RecoverPassword from "./RecoverPassword";
import i18n from "../../i18n";

export default {
  name: "Login",
  props: {
    source: String,
  },
  components: {
    RecoverPassword,
  },
  data() {
    return {
      step: 1,
      name: "",
      bio: "",
      email: "",
      password: "",
      photoURL: "",
      confirmPassword: "",
      nameRules: [
        (v) =>
          !!v || i18n.locale == "en" ? "Name is required" : "Nom est requis",
      ],
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
      passRules: [
        (v) =>
          !!v || i18n.locale == "en"
            ? "Password is required"
            : "Mot de passe est requis",
        (v) =>
          (v && v.length >= 6) || i18n.locale == "en"
            ? "Password must be more than 6 characters"
            : "Mot de passe doit-être supérieur à 6",
      ],
    };
  },

  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Password do not match"
        : "";
    },
    user() {
      return this.$store.getters.user;
    },
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push(`/${i18n.locale}`);
      }
    },
  },

  methods: {
    signUserWithSocial(social) {
      this.$store
        .dispatch("signUserWithPopup", { social })
        .then((newUser) => {
          console.log(newUser);
          if (newUser.isNewUser) {
            this.$store.dispatch("createNewUserDB", newUser);
          } else {
            const id = newUser.id;
            this.$store.commit("setUser", { id });
          }
        })
        .then(() => {
          this.$store.dispatch("fetchRegisterUserData");
          this.$store.commit("setLoading", false);
        });
    },

    onSignUp(social) {
      let payload = {};
      payload.email = this.email;
      payload.password = this.password;
      payload.name = this.name;
      this.$store
        .dispatch("signUpWithEmail", payload)
        .then((newUser) => {
          this.$store.dispatch("createNewUserDB", newUser);
        })
        .then(() => {
          this.$store.dispatch("fetchRegisterUserData");
          this.$store.commit("setLoading", false);
        });
    },

    onSignIn() {
      this.$store
        .dispatch("signInWithEmail", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$store.dispatch("fetchRegisterUserData");
        });
    },

    switchDialog() {
      this.$store.commit("switchDialog");
    },
  },
};
</script>

<style lang="scss">
.gradient {
  background-color: #64738a;
  div,
  h1,
  h5,
  button {
    color: #fff;
    text-shadow: 1px 1px 1px #505050;
  }
  button {
    box-shadow: 7px 7px 13px #475262, -7px -7px 13px #8194b2;

    &:hover {
      box-shadow: -2px -2px 5px #475262, 2px 2px 5px #8194b2;
    }

    &:active {
      box-shadow: inset 1px 1px 2px #8194b2, inset -1px -1px 2px #475262;
    }
  }

  h3 > .h3-form {
    cursor: pointer;
  }
}
.theme--light,
.theme--dark {
  .gradient {
    button > .v-btn__content {
      color: #fff !important;
      text-shadow: 1px 1px 1px #313138;
    }
  }
}
</style>
