<template>
  <v-app id="app">
    <v-app-bar app color="var(--v-background-base)" elevation="0">
      <v-app-bar-nav-icon
        @click.stop="switchDrawer"
        class="ml-5"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Potatoe Mind</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-tooltip bottom color="var(--v-background-base)">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" class="mr-3">
            <!-- Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> -->
            <v-avatar>
              <img
                @click="setLocal()"
                src="./assets/lang.png"
                alt="flag-lang"
              />
            </v-avatar>
          </v-btn>
        </template>
        <span>{{ $t("menu.lang") }}</span>
      </v-tooltip>

      <v-tooltip bottom color="var(--v-background-base)">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon @click="logButton" class="mr-3" v-bind="attrs" v-on="on">
            <v-badge :color="user ? 'green' : 'secondary'" dot overlap bottom>
              <v-icon>fa-user-o</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <span>{{ user ? $t("sign.log-out") : $t("sign.log-in") }}</span>
      </v-tooltip>

      <v-tooltip bottom color="var(--v-background-base)">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            @click="switchTheme"
            class="mr-3"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon v-if="!$vuetify.theme.dark">fa-moon-o</v-icon>
            <v-icon v-else color="yellow">fa-lightbulb-o</v-icon>
          </v-btn>
        </template>
        <span>{{
          !$vuetify.theme.dark ? $t("menu.dark") : $t("menu.light")
        }}</span>
      </v-tooltip>
    </v-app-bar>

    <app-bar />

    <v-main>
      <!-- Show if only error   -->
      <v-row class="d-flex justify-center mt-18" v-if="error">
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-row>

      <!-- Confirm Box -->
      <confirm ref="confirm"></confirm>

      <!-- Show loader -->
      <div class="text-center" v-if="loading">
        <v-overlay :value="loading">
          <v-progress-circular
            indeterminate
            size="64"
            color="secondary"
          ></v-progress-circular>
        </v-overlay>
      </div>

      <router-view />
    </v-main>
    <v-footer color="var(--v-background-base)">
      <v-col class="text-center" cols="12">
        <small
          >&copy; Copyright {{ new Date().getFullYear() }}, Bary Ras. All Rights
          Reserved</small
        >
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import Bar from "./components/Bar";
import ConfirmBox from "@/components/Shared/ConfirmBox";
import i18n from "./i18n";

export default {
  name: "App",
  data: () => ({
    drawer: null,
    dynamicImg: "./assets/en.png",
  }),

  components: {
    "app-bar": Bar,
    confirm: ConfirmBox,
  },

  watch: {
    $route(to, from) {
      localStorage.removeItem("todo");
      localStorage.removeItem("categorie");
    },
  },

  computed: {
    error() {
      return this.$store.state.error;
    },
    user() {
      return this.$store.getters.userAuthenticated;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },

  methods: {
    switchDrawer() {
      this.$store.commit("switchDrawer");
    },
    switchTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;

      localStorage.setItem(
        "theme",
        this.$vuetify.theme.dark ? "dark" : "light"
      );
    },

    setLocal() {
      let locale = "";
      if (this.$i18n.locale == "fr") {
        locale = "en";
      } else if (this.$i18n.locale == "en") {
        locale = "fr";
      }
      this.$i18n.locale = locale;
      this.$router.push({
        params: { lang: locale },
      });
      localStorage.setItem("lang", locale);
    },

    onDismissed() {
      this.$store.dispatch("clearError");
    },

    logButton() {
      if (this.user) {
        this.$refs.confirm
          .open("Log Out", "Are you sure to leave Potatoe?")
          .then((confirm) => {
            if (confirm) {
              if (localStorage.hasOwnProperty("theme")) {
                this.$vuetify.theme.dark;
                localStorage.removeItem("theme");
              }
              this.$store.dispatch("logout");
              this.$router.push(`/${i18n.locale}/login`);
              this.$store.commit("resetPhotoURL");
              this.$store.dispatch("fetchData");
            }
          });
      } else {
        this.$router.push(`/${i18n.locale}/login`);
      }
    },
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,400;0,700;1,900&display=swap");
$ruler: 16px;

html,
body,
#app {
  background-color: var(--v-background-base);
}

body {
  font-family: "Roboto", sans-serif;
  letter-spacing: -0.2px;
  font-size: $ruler;
}

.v-toolbar__title,
.project-title {
  font-family: "Rock Salt", sans-serif;
}

form {
  padding: $ruler;
  width: 80%;
  margin: 0 auto;
}

.v-app-bar__nav-icon {
  box-shadow: 0.3rem 0.3rem 0.6rem var(--v-toggleColorShadowDark-base),
    -0.2rem -0.2rem 0.5rem var(--v-toggleColorShadowLight-base);
}

input:not([role="button"]) {
  background-color: var(--v-background-base);
  text-shadow: 1px 1px 0 var(--v-toggleColorShadowLight-base);
  box-shadow: inset 2px 2px 5px var(--v-toggleColorShadowDark-base),
    inset -5px -5px 10px var(--v-toggleColorShadowLight-base);

  &:focus {
    box-shadow: inset 1px 1px 2px var(--v-toggleColorShadowDark-base),
      inset -1px -1px 2px var(--v-toggleColorShadowLight-base);
  }
}

button:not(.custom-btn-login) {
  box-shadow: -5px -5px 20px var(--v-toggleColorShadowLight-base),
    5px 5px 20px var(--v-toggleColorShadowDark-base) !important;

  &:hover {
    background-color: var(--v-background-base);
    box-shadow: inset 4px 4px 7px var(--v-toggleColorShadowDark-base),
      inset -4px -4px 7px var(--v-toggleColorShadowLight-base) !important;
  }

  &:active {
    box-shadow: inset 1px 1px 2px var(--v-toggleColorShadowDark-base),
      inset -1px -1px 2px var(--v-toggleColorShadowLight-base);
  }
}

.card-shadow {
  box-shadow: 14px 14px 28px var(--v-toggleColorShadowDark-base),
    -14px -14px 28px var(--v-toggleColorShadowLight-base) !important;
}

.v-tab--active {
  box-shadow: inset 5px 5px 9px var(--v-toggleColorShadowDark-base),
    inset -5px -5px 9px var(--v-toggleColorShadowLight-base) !important;
}

/**** 
 LIGHT THEME
****/

.theme--light {
  div,
  p,
  button,
  .v-btn__content {
    color: #52545a !important;
    text-shadow: 1px 1px 1px var(--v-toggleColorShadowLight-base);
  }
}

/**** 
 DARK THEME
****/

.theme--dark {
  div,
  p,
  button,
  .v-btn__content {
    color: #64738a;
    text-shadow: 1px 1px 1px #1c1c1f;
  }
}

.segment {
  padding: $ruler * 2;
  text-align: center;
}

button,
input {
  border: 0;
  outline: 0;
  font-size: $ruler !important;
  border-radius: $ruler;
  padding: $ruler !important;
  &::after {
    bottom: 0 !important;
    content: none;
  }
}

.v-text-field > .v-input__control > .v-input__slot:after {
  content: none !important;
}
.v-text-field > .v-input__control > .v-input__slot:before {
  content: none !important;
}
.v-input--is-focused {
  margin-bottom: 40px !important;
}

.v-input input {
  max-height: 45px !important;
}

.v-text-field .v-label {
  display: block;
  top: 13px !important;
  margin-left: 15px;
  margin-bottom: 10px !important;
  width: 100% !important;
}

input {
  margin-right: $ruler/2;
  width: 100%;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
  appearance: none;
  -webkit-appearance: none;
}

button {
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  font-weight: 600;

  .icon {
    margin-right: $ruler/2;
  }

  &.unit {
    border-radius: $ruler/2;
    line-height: 0;
    width: $ruler * 3;
    height: $ruler * 3;
    justify-content: center;
    align-items: center;
    margin: 0 $ruler/2;
    font-size: $ruler * 1.2;
  }

  &.done {
    width: 50%;
  }
}

.input-group {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  label {
    margin: 0;
    flex: 1;
  }
}

.v-tab--active {
  border-radius: 10px;
  border-bottom: 0;
}

/** Srollbar */
/**
*Bar color icon and badge
*vuetify var text-color
 */

::-webkit-scrollbar {
  width: 10px;
  background-color: var(--v-background-base);
}

::-webkit-scrollbar-track {
  border-radius: 10px;
  background: var(--v-background-base);
  box-shadow: inset 2px 2px 3px var(--v-toggleColorShadowDark-base),
    inset -2px -2px 3px var(--v-toggleColorShadowLight-base);
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: var(--v-background-base);
  box-shadow: 4px 4px 8px var(--v-toggleColorShadowDark-base),
    -4px -4px 8px var(--v-toggleColorShadowLight-base);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--v-tertiary-base);
}

@media screen and (max-width: 600px) {
  .card-list {
    height: 250px;
  }
  .container-concav {
    grid-template-columns: repeat(auto-fit, minmax(245px, 1fr));
  }
  .chart {
    display: none;
  }
}
</style>
