<template>
  <form>
    <div class="segment">
      <h1>{{ $t("add-project.project-title") }}</h1>
    </div>

    <v-text-field
      :label="`${$t('add-project.project-input')}`"
      :name="`${$t('add-project.project-input')}`"
      v-model="projectName"
      single-line
      :rules="projectRules"
      type="texte"
      color="secondary"
    >
    </v-text-field>

    <div class="segment">
      <h2 class="mb-8">{{ $t("add-project.project-icon") }}</h2>

      <div class="checkbox d-flex flex-wrap justify-content-center">
        <div class="checkbox__item" v-for="(icon, i) in icons" :key="i">
          <input
            :id="`checkbox-${i}`"
            type="radio"
            name="radio"
            :value="icon"
            @click="addIcon(icon)"
          />
          <label :for="`checkbox-${i}`">
            <v-icon>{{ icon }}</v-icon></label
          >
        </div>
      </div>
      <v-btn
        class="done mt-15"
        v-if="projectName !== ''"
        x-large
        @click="addProject"
        color="var(--v-background-base)"
      >
        <v-icon left>fa-check-square-o</v-icon>
        {{ $t("add-project.project-done") }}
      </v-btn>
    </div>
  </form>
</template>

<script>
import i18n from "../../i18n";

export default {
  data: () => ({
    icons: [
      "fa-user-o",
      "fa-heart-o",
      "fa-home",
      "fa-eur",
      "fa-handshake-o",
      "fa-line-chart",
      "fa-shopping-cart",
      "fa-wheelchair",
      "fa-laptop",
      "fa-exclamation-triangle",
    ],
    labelIcon: "",
    projectName: "",
    projectRules: [
      (v) =>
        !!v || i18n.locale == "en"
          ? "Project name is required"
          : "Nom du projet est requis",
      (v) =>
        (v && v.length <= 15) || i18n.locale == "en"
          ? "Project name must be less than 15 characters"
          : "Nom du projet doit-être inférieur à 15",
    ],
  }),
  methods: {
    addIcon(icon) {
      this.labelIcon = icon;
    },
    addProject() {
      const payload = {
        icon: "",
        name: "",
        tasks: [],
      };
      payload.icon = this.labelIcon;
      payload.name = this.projectName;
      const user = this.$store.getters.userAuthenticated;

      if (user) {
        this.$store.dispatch("createNewProject", {
          icon: payload.icon,
          name: payload.name,
          tasks: payload.tasks,
        });
      }

      this.$store.commit("addNewProject", payload);
      this.$store.commit("distributeTask");

      this.projectName = "";
      this.icon = "";
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss">
/*  CHECKBOX, ICONS SELECT */
.checkbox {
  input {
    display: none;
  }

  &__item {
    width: 6rem;
    display: flex;
    justify-content: center;

    label {
      cursor: pointer;
      position: relative;
      display: flex;
      justify-content: center;
      box-shadow: -5px -5px 20px var(--v-toggleColorShadowLight-base),
        5px 5px 20px var(--v-toggleColorShadowDark-base);
      align-items: center;
      border-radius: 0.5rem;
      width: 2.8rem;
      height: 2.8rem;

      i {
        font-size: 1.8rem;
        font-weight: 700;
        transition: 0.3s ease;
      }

      &:hover {
        box-shadow: inset 4px 4px 7px var(--v-toggleColorShadowDark-base),
          inset -4px -4px 7px var(--v-toggleColorShadowLight-base) !important;

        i {
          color: var(--v-secondary-base);
        }
      }
    }

    & input:checked {
      & ~ label {
        box-shadow: inset 2px 2px 5px var(--v-toggleColorShadowDark-base),
          inset -5px -5px 10px var(--v-toggleColorShadowLight-base);
        i {
          color: var(--v-secondary-base);
        }
      }
    }
  }
}
</style>
