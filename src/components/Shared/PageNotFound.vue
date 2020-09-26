<template>
  <div class="page-not-found">
    <div class="text-center">
      <p>404</p>
      <p class="mb-10">
        <span class="text-decoration-line-through"> PAGE</span> NOT FOUND
      </p>
      <v-btn color="var(--v-background-base)" @click="goHome">{{
        $t("menu.home")
      }}</v-btn>
    </div>
  </div>
</template>

<script>
import i18n from "../../i18n";

export default {
  name: "PageNotFound",
  methods: {
    goHome() {
      this.$router.push({
        path: `/${i18n.locale}/`,
      });
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap");

.page-not-found {
  // color: white;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-family: "Rock Salt", cursive;
    font-size: 6vw;
  }
}
</style>
