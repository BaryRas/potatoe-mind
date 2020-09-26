<template>
  <v-navigation-drawer :value="drawer" color="var(--v-background-base)" app>
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar v-if="photoURL !== null && photoURL !== undefined">
          <img :src="avatar" />
        </v-list-item-avatar>
        <v-list-item-avatar v-else color="tertiary">
          <span class="white--text headline">{{ avatar }}</span>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ name }}</v-list-item-title>
          <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <!-- <v-divider></v-divider> -->

    <v-list dense shaped>
      <!-- Categories list -->
      <template v-for="(item, i) in categories">
        <v-list-item
          :key="i"
          link
          :to="{
            name: 'Home',
            path: `/${$i18n.locale}/`,
            params: { class: i },
            hash: `#${item.icon}`,
          }"
          class="item-custom"
        >
          <v-list-item-action>
            <v-badge
              :value="checkNonDoneTask(item.items)"
              :content="checkNonDoneTask(item.items)"
              color="textColor"
              overlap
            >
              <v-icon color="textColor">{{ item.icon }}</v-icon>
            </v-badge>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t(`bar.${item.text}`) }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider dark class="mt-8 mb-4"></v-divider>

      <!-- User Project name -->
      <h2 class="project-title text-center mb-3">{{ $t("bar.project") }}</h2>
      <template>
        <v-list-item
          class="item-custom mb-10"
          link
          :to="`/${$i18n.locale}/project/new`"
        >
          <v-list-item-action>
            <v-icon color="textColor">fa-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t("bar.new-project") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <!-- User Projects list -->
      <template>
        <v-list-item
          v-for="(content, index) in contents"
          :key="content.name"
          link
          :to="{
            name: 'Todo',
            path: `/${$i18n.locale}/todo/${content.name}`,
            params: {
              project: content.name,
              data: content,
              categorie: index,
            },
          }"
          class="item-custom"
        >
          <v-list-item-action>
            <v-badge
              :content="
                checkNonDoneTask(content.items[2]) > 0
                  ? checkNonDoneTask(content.items[2])
                  : checkNonDoneTask(content.items[0])
              "
              :color="
                checkNonDoneTask(content.items[2]) > 0 ? 'red' : '#858585'
              "
              :value="
                checkNonDoneTask(content.items[2]) > 0
                  ? checkNonDoneTask(content.items[2])
                  : checkNonDoneTask(content.items[0])
              "
              overlap
            >
              <v-icon color="textColor">{{ content.icon }}</v-icon>
            </v-badge>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ content.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider dark class="my-8"></v-divider>
    </v-list>

    <!-- Confirm Box -->
    <confirm ref="confirm"></confirm>

    <!-- Bottom button Login/Logout -->
    <template v-slot:append>
      <v-list-item link @click="logButton" class="item-custom mb-2">
        <!-- <v-list-item link to="/" class="item-custom mb-2"> -->
        <v-list-item-action>
          <v-icon color="textColor">{{
            user ? "fa-sign-out" : "fa-sign-in"
          }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            {{ user ? $t("sign.log-out") : $t("sign.log-in") }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>

<script>
import uuid from "uuid/v4";
import ConfirmBox from "@/components/Shared/ConfirmBox";
import i18n from "../i18n";

export default {
  name: "Bar",

  components: {
    confirm: ConfirmBox,
  },

  computed: {
    drawer() {
      return this.$store.state.drawer;
    },

    windowWidth() {
      return this.$store.state.windowWidth;
    },
    user() {
      return this.$store.getters.user;
    },

    categories() {
      return this.$store.state.categories;
    },

    contents() {
      return this.$store.state.todos;
    },

    name() {
      return this.$store.state.name;
    },

    email() {
      return this.$store.state.email;
    },

    photoURL() {
      return this.$store.state.photoURL;
    },

    avatar() {
      const photoURL = this.$store.state.photoURL;
      if (photoURL !== null && photoURL !== undefined) {
        return photoURL;
      } else {
        const name = this.$store.state.name;
        const avatar = name
          .split(" ")
          .map((item) => item[0])
          .join("");
        return avatar.substring(0, 2);
      }
    },
  },
  created() {
    if (this.$store.state.windowWidth <= 600) {
      this.$store.commit("switchDrawer");
    }
  },
  methods: {
    logButton() {
      if (this.user) {
        this.$refs.confirm
          .open(
            i18n.locale == "en" ? "Log Out" : "S'identifier",
            i18n.locale == "en"
              ? "Are you sure to leave Potatoe?"
              : "Etes-vous sûr de quitter Potatoe?"
          )
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

    checkNonDoneTask(tasks) {
      if (tasks.length > 0) {
        const nonDone = tasks.filter((task) => {
          return task.done === false;
        });
        return nonDone.length;
      } else {
        return 0;
      }
    },
  },
};
</script>

<style lang="scss">
.item-custom {
  margin-bottom: 8px;
  &::before {
    color: transparent;
  }
}

.v-navigation-drawer {
  // border: none !important;
  box-shadow: 8px 8px 16px var(--v-toggleColorShadowDark-base),
    -8px -8px 16px var(--v-toggleColorShadowLight-base);
}
.item-custom {
  box-shadow: 4px 4px 8px var(--v-toggleColorShadowDark-base),
    -4px -4px 8px var(--v-toggleColorShadowLight-base);

  &:hover {
    box-shadow: inset 2px 2px 5px var(--v-toggleColorShadowDark-base),
      inset -5px -5px 10px var(--v-toggleColorShadowLight-base);
  }
}
.v-list .v-list-item--active {
  box-shadow: inset 2px 2px 5px var(--v-toggleColorShadowDark-base),
    inset -5px -5px 10px var(--v-toggleColorShadowLight-base) !important;
}
</style>
