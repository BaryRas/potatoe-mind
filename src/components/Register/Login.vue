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
                      Sign in to Remind Potatoes
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
                      Ensure your mail for registration
                    </h4>
                    <v-form>
                      <v-text-field
                        label="email"
                        name="email"
                        v-model="email"
                        type="email"
                        :rules="emailRules"
                        color="secondary"
                      >
                      </v-text-field>

                      <v-text-field
                        label="password"
                        name="password"
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
                      Forget your password ?
                    </h3>
                    <recover-password />
                  </v-card-text>
                  <div class="text-center my-3">
                    <v-btn @click="onSignIn" color="primary">SIGN IN</v-btn>
                  </div>
                </v-col>
                <v-col cols="12" md="4" class="gradient">
                  <v-card-text class="white--text mt-12">
                    <h1 class="text-center display-1 p-dark">Potato Yet !!</h1>
                    <h5 class="text-center p-dark">
                      Enter your personal details and start journey with us
                    </h5>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn
                      @click="step++"
                      class="b-dark custom-btn-login"
                      color="quartery"
                      >SIGN UP</v-btn
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
                    <h1 class="text-center display-1 p-dark">Welcome Back</h1>
                    <h5 class="text-center p-dark">
                      To keep connected with us, please Login with your
                      personnel info
                    </h5>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn
                      @click="step--"
                      class="b-dark custom-btn-login"
                      color="quartery"
                      >SIGN IN</v-btn
                    >
                  </div>
                </v-col>
                <v-col cols="12" md="8" class="background">
                  <v-card-text class="mt-12">
                    <h1 class="text-center display-2 custom-2">
                      Join Potatoes Team
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
                      Ensure your email for registration
                    </h4>
                    <v-form @submit.prevent="onSignUp">
                      <v-text-field
                        label="Name"
                        name="Name"
                        v-model="name"
                        type="texte"
                        color="secondary"
                      >
                      </v-text-field>
                      <v-text-field
                        label="Email"
                        name="Email"
                        v-model="email"
                        type="email"
                        :rules="emailRules"
                        color="secondary"
                      >
                      </v-text-field>
                      <v-text-field
                        label="Password"
                        name="Password"
                        v-model="password"
                        type="password"
                        :rules="passRules"
                        color="secondary"
                        request
                      >
                      </v-text-field>
                      <v-text-field
                        label="Confirm Password"
                        name="Confirm Password"
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
                    <v-btn color="primary" @click.prevent="onSignUp"
                      >SIGN UP</v-btn
                    >
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
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passRules: [
        (v) => !!v || "Password is required",
        (v) =>
          (v && v.length >= 6) || "Password must be more than 6 characters",
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
        this.$router.push("/");
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
  // box-shadow: 14px 14px 28px #b51a0b, -14px -14px 28px #ff2e13;
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
