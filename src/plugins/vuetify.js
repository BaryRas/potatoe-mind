import Vue from "vue";
import Vuetify from "vuetify/lib";

import fr from "vuetify/es5/locale/fr";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { fr },
    current: "fr",
  },
  icons: {
    iconfont: "fa4",
  },
  theme: {
    themes: {
      light: {
        primary: "#ebebeb",
        secondary: "#ff240f",
        tertiary: "#4666FF",
        quartery: "#64738a",
        background: "#ebebeb",
        textColor: "#52545a",
        toggleColorShadowLight: "#ffffff",
        toggleColorShadowDark: "#c8d0e7",
      },
      dark: {
        primary: "#222831",
        secondary: "#ff240f",
        tertiary: "#ff240f",
        quartery: "#64738a",
        background: "#222831",
        textColor: "#64738a",
        toggleColorShadowLight: "#272e38",
        toggleColorShadowDark: "#1d222a",
      },
    },
    options: {
      customProperties: true,
    },
    dark: localStorage.getItem("theme") === "dark", // Hack to : "https://stackoverflow.com/questions/50248301/vuetify-conditional-dark-theme"
  },
});
